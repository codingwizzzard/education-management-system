"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){new ApexCharts(document.querySelector("#total-line-1-chart"),{chart:{type:"line",height:60,sparkline:{enabled:!0}},dataLabels:{enabled:!1},colors:["#2ca87f"],stroke:{curve:"straight",lineCap:"round",width:3},series:[{name:"series1",data:[20,10,18,12,25,10,20]}],yaxis:{min:0,max:30},tooltip:{theme:"dark",fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}}).render()},500)});