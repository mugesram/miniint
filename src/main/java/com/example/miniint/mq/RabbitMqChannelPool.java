package com.example.miniint.mq;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.ConfirmCallback;
import com.rabbitmq.client.ShutdownSignalException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentNavigableMap;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.TimeUnit;



/**
 * Maintains a bounded pool of channels over a single long-lived RabbitMQ connection.
 * Channels are released immediately after publish (before waiting for ACK).
 */
public final class RabbitMqChannelPool implements AutoCloseable {
    private final Connection connection;
    private final BlockingQueue<ChannelHolder> pool;
    private final int prefetch;
    private final boolean enableConfirms;
    private static int failedChannels = 0;
    private final Object failedChannelsLock = new Object();
    

    public RabbitMqChannelPool(String uri, int poolSize) throws Exception {
        this(uri, poolSize, 0, true);
    }

    public RabbitMqChannelPool(String uri, int poolSize, int prefetch, boolean enableConfirms) throws Exception {
        if (poolSize <= 0) throw new IllegalArgumentException("poolSize must be > 0");
        this.prefetch = prefetch;
        this.enableConfirms = enableConfirms; 

        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri(uri);
        factory.setAutomaticRecoveryEnabled(true); // connection re-connect if broker restarts
        factory.setTopologyRecoveryEnabled(true); // exchange queue bindings are restored automatically in case of reconnect
        this.connection = factory.newConnection("miniint-proxy");
        this.pool = new ArrayBlockingQueue<>(poolSize);
        for (int i = 0; i < poolSize; i++) {
            pool.add(new ChannelHolder(this, connection.createChannel()));
        }
    }

    public Lease borrow(long timeoutMs) throws InterruptedException {
        ChannelHolder holder = pool.poll(timeoutMs, TimeUnit.MILLISECONDS);
        if (holder == null) {
            synchronized (failedChannelsLock) {
                if (failedChannels > 0) {
                    holder = createNewChannel();
                    failedChannels--;
                }
                if (holder == null) {
                        return null;
                }
   
            }
            
        }
        return new Lease(this, holder);
    }

    void recycle(ChannelHolder holder) {
        if (!holder.isOpen()) { // if channel broken
            holder.closeQuietly();
            
            return;
        }
        if (!pool.offer(holder)) { //. happen if pool is full
            holder.closeQuietly();
            synchronized (failedChannelsLock) {
                failedChannels--;   
            }
           
        }
    }

    private ChannelHolder createNewChannel() {
        try {
            Channel newChannel = connection.createChannel();
            return new ChannelHolder(this, newChannel); // add new channel to pool if not full

        } catch (IOException e) {
            System.err.println("[RabbitMqChannelPool] Failed to create new channel: " + e.getMessage());
            return null;    
        }
    }
 // triggered when channel is shutdown
    void handleShutdown(ChannelHolder holder, ShutdownSignalException cause) {
        // it can be triggered due to network failure or channel.close()
            synchronized (failedChannelsLock) {
                failedChannels++;   
            }
        pool.remove(holder);
        holder.closeQuietly();
        System.err.println("[RabbitMqChannelPool] Channel shutdown detected: " + cause.getMessage());
     
    }

    @Override
    public void close() {
        List<ChannelHolder> holders = new ArrayList<>();
        pool.drainTo(holders);
        holders.forEach(ChannelHolder::closeQuietly);
        try {
            connection.close();
        } catch (Exception ignored) { }
    }

    public static final class Lease implements AutoCloseable {
        private final RabbitMqChannelPool parent;
        private ChannelHolder holder;
        private boolean broken;

        private Lease(RabbitMqChannelPool parent, ChannelHolder holder) {
            this.parent = parent;
            this.holder = holder;
        }

        public long publish(String exchange, String routingKey, AMQP.BasicProperties props, byte[] body) throws IOException {
            try {
                return holder.publish(exchange, routingKey, props, body);
            } catch (IOException e) {
                broken = true;
                holder.closeQuietly();
                throw e;
            }
        }

        public CompletableFuture<Void> register(long seqNo) {
            CompletableFuture<Void> future = holder.register(seqNo);
            return future;
        }

        public Channel channel() {
            return holder.channel;
        }

        public void markBroken() {
            broken = true;
        }
       
   
        @Override
        public void close() {
            if (holder == null) return;
            if (broken) {
                holder.closeQuietly(); // if broken when using close
            } else {
                parent.recycle(holder); //. recycle check channel broken or not then add
            }
            holder = null;
        }
    }

    private static final class ChannelHolder {
        private final RabbitMqChannelPool parent;
        private final Channel channel;
        private final ConcurrentNavigableMap<Long, CompletableFuture<Void>> pending = new ConcurrentSkipListMap<>();

        private ChannelHolder(RabbitMqChannelPool parent, Channel channel) throws IOException {
            this.parent = parent;
            this.channel = channel;
            if (parent.prefetch > 0) {
                channel.basicQos(parent.prefetch);
            }
            if (parent.enableConfirms) {
                channel.confirmSelect();
                ConfirmCallback ack = (deliveryTag, multiple) -> complete(deliveryTag, multiple, null);
                ConfirmCallback nack = (deliveryTag, multiple) -> complete(deliveryTag, multiple, new IOException("NACK from broker"));
                channel.addConfirmListener(ack, nack);
            }
            channel.addShutdownListener(cause -> parent.handleShutdown(this, cause)); 
        }

        long publish(String exchange, String routingKey, AMQP.BasicProperties props, byte[] body) throws IOException {
            if (!parent.enableConfirms) {
                throw new IllegalStateException("Confirms disabled on this channel pool; publish not supported");
            }
            long seqNo = channel.getNextPublishSeqNo();
            channel.basicPublish(exchange, routingKey, true, false, props, body);
            return seqNo;
        }

        CompletableFuture<Void> register(long seqNo) {
            if (!parent.enableConfirms) {
                throw new IllegalStateException("Confirms disabled on this channel pool; register not supported");
            }
            CompletableFuture<Void> future = new CompletableFuture<>();
            pending.put(seqNo, future);
            return future;
        }

        private void complete(long seqNo, boolean multiple, IOException error) {
            if (multiple) {
                var snapshot = new ArrayList<>(pending.headMap(seqNo, true).keySet());
                snapshot.forEach(tag -> finish(tag, error));
            } else {
                finish(seqNo, error);
            }
        }

        private void finish(long seqNo, IOException error) {
            CompletableFuture<Void> future = pending.remove(seqNo);
            if (future == null) {
                return;
            }
            if (error == null) {
                future.complete(null);
            } else {
                future.completeExceptionally(error);
            }
        }

        boolean isOpen() {
            return channel.isOpen();
        }

        void closeQuietly() {
            pending.values().forEach(f -> f.completeExceptionally(new IOException("Channel closed")));
            pending.clear();
            try {
                channel.close();
            } catch (Exception ignored) { }
        }
    }
}
