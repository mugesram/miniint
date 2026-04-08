/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 0.0, "minX": 0.0, "maxY": 2421.0, "series": [{"data": [[0.0, 0.0], [0.1, 1.0], [0.2, 1.0], [0.3, 2.0], [0.4, 2.0], [0.5, 2.0], [0.6, 2.0], [0.7, 2.0], [0.8, 2.0], [0.9, 2.0], [1.0, 2.0], [1.1, 3.0], [1.2, 3.0], [1.3, 3.0], [1.4, 3.0], [1.5, 3.0], [1.6, 3.0], [1.7, 3.0], [1.8, 3.0], [1.9, 3.0], [2.0, 3.0], [2.1, 3.0], [2.2, 3.0], [2.3, 3.0], [2.4, 3.0], [2.5, 3.0], [2.6, 3.0], [2.7, 3.0], [2.8, 3.0], [2.9, 3.0], [3.0, 3.0], [3.1, 3.0], [3.2, 3.0], [3.3, 3.0], [3.4, 3.0], [3.5, 3.0], [3.6, 3.0], [3.7, 3.0], [3.8, 3.0], [3.9, 3.0], [4.0, 3.0], [4.1, 3.0], [4.2, 3.0], [4.3, 3.0], [4.4, 3.0], [4.5, 3.0], [4.6, 3.0], [4.7, 3.0], [4.8, 3.0], [4.9, 3.0], [5.0, 4.0], [5.1, 4.0], [5.2, 4.0], [5.3, 4.0], [5.4, 4.0], [5.5, 4.0], [5.6, 4.0], [5.7, 4.0], [5.8, 4.0], [5.9, 4.0], [6.0, 4.0], [6.1, 4.0], [6.2, 4.0], [6.3, 4.0], [6.4, 4.0], [6.5, 4.0], [6.6, 4.0], [6.7, 4.0], [6.8, 4.0], [6.9, 4.0], [7.0, 4.0], [7.1, 4.0], [7.2, 4.0], [7.3, 4.0], [7.4, 4.0], [7.5, 4.0], [7.6, 4.0], [7.7, 4.0], [7.8, 4.0], [7.9, 4.0], [8.0, 4.0], [8.1, 4.0], [8.2, 4.0], [8.3, 4.0], [8.4, 4.0], [8.5, 4.0], [8.6, 4.0], [8.7, 4.0], [8.8, 4.0], [8.9, 4.0], [9.0, 4.0], [9.1, 4.0], [9.2, 4.0], [9.3, 4.0], [9.4, 4.0], [9.5, 4.0], [9.6, 4.0], [9.7, 4.0], [9.8, 4.0], [9.9, 4.0], [10.0, 4.0], [10.1, 4.0], [10.2, 4.0], [10.3, 4.0], [10.4, 4.0], [10.5, 4.0], [10.6, 4.0], [10.7, 4.0], [10.8, 4.0], [10.9, 4.0], [11.0, 4.0], [11.1, 4.0], [11.2, 4.0], [11.3, 4.0], [11.4, 4.0], [11.5, 4.0], [11.6, 4.0], [11.7, 4.0], [11.8, 4.0], [11.9, 4.0], [12.0, 4.0], [12.1, 4.0], [12.2, 4.0], [12.3, 4.0], [12.4, 4.0], [12.5, 4.0], [12.6, 4.0], [12.7, 4.0], [12.8, 4.0], [12.9, 4.0], [13.0, 4.0], [13.1, 4.0], [13.2, 4.0], [13.3, 4.0], [13.4, 4.0], [13.5, 4.0], [13.6, 4.0], [13.7, 4.0], [13.8, 4.0], [13.9, 4.0], [14.0, 4.0], [14.1, 4.0], [14.2, 4.0], [14.3, 4.0], [14.4, 4.0], [14.5, 4.0], [14.6, 4.0], [14.7, 4.0], [14.8, 4.0], [14.9, 4.0], [15.0, 4.0], [15.1, 4.0], [15.2, 4.0], [15.3, 4.0], [15.4, 4.0], [15.5, 4.0], [15.6, 4.0], [15.7, 4.0], [15.8, 4.0], [15.9, 4.0], [16.0, 5.0], [16.1, 5.0], [16.2, 5.0], [16.3, 5.0], [16.4, 5.0], [16.5, 5.0], [16.6, 5.0], [16.7, 5.0], [16.8, 5.0], [16.9, 5.0], [17.0, 5.0], [17.1, 5.0], [17.2, 5.0], [17.3, 5.0], [17.4, 5.0], [17.5, 5.0], [17.6, 5.0], [17.7, 5.0], [17.8, 5.0], [17.9, 5.0], [18.0, 5.0], [18.1, 5.0], [18.2, 5.0], [18.3, 5.0], [18.4, 5.0], [18.5, 5.0], [18.6, 5.0], [18.7, 5.0], [18.8, 5.0], [18.9, 5.0], [19.0, 5.0], [19.1, 5.0], [19.2, 5.0], [19.3, 5.0], [19.4, 5.0], [19.5, 5.0], [19.6, 5.0], [19.7, 5.0], [19.8, 5.0], [19.9, 5.0], [20.0, 5.0], [20.1, 5.0], [20.2, 5.0], [20.3, 5.0], [20.4, 5.0], [20.5, 5.0], [20.6, 5.0], [20.7, 5.0], [20.8, 5.0], [20.9, 5.0], [21.0, 5.0], [21.1, 5.0], [21.2, 5.0], [21.3, 5.0], [21.4, 5.0], [21.5, 5.0], [21.6, 5.0], [21.7, 5.0], [21.8, 5.0], [21.9, 5.0], [22.0, 5.0], [22.1, 5.0], [22.2, 5.0], [22.3, 5.0], [22.4, 5.0], [22.5, 5.0], [22.6, 5.0], [22.7, 5.0], [22.8, 5.0], [22.9, 5.0], [23.0, 5.0], [23.1, 5.0], [23.2, 5.0], [23.3, 5.0], [23.4, 5.0], [23.5, 5.0], [23.6, 5.0], [23.7, 5.0], [23.8, 5.0], [23.9, 5.0], [24.0, 5.0], [24.1, 5.0], [24.2, 5.0], [24.3, 5.0], [24.4, 5.0], [24.5, 5.0], [24.6, 5.0], [24.7, 5.0], [24.8, 5.0], [24.9, 5.0], [25.0, 5.0], [25.1, 5.0], [25.2, 5.0], [25.3, 5.0], [25.4, 5.0], [25.5, 5.0], [25.6, 5.0], [25.7, 5.0], [25.8, 5.0], [25.9, 5.0], [26.0, 5.0], [26.1, 5.0], [26.2, 5.0], [26.3, 5.0], [26.4, 5.0], [26.5, 5.0], [26.6, 5.0], [26.7, 5.0], [26.8, 5.0], [26.9, 5.0], [27.0, 5.0], [27.1, 5.0], [27.2, 5.0], [27.3, 5.0], [27.4, 5.0], [27.5, 5.0], [27.6, 5.0], [27.7, 5.0], [27.8, 5.0], [27.9, 5.0], [28.0, 5.0], [28.1, 5.0], [28.2, 5.0], [28.3, 5.0], [28.4, 5.0], [28.5, 5.0], [28.6, 5.0], [28.7, 5.0], [28.8, 5.0], [28.9, 5.0], [29.0, 5.0], [29.1, 5.0], [29.2, 5.0], [29.3, 5.0], [29.4, 5.0], [29.5, 5.0], [29.6, 5.0], [29.7, 5.0], [29.8, 5.0], [29.9, 5.0], [30.0, 5.0], [30.1, 5.0], [30.2, 5.0], [30.3, 5.0], [30.4, 5.0], [30.5, 5.0], [30.6, 5.0], [30.7, 5.0], [30.8, 5.0], [30.9, 5.0], [31.0, 5.0], [31.1, 5.0], [31.2, 5.0], [31.3, 5.0], [31.4, 5.0], [31.5, 5.0], [31.6, 5.0], [31.7, 5.0], [31.8, 5.0], [31.9, 5.0], [32.0, 5.0], [32.1, 5.0], [32.2, 5.0], [32.3, 5.0], [32.4, 5.0], [32.5, 5.0], [32.6, 5.0], [32.7, 5.0], [32.8, 5.0], [32.9, 5.0], [33.0, 5.0], [33.1, 5.0], [33.2, 5.0], [33.3, 5.0], [33.4, 5.0], [33.5, 5.0], [33.6, 5.0], [33.7, 5.0], [33.8, 5.0], [33.9, 5.0], [34.0, 5.0], [34.1, 5.0], [34.2, 5.0], [34.3, 5.0], [34.4, 5.0], [34.5, 5.0], [34.6, 5.0], [34.7, 5.0], [34.8, 5.0], [34.9, 5.0], [35.0, 5.0], [35.1, 5.0], [35.2, 5.0], [35.3, 6.0], [35.4, 6.0], [35.5, 6.0], [35.6, 6.0], [35.7, 6.0], [35.8, 6.0], [35.9, 6.0], [36.0, 6.0], [36.1, 6.0], [36.2, 6.0], [36.3, 6.0], [36.4, 6.0], [36.5, 6.0], [36.6, 6.0], [36.7, 6.0], [36.8, 6.0], [36.9, 6.0], [37.0, 6.0], [37.1, 6.0], [37.2, 6.0], [37.3, 6.0], [37.4, 6.0], [37.5, 6.0], [37.6, 6.0], [37.7, 6.0], [37.8, 6.0], [37.9, 6.0], [38.0, 6.0], [38.1, 6.0], [38.2, 6.0], [38.3, 6.0], [38.4, 6.0], [38.5, 6.0], [38.6, 6.0], [38.7, 6.0], [38.8, 6.0], [38.9, 6.0], [39.0, 6.0], [39.1, 6.0], [39.2, 6.0], [39.3, 6.0], [39.4, 6.0], [39.5, 6.0], [39.6, 6.0], [39.7, 6.0], [39.8, 6.0], [39.9, 6.0], [40.0, 6.0], [40.1, 6.0], [40.2, 6.0], [40.3, 6.0], [40.4, 6.0], [40.5, 6.0], [40.6, 6.0], [40.7, 6.0], [40.8, 6.0], [40.9, 6.0], [41.0, 6.0], [41.1, 6.0], [41.2, 6.0], [41.3, 6.0], [41.4, 6.0], [41.5, 6.0], [41.6, 6.0], [41.7, 6.0], [41.8, 6.0], [41.9, 6.0], [42.0, 6.0], [42.1, 6.0], [42.2, 6.0], [42.3, 6.0], [42.4, 6.0], [42.5, 6.0], [42.6, 6.0], [42.7, 6.0], [42.8, 6.0], [42.9, 6.0], [43.0, 6.0], [43.1, 6.0], [43.2, 6.0], [43.3, 6.0], [43.4, 6.0], [43.5, 6.0], [43.6, 6.0], [43.7, 6.0], [43.8, 6.0], [43.9, 6.0], [44.0, 6.0], [44.1, 6.0], [44.2, 6.0], [44.3, 6.0], [44.4, 6.0], [44.5, 6.0], [44.6, 6.0], [44.7, 6.0], [44.8, 6.0], [44.9, 6.0], [45.0, 6.0], [45.1, 6.0], [45.2, 6.0], [45.3, 6.0], [45.4, 6.0], [45.5, 6.0], [45.6, 6.0], [45.7, 6.0], [45.8, 6.0], [45.9, 6.0], [46.0, 6.0], [46.1, 6.0], [46.2, 6.0], [46.3, 6.0], [46.4, 6.0], [46.5, 6.0], [46.6, 6.0], [46.7, 6.0], [46.8, 6.0], [46.9, 6.0], [47.0, 6.0], [47.1, 6.0], [47.2, 6.0], [47.3, 6.0], [47.4, 6.0], [47.5, 6.0], [47.6, 6.0], [47.7, 6.0], [47.8, 6.0], [47.9, 6.0], [48.0, 6.0], [48.1, 6.0], [48.2, 6.0], [48.3, 6.0], [48.4, 6.0], [48.5, 6.0], [48.6, 6.0], [48.7, 6.0], [48.8, 6.0], [48.9, 6.0], [49.0, 6.0], [49.1, 6.0], [49.2, 6.0], [49.3, 6.0], [49.4, 6.0], [49.5, 6.0], [49.6, 6.0], [49.7, 6.0], [49.8, 6.0], [49.9, 6.0], [50.0, 6.0], [50.1, 6.0], [50.2, 6.0], [50.3, 6.0], [50.4, 6.0], [50.5, 6.0], [50.6, 6.0], [50.7, 6.0], [50.8, 6.0], [50.9, 6.0], [51.0, 6.0], [51.1, 6.0], [51.2, 6.0], [51.3, 6.0], [51.4, 6.0], [51.5, 6.0], [51.6, 6.0], [51.7, 6.0], [51.8, 6.0], [51.9, 6.0], [52.0, 6.0], [52.1, 6.0], [52.2, 6.0], [52.3, 6.0], [52.4, 6.0], [52.5, 6.0], [52.6, 6.0], [52.7, 6.0], [52.8, 6.0], [52.9, 6.0], [53.0, 6.0], [53.1, 6.0], [53.2, 6.0], [53.3, 6.0], [53.4, 6.0], [53.5, 6.0], [53.6, 6.0], [53.7, 6.0], [53.8, 6.0], [53.9, 6.0], [54.0, 6.0], [54.1, 6.0], [54.2, 6.0], [54.3, 6.0], [54.4, 6.0], [54.5, 6.0], [54.6, 6.0], [54.7, 6.0], [54.8, 6.0], [54.9, 6.0], [55.0, 6.0], [55.1, 6.0], [55.2, 6.0], [55.3, 6.0], [55.4, 6.0], [55.5, 6.0], [55.6, 6.0], [55.7, 6.0], [55.8, 6.0], [55.9, 7.0], [56.0, 7.0], [56.1, 7.0], [56.2, 7.0], [56.3, 7.0], [56.4, 7.0], [56.5, 7.0], [56.6, 7.0], [56.7, 7.0], [56.8, 7.0], [56.9, 7.0], [57.0, 7.0], [57.1, 7.0], [57.2, 7.0], [57.3, 7.0], [57.4, 7.0], [57.5, 7.0], [57.6, 7.0], [57.7, 7.0], [57.8, 7.0], [57.9, 7.0], [58.0, 7.0], [58.1, 7.0], [58.2, 7.0], [58.3, 7.0], [58.4, 7.0], [58.5, 7.0], [58.6, 7.0], [58.7, 7.0], [58.8, 7.0], [58.9, 7.0], [59.0, 7.0], [59.1, 7.0], [59.2, 7.0], [59.3, 7.0], [59.4, 7.0], [59.5, 7.0], [59.6, 7.0], [59.7, 7.0], [59.8, 7.0], [59.9, 7.0], [60.0, 7.0], [60.1, 7.0], [60.2, 7.0], [60.3, 7.0], [60.4, 7.0], [60.5, 7.0], [60.6, 7.0], [60.7, 7.0], [60.8, 7.0], [60.9, 7.0], [61.0, 7.0], [61.1, 7.0], [61.2, 7.0], [61.3, 7.0], [61.4, 7.0], [61.5, 7.0], [61.6, 7.0], [61.7, 7.0], [61.8, 7.0], [61.9, 7.0], [62.0, 7.0], [62.1, 7.0], [62.2, 7.0], [62.3, 7.0], [62.4, 7.0], [62.5, 7.0], [62.6, 7.0], [62.7, 7.0], [62.8, 7.0], [62.9, 7.0], [63.0, 7.0], [63.1, 7.0], [63.2, 7.0], [63.3, 7.0], [63.4, 7.0], [63.5, 7.0], [63.6, 7.0], [63.7, 7.0], [63.8, 7.0], [63.9, 7.0], [64.0, 7.0], [64.1, 7.0], [64.2, 7.0], [64.3, 7.0], [64.4, 7.0], [64.5, 7.0], [64.6, 7.0], [64.7, 7.0], [64.8, 7.0], [64.9, 7.0], [65.0, 7.0], [65.1, 7.0], [65.2, 7.0], [65.3, 7.0], [65.4, 7.0], [65.5, 7.0], [65.6, 7.0], [65.7, 7.0], [65.8, 7.0], [65.9, 7.0], [66.0, 7.0], [66.1, 7.0], [66.2, 7.0], [66.3, 7.0], [66.4, 7.0], [66.5, 7.0], [66.6, 7.0], [66.7, 7.0], [66.8, 7.0], [66.9, 7.0], [67.0, 7.0], [67.1, 7.0], [67.2, 7.0], [67.3, 7.0], [67.4, 7.0], [67.5, 7.0], [67.6, 7.0], [67.7, 7.0], [67.8, 7.0], [67.9, 7.0], [68.0, 7.0], [68.1, 7.0], [68.2, 7.0], [68.3, 7.0], [68.4, 7.0], [68.5, 7.0], [68.6, 7.0], [68.7, 7.0], [68.8, 7.0], [68.9, 7.0], [69.0, 7.0], [69.1, 7.0], [69.2, 7.0], [69.3, 7.0], [69.4, 7.0], [69.5, 7.0], [69.6, 7.0], [69.7, 7.0], [69.8, 7.0], [69.9, 7.0], [70.0, 7.0], [70.1, 7.0], [70.2, 7.0], [70.3, 7.0], [70.4, 7.0], [70.5, 8.0], [70.6, 8.0], [70.7, 8.0], [70.8, 8.0], [70.9, 8.0], [71.0, 8.0], [71.1, 8.0], [71.2, 8.0], [71.3, 8.0], [71.4, 8.0], [71.5, 8.0], [71.6, 8.0], [71.7, 8.0], [71.8, 8.0], [71.9, 8.0], [72.0, 8.0], [72.1, 8.0], [72.2, 8.0], [72.3, 8.0], [72.4, 8.0], [72.5, 8.0], [72.6, 8.0], [72.7, 8.0], [72.8, 8.0], [72.9, 8.0], [73.0, 8.0], [73.1, 8.0], [73.2, 8.0], [73.3, 8.0], [73.4, 8.0], [73.5, 8.0], [73.6, 8.0], [73.7, 8.0], [73.8, 8.0], [73.9, 8.0], [74.0, 8.0], [74.1, 8.0], [74.2, 8.0], [74.3, 8.0], [74.4, 8.0], [74.5, 8.0], [74.6, 8.0], [74.7, 8.0], [74.8, 8.0], [74.9, 8.0], [75.0, 8.0], [75.1, 8.0], [75.2, 8.0], [75.3, 8.0], [75.4, 8.0], [75.5, 8.0], [75.6, 8.0], [75.7, 8.0], [75.8, 8.0], [75.9, 8.0], [76.0, 8.0], [76.1, 8.0], [76.2, 8.0], [76.3, 8.0], [76.4, 8.0], [76.5, 8.0], [76.6, 8.0], [76.7, 8.0], [76.8, 8.0], [76.9, 8.0], [77.0, 8.0], [77.1, 8.0], [77.2, 8.0], [77.3, 8.0], [77.4, 8.0], [77.5, 8.0], [77.6, 8.0], [77.7, 8.0], [77.8, 8.0], [77.9, 8.0], [78.0, 8.0], [78.1, 8.0], [78.2, 8.0], [78.3, 8.0], [78.4, 8.0], [78.5, 8.0], [78.6, 8.0], [78.7, 8.0], [78.8, 8.0], [78.9, 8.0], [79.0, 8.0], [79.1, 8.0], [79.2, 8.0], [79.3, 8.0], [79.4, 8.0], [79.5, 8.0], [79.6, 8.0], [79.7, 8.0], [79.8, 8.0], [79.9, 8.0], [80.0, 9.0], [80.1, 9.0], [80.2, 9.0], [80.3, 9.0], [80.4, 9.0], [80.5, 9.0], [80.6, 9.0], [80.7, 9.0], [80.8, 9.0], [80.9, 9.0], [81.0, 9.0], [81.1, 9.0], [81.2, 9.0], [81.3, 9.0], [81.4, 9.0], [81.5, 9.0], [81.6, 9.0], [81.7, 9.0], [81.8, 9.0], [81.9, 9.0], [82.0, 9.0], [82.1, 9.0], [82.2, 9.0], [82.3, 9.0], [82.4, 9.0], [82.5, 9.0], [82.6, 9.0], [82.7, 9.0], [82.8, 9.0], [82.9, 9.0], [83.0, 9.0], [83.1, 9.0], [83.2, 9.0], [83.3, 9.0], [83.4, 9.0], [83.5, 9.0], [83.6, 9.0], [83.7, 9.0], [83.8, 9.0], [83.9, 9.0], [84.0, 9.0], [84.1, 9.0], [84.2, 9.0], [84.3, 9.0], [84.4, 9.0], [84.5, 9.0], [84.6, 9.0], [84.7, 9.0], [84.8, 9.0], [84.9, 9.0], [85.0, 9.0], [85.1, 9.0], [85.2, 9.0], [85.3, 9.0], [85.4, 9.0], [85.5, 9.0], [85.6, 9.0], [85.7, 9.0], [85.8, 9.0], [85.9, 9.0], [86.0, 9.0], [86.1, 9.0], [86.2, 9.0], [86.3, 10.0], [86.4, 10.0], [86.5, 10.0], [86.6, 10.0], [86.7, 10.0], [86.8, 10.0], [86.9, 10.0], [87.0, 10.0], [87.1, 10.0], [87.2, 10.0], [87.3, 10.0], [87.4, 10.0], [87.5, 10.0], [87.6, 10.0], [87.7, 10.0], [87.8, 10.0], [87.9, 10.0], [88.0, 10.0], [88.1, 10.0], [88.2, 10.0], [88.3, 10.0], [88.4, 10.0], [88.5, 10.0], [88.6, 10.0], [88.7, 10.0], [88.8, 10.0], [88.9, 10.0], [89.0, 10.0], [89.1, 10.0], [89.2, 10.0], [89.3, 10.0], [89.4, 10.0], [89.5, 10.0], [89.6, 10.0], [89.7, 10.0], [89.8, 10.0], [89.9, 10.0], [90.0, 10.0], [90.1, 10.0], [90.2, 11.0], [90.3, 11.0], [90.4, 11.0], [90.5, 11.0], [90.6, 11.0], [90.7, 11.0], [90.8, 11.0], [90.9, 11.0], [91.0, 11.0], [91.1, 11.0], [91.2, 11.0], [91.3, 11.0], [91.4, 11.0], [91.5, 11.0], [91.6, 11.0], [91.7, 11.0], [91.8, 11.0], [91.9, 11.0], [92.0, 11.0], [92.1, 11.0], [92.2, 11.0], [92.3, 11.0], [92.4, 11.0], [92.5, 11.0], [92.6, 11.0], [92.7, 12.0], [92.8, 12.0], [92.9, 12.0], [93.0, 12.0], [93.1, 12.0], [93.2, 12.0], [93.3, 12.0], [93.4, 12.0], [93.5, 12.0], [93.6, 12.0], [93.7, 12.0], [93.8, 12.0], [93.9, 12.0], [94.0, 12.0], [94.1, 12.0], [94.2, 12.0], [94.3, 12.0], [94.4, 13.0], [94.5, 13.0], [94.6, 13.0], [94.7, 13.0], [94.8, 13.0], [94.9, 13.0], [95.0, 13.0], [95.1, 13.0], [95.2, 13.0], [95.3, 13.0], [95.4, 13.0], [95.5, 14.0], [95.6, 14.0], [95.7, 14.0], [95.8, 14.0], [95.9, 14.0], [96.0, 14.0], [96.1, 14.0], [96.2, 14.0], [96.3, 15.0], [96.4, 15.0], [96.5, 15.0], [96.6, 15.0], [96.7, 15.0], [96.8, 16.0], [96.9, 16.0], [97.0, 16.0], [97.1, 16.0], [97.2, 17.0], [97.3, 17.0], [97.4, 17.0], [97.5, 18.0], [97.6, 18.0], [97.7, 18.0], [97.8, 19.0], [97.9, 19.0], [98.0, 20.0], [98.1, 20.0], [98.2, 21.0], [98.3, 22.0], [98.4, 23.0], [98.5, 24.0], [98.6, 26.0], [98.7, 27.0], [98.8, 30.0], [98.9, 33.0], [99.0, 37.0], [99.1, 42.0], [99.2, 50.0], [99.3, 68.0], [99.4, 97.0], [99.5, 215.0], [99.6, 1564.0], [99.7, 1679.0], [99.8, 1750.0], [99.9, 1853.0], [100.0, 2421.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1851714.0, "series": [{"data": [[0.0, 1851714.0], [2100.0, 203.0], [600.0, 1.0], [2400.0, 100.0], [200.0, 389.0], [300.0, 203.0], [1400.0, 270.0], [1500.0, 1231.0], [100.0, 1678.0], [400.0, 54.0], [1600.0, 1996.0], [1700.0, 2591.0], [1800.0, 1422.0], [1900.0, 590.0], [500.0, 42.0], [2000.0, 297.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 2400.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 320.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1854038.0, "series": [{"data": [[0.0, 1854038.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 320.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 8423.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 86.55350358053043, "minX": 1.76899236E12, "maxY": 100.0, "series": [{"data": [[1.76899242E12, 100.0], [1.7689926E12, 100.0], [1.76899266E12, 100.0], [1.76899248E12, 100.0], [1.76899254E12, 100.0], [1.76899236E12, 86.55350358053043]], "isOverall": false, "label": "1. Baseline Test", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76899266E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 1.7944954128440358, "minX": 1.0, "maxY": 16.263606590457893, "series": [{"data": [[2.0, 3.1415929203539825], [3.0, 3.3030303030303014], [4.0, 3.037558685446008], [5.0, 2.6379310344827585], [6.0, 1.7944954128440358], [7.0, 1.811732605729878], [8.0, 2.237891737891736], [9.0, 2.0476190476190506], [10.0, 2.2258064516129052], [11.0, 2.434561626429484], [12.0, 2.6722595078299767], [13.0, 3.618902439024389], [14.0, 3.5175552665799725], [15.0, 3.1644880174291976], [16.0, 3.29095074455899], [17.0, 3.2192307692307667], [18.0, 3.9293598233995555], [19.0, 3.070984915705413], [20.0, 2.8998516320474796], [21.0, 3.3090909090909144], [22.0, 3.230312035661216], [23.0, 3.997395833333341], [24.0, 3.734939759036143], [25.0, 3.8750981932443054], [26.0, 3.743846153846154], [27.0, 3.8185451638689045], [28.0, 7.76417525773195], [29.0, 4.053929121725733], [30.0, 4.2352941176470615], [31.0, 4.096774193548388], [32.0, 3.927740355174524], [33.0, 4.004895960832313], [34.0, 4.275069637882998], [35.0, 3.596454640250256], [36.0, 4.320754716981135], [37.0, 4.89417280643001], [38.0, 6.271980279375518], [39.0, 4.875344352617079], [40.0, 4.212421711899788], [41.0, 4.421236872812141], [42.0, 4.118870728083216], [43.0, 5.897348742352134], [44.0, 4.396226415094334], [45.0, 5.210220673635308], [46.0, 4.8543307086614025], [47.0, 5.219730941704037], [48.0, 5.828553996339244], [49.0, 4.787689097548268], [50.0, 4.637674418604662], [51.0, 5.446882217090074], [52.0, 5.640608034744845], [53.0, 5.152003910068424], [54.0, 4.998513379583745], [55.0, 5.435467980295577], [56.0, 5.607403545359757], [57.0, 5.540275049115915], [58.0, 6.232929515418504], [59.0, 5.328323156411467], [60.0, 4.918638439186382], [61.0, 5.636860407352208], [62.0, 8.489451476793247], [63.0, 7.957286432160798], [64.0, 11.14088669950738], [65.0, 7.606060606060594], [66.0, 8.796527777777786], [67.0, 6.143250688705233], [68.0, 6.75227502527805], [69.0, 5.8878718535469075], [70.0, 9.2549152542373], [71.0, 7.710555555555542], [72.0, 7.869745411486094], [73.0, 8.573148705599044], [74.0, 7.472136222910213], [75.0, 6.984700973574411], [76.0, 6.882812499999989], [77.0, 6.988038277511965], [78.0, 8.367102396514152], [79.0, 8.354304635761592], [80.0, 7.254652746255106], [81.0, 8.325437693099902], [82.0, 6.777192982456149], [83.0, 6.848736013261502], [84.0, 7.366697848456511], [85.0, 6.88982710092481], [86.0, 7.069456066945606], [87.0, 8.078705939159821], [88.0, 11.575737265415553], [89.0, 8.548560273304048], [90.0, 7.520594479830146], [91.0, 7.962455830388676], [92.0, 7.412159329140462], [93.0, 7.643093465674103], [94.0, 7.933657673595747], [95.0, 8.119377162629775], [96.0, 7.352091254752852], [97.0, 7.925262237762237], [98.0, 8.164366373902128], [99.0, 8.707212713936416], [100.0, 16.263606590457893], [1.0, 3.756097560975611]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[96.53845191678568, 15.396367581589391]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 7568.75, "minX": 1.76899236E12, "maxY": 4880090.266666667, "series": [{"data": [[1.76899242E12, 2419070.533333333], [1.7689926E12, 55403.25], [1.76899266E12, 7568.75], [1.76899248E12, 1374346.6], [1.76899254E12, 131961.51666666666], [1.76899236E12, 1382667.9]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.76899242E12, 4880090.266666667], [1.7689926E12, 111767.25], [1.76899266E12, 15268.75], [1.76899248E12, 2772525.8], [1.76899254E12, 266211.38333333336], [1.76899236E12, 2789312.7]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76899266E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 6.525774808252891, "minX": 1.76899236E12, "maxY": 753.0674285714281, "series": [{"data": [[1.76899242E12, 6.9584247137015085], [1.7689926E12, 314.9900078064021], [1.76899266E12, 753.0674285714281], [1.76899248E12, 12.056294739138405], [1.76899254E12, 129.71584329320282], [1.76899236E12, 6.525774808252891]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76899266E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 6.511237899811976, "minX": 1.76899236E12, "maxY": 752.9813333333332, "series": [{"data": [[1.76899242E12, 6.94469620397995], [1.7689926E12, 314.88493364558957], [1.76899266E12, 752.9813333333332], [1.76899248E12, 12.03833404664195], [1.76899254E12, 129.65960189656357], [1.76899236E12, 6.511237899811976]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76899266E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.76899236E12, "maxY": 0.01628935727296392, "series": [{"data": [[1.76899242E12, 5.9595892174344515E-5], [1.7689926E12, 0.01628935727296392], [1.76899266E12, 0.0], [1.76899248E12, 1.1748613244043613E-4], [1.76899254E12, 0.009897961413245285], [1.76899236E12, 1.0426702367695922E-4]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76899266E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.76899236E12, "maxY": 2421.0, "series": [{"data": [[1.76899242E12, 398.0], [1.7689926E12, 2100.0], [1.76899266E12, 2019.0], [1.76899248E12, 1959.0], [1.76899254E12, 2421.0], [1.76899236E12, 139.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.76899242E12, 0.0], [1.7689926E12, 0.0], [1.76899266E12, 0.0], [1.76899248E12, 0.0], [1.76899254E12, 0.0], [1.76899236E12, 0.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.76899242E12, 11.0], [1.7689926E12, 1650.0], [1.76899266E12, 1690.4], [1.76899248E12, 15.0], [1.76899254E12, 32.900000000001455], [1.76899236E12, 7.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.76899242E12, 30.0], [1.7689926E12, 1895.0], [1.76899266E12, 2015.0], [1.76899248E12, 1897.0], [1.76899254E12, 2093.7900000000336], [1.76899236E12, 12.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.76899242E12, 8.0], [1.7689926E12, 10.0], [1.76899266E12, 12.0], [1.76899248E12, 9.0], [1.76899254E12, 9.0], [1.76899236E12, 5.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.76899242E12, 14.0], [1.7689926E12, 1754.0], [1.76899266E12, 1714.0], [1.76899248E12, 21.0], [1.76899254E12, 1709.0], [1.76899236E12, 8.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76899266E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 1809.0, "series": [{"data": [[16907.0, 6.0], [17003.0, 5.0], [17051.0, 5.0], [17483.0, 5.0], [8605.0, 7.0], [9073.0, 8.0], [9385.0, 6.0], [9889.0, 8.0], [10209.0, 8.0], [10393.0, 5.0], [10241.0, 8.0], [10629.0, 7.0], [10789.0, 8.0], [11089.0, 8.0], [11353.0, 8.0], [11465.0, 6.0], [11601.0, 7.0], [11997.0, 7.0], [12049.0, 7.0], [12181.0, 7.0], [12197.0, 7.0], [12645.0, 7.0], [12341.0, 7.0], [12969.0, 7.0], [13501.0, 7.0], [14065.0, 6.0], [14041.0, 6.0], [14093.0, 6.0], [14809.0, 6.0], [15357.0, 6.0], [14877.0, 6.0], [16121.0, 6.0], [16361.0, 6.0], [16229.0, 5.0], [16434.0, 5.0], [18162.0, 5.0], [100.0, 1651.5], [140.0, 1647.0], [181.0, 1809.0], [186.0, 9.0], [229.0, 10.0], [230.0, 13.0], [231.0, 11.0], [228.0, 7.0], [345.0, 15.0], [375.0, 9.0], [423.0, 9.0], [460.0, 9.0], [456.0, 9.0], [459.0, 10.0], [457.0, 13.0], [464.0, 9.0], [494.0, 10.0], [504.0, 13.5], [509.0, 9.0], [552.0, 8.0], [574.0, 14.0], [547.0, 10.0], [646.0, 9.0], [665.0, 11.0], [687.0, 9.0], [690.0, 10.0], [689.0, 10.0], [688.0, 12.0], [750.0, 10.0], [775.0, 13.0], [804.0, 10.0], [884.0, 9.0], [901.0, 6.0], [917.0, 9.0], [921.0, 10.0], [919.0, 10.0], [955.0, 10.0], [993.0, 3.0], [17377.0, 5.0], [16825.0, 5.0], [16417.0, 6.0], [16689.0, 5.0], [17137.0, 5.0], [1032.0, 9.0], [1147.0, 11.0], [1151.0, 10.0], [1149.0, 9.0], [1148.0, 9.0], [1092.0, 7.0], [1264.0, 9.0], [1234.0, 11.0], [1374.0, 9.0], [1382.0, 8.0], [1492.0, 6.0], [1538.0, 8.0], [1554.0, 9.0], [1610.0, 9.0], [1605.0, 11.0], [1722.0, 11.0], [1838.0, 10.0], [1835.0, 10.0], [1954.0, 10.0], [2010.0, 9.0], [2127.0, 10.0], [2067.0, 9.0], [2297.0, 8.0], [2264.0, 9.0], [2335.0, 8.0], [2410.0, 9.0], [2526.0, 8.0], [2471.0, 8.0], [2641.0, 9.0], [2758.0, 9.0], [2741.0, 7.0], [2698.0, 10.0], [2833.0, 9.0], [3754.0, 2.0], [4046.0, 2.0], [6076.0, 3.0], [6118.0, 4.0], [6616.0, 10.0], [7772.0, 8.0], [7800.0, 7.0], [8724.0, 4.0], [8900.0, 8.0], [9684.0, 7.0], [9964.0, 7.0], [10432.0, 8.0], [10636.0, 8.0], [10956.0, 7.0], [11228.0, 7.0], [11540.0, 7.0], [11568.0, 7.0], [11592.0, 7.0], [12256.0, 7.0], [12144.0, 7.0], [12724.0, 6.0], [12340.0, 6.0], [12576.0, 7.0], [12812.0, 7.0], [13064.0, 7.0], [14720.0, 6.0], [15672.0, 6.0], [15776.0, 6.0], [15860.0, 6.0], [15816.0, 6.0], [17112.0, 5.0], [16832.0, 6.0], [17256.0, 5.0], [17072.0, 5.0], [16936.0, 5.0], [17536.0, 5.0], [16727.0, 5.0], [16599.0, 5.0], [18895.0, 5.0], [9279.0, 5.0], [9363.0, 7.0], [9643.0, 7.0], [9651.0, 8.0], [10147.0, 8.0], [10203.0, 8.0], [11767.0, 8.0], [11607.0, 7.0], [11923.0, 8.0], [12279.0, 7.0], [12631.0, 7.0], [12307.0, 7.0], [13731.0, 6.0], [13559.0, 6.0], [13467.0, 7.0], [13915.0, 6.0], [14755.0, 6.0], [14339.0, 6.0], [14439.0, 6.0], [14471.0, 6.0], [15027.0, 6.0], [15675.0, 6.0], [15695.0, 6.0], [16291.0, 5.0], [16798.0, 5.0], [17182.0, 5.0], [16573.0, 5.0], [4789.0, 8.0], [5355.0, 3.0], [7675.0, 4.0], [7537.0, 7.0], [8111.0, 4.0], [8782.0, 7.0], [8894.0, 6.0], [9634.0, 5.0], [9318.0, 7.0], [9718.0, 9.0], [9870.0, 7.0], [10734.0, 8.0], [10442.0, 8.0], [10822.0, 8.0], [11022.0, 8.0], [11526.0, 7.0], [11630.0, 7.0], [11882.0, 7.0], [12286.0, 7.0], [12038.0, 7.0], [12054.0, 7.0], [12246.0, 7.0], [12462.0, 7.0], [13758.0, 7.0], [13522.0, 6.0], [13418.0, 6.0], [14462.0, 6.0], [14778.0, 6.0], [15234.0, 6.0], [15202.0, 6.0], [15030.0, 6.0], [16174.0, 6.0], [15922.0, 6.0], [1.0, 27.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18895.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 2.0, "minX": 1.0, "maxY": 1808.0, "series": [{"data": [[16907.0, 6.0], [17003.0, 5.0], [17051.0, 5.0], [17483.0, 5.0], [8605.0, 7.0], [9073.0, 8.0], [9385.0, 6.0], [9889.0, 8.0], [10209.0, 8.0], [10393.0, 5.0], [10241.0, 8.0], [10629.0, 7.0], [10789.0, 8.0], [11089.0, 8.0], [11353.0, 8.0], [11465.0, 6.0], [11601.0, 7.0], [11997.0, 7.0], [12049.0, 7.0], [12181.0, 7.0], [12197.0, 7.0], [12645.0, 7.0], [12341.0, 7.0], [12969.0, 7.0], [13501.0, 7.0], [14065.0, 6.0], [14041.0, 6.0], [14093.0, 6.0], [14809.0, 6.0], [15357.0, 6.0], [14877.0, 6.0], [16121.0, 6.0], [16361.0, 6.0], [16229.0, 5.0], [16434.0, 5.0], [18162.0, 5.0], [100.0, 1651.5], [140.0, 1646.5], [181.0, 1808.0], [186.0, 9.0], [229.0, 10.0], [230.0, 13.0], [231.0, 10.0], [228.0, 7.0], [345.0, 15.0], [375.0, 9.0], [423.0, 9.0], [460.0, 9.0], [456.0, 9.0], [459.0, 10.0], [457.0, 13.0], [464.0, 9.0], [494.0, 10.0], [504.0, 13.0], [509.0, 9.0], [552.0, 8.0], [574.0, 14.0], [547.0, 10.0], [646.0, 9.0], [665.0, 11.0], [687.0, 8.0], [690.0, 10.0], [689.0, 10.0], [688.0, 12.0], [750.0, 10.0], [775.0, 13.0], [804.0, 10.0], [884.0, 9.0], [901.0, 5.0], [917.0, 9.0], [921.0, 10.0], [919.0, 10.0], [955.0, 10.0], [993.0, 3.0], [17377.0, 5.0], [16825.0, 5.0], [16417.0, 6.0], [16689.0, 5.0], [17137.0, 5.0], [1032.0, 9.0], [1147.0, 11.0], [1151.0, 10.0], [1149.0, 9.0], [1148.0, 9.0], [1092.0, 7.0], [1264.0, 9.0], [1234.0, 11.0], [1374.0, 9.0], [1382.0, 8.0], [1492.0, 6.0], [1538.0, 8.0], [1554.0, 9.0], [1610.0, 9.0], [1605.0, 11.0], [1722.0, 11.0], [1838.0, 10.0], [1835.0, 10.0], [1954.0, 10.0], [2010.0, 9.0], [2127.0, 10.0], [2067.0, 9.0], [2297.0, 8.0], [2264.0, 9.0], [2335.0, 8.0], [2410.0, 9.0], [2526.0, 8.0], [2471.0, 8.0], [2641.0, 9.0], [2758.0, 9.0], [2741.0, 7.0], [2698.0, 10.0], [2833.0, 9.0], [3754.0, 2.0], [4046.0, 2.0], [6076.0, 3.0], [6118.0, 4.0], [6616.0, 10.0], [7772.0, 8.0], [7800.0, 7.0], [8724.0, 4.0], [8900.0, 8.0], [9684.0, 7.0], [9964.0, 7.0], [10432.0, 8.0], [10636.0, 8.0], [10956.0, 7.0], [11228.0, 7.0], [11540.0, 7.0], [11568.0, 7.0], [11592.0, 7.0], [12256.0, 7.0], [12144.0, 7.0], [12724.0, 6.0], [12340.0, 6.0], [12576.0, 7.0], [12812.0, 7.0], [13064.0, 7.0], [14720.0, 6.0], [15672.0, 6.0], [15776.0, 6.0], [15860.0, 6.0], [15816.0, 6.0], [17112.0, 5.0], [16832.0, 6.0], [17256.0, 5.0], [17072.0, 5.0], [16936.0, 5.0], [17536.0, 5.0], [16727.0, 5.0], [16599.0, 5.0], [18895.0, 5.0], [9279.0, 5.0], [9363.0, 7.0], [9643.0, 7.0], [9651.0, 8.0], [10147.0, 8.0], [10203.0, 8.0], [11767.0, 8.0], [11607.0, 7.0], [11923.0, 8.0], [12279.0, 7.0], [12631.0, 7.0], [12307.0, 7.0], [13731.0, 6.0], [13559.0, 6.0], [13467.0, 7.0], [13915.0, 6.0], [14755.0, 6.0], [14339.0, 6.0], [14439.0, 6.0], [14471.0, 6.0], [15027.0, 6.0], [15675.0, 6.0], [15695.0, 6.0], [16291.0, 5.0], [16798.0, 5.0], [17182.0, 5.0], [16573.0, 5.0], [4789.0, 8.0], [5355.0, 3.0], [7675.0, 4.0], [7537.0, 7.0], [8111.0, 4.0], [8782.0, 7.0], [8894.0, 6.0], [9634.0, 5.0], [9318.0, 7.0], [9718.0, 9.0], [9870.0, 7.0], [10734.0, 8.0], [10442.0, 8.0], [10822.0, 8.0], [11022.0, 8.0], [11526.0, 7.0], [11630.0, 7.0], [11882.0, 7.0], [12286.0, 7.0], [12038.0, 7.0], [12054.0, 7.0], [12246.0, 7.0], [12462.0, 7.0], [13758.0, 7.0], [13522.0, 6.0], [13418.0, 6.0], [14462.0, 6.0], [14778.0, 6.0], [15234.0, 6.0], [15202.0, 6.0], [15030.0, 6.0], [16174.0, 6.0], [15922.0, 6.0], [1.0, 24.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18895.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 42.083333333333336, "minX": 1.76899236E12, "maxY": 13983.1, "series": [{"data": [[1.76899242E12, 13983.1], [1.7689926E12, 320.25], [1.76899266E12, 42.083333333333336], [1.76899248E12, 7944.2], [1.76899254E12, 762.7833333333333], [1.76899236E12, 7993.933333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76899266E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 43.75, "minX": 1.76899236E12, "maxY": 13983.066666666668, "series": [{"data": [[1.76899242E12, 13983.066666666668], [1.7689926E12, 320.25], [1.76899266E12, 43.75], [1.76899248E12, 7944.2], [1.76899254E12, 762.7833333333333], [1.76899236E12, 7992.3]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76899266E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 43.75, "minX": 1.76899236E12, "maxY": 13983.066666666668, "series": [{"data": [[1.76899242E12, 13983.066666666668], [1.7689926E12, 320.25], [1.76899266E12, 43.75], [1.76899248E12, 7944.2], [1.76899254E12, 762.7833333333333], [1.76899236E12, 7992.3]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76899266E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 43.75, "minX": 1.76899236E12, "maxY": 13983.066666666668, "series": [{"data": [[1.76899242E12, 13983.066666666668], [1.7689926E12, 320.25], [1.76899266E12, 43.75], [1.76899248E12, 7944.2], [1.76899254E12, 762.7833333333333], [1.76899236E12, 7992.3]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76899266E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

