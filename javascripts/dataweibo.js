function showload(){
			 $("#dialog").show();
		 }
function hideload(){
			 $("#dialog").hide();
		 }
$(document).ready(function() {
$.ajax({
	type: "get",
	dataType:'json',
	url:'jsons/province/6.json',
	error: function(XMLHttpRequest, textStatus, errorThrown) {
                                   alert("抱歉，无法加载");
                                },
	beforeSend:function(){
		showload();
	},
	success:function(data){
	            console.log(data);
				$("a#province").html(data.province);
				render_pie(data.male,data.fe,100,60,createsvgpie1(),"男性");
				render_pie(data.plusv,data.notv,100,60,createsvgpie2(),"认证");
				render_pie(data.fol,data.ori,100,60,createsvgpie3(),"转发");
				var datasource=[data.weibo,data.ios,data.android,data.thirst,data.qita];
				render_source(datasource,createsvgsrc());
				render_time(data.zero0,data.one,data.two,data.three,data.four,data.five,data.six,data.seven,data.eight,data.nine,data.ten,data.eleven,
				data.twelve,data.thirteen,data.fourteen,data.fifteen,data.sixteen,data.seventeen,data.eighteen,data.ninteen,data.twenty,
				data.twentyone,data.twentytwo,data.twentythree,createsvgzhe());
				$("li#hotuser1").html(data.ren1);
				$("li#hotuser2").html(data.ren2);
				$("li#hotuser3").html(data.ren3);
				$("li#hotuser4").html(data.ren4);
				$("li#hotuser5").html(data.ren5);
				$("li#hotuser6").html(data.ren6);
				$("li#hotuser7").html(data.ren7);
				$("li#hotuser8").html(data.ren8);
				$("li#hotuser9").html(data.ren9);
				$("li#hotuser10").html(data.ren10);
				
				$("li#hottopic1").html(data.top1);
				$("li#hottopic2").html(data.top2);
				$("li#hottopic3").html(data.top3);
				$("li#hottopic4").html(data.top4);
				$("li#hottopic5").html(data.top5);
				$("li#hottopic6").html(data.top6);
				$("li#hottopic7").html(data.top7);
				$("li#hottopic8").html(data.top8);
				$("li#hottopic9").html(data.top9);
				$("li#hottopic10").html(data.top10);
	},
	complete:function(){
		hideload();
	}
		});	//ajax

});
 
function chinamap(){
	document.getElementById("mapwindow").innerHTML = "";
   var wi=document.documentElement.scrollWidth * 0.5;
   var hi=document.documentElement.scrollHeight* 0.8;
   var svg=d3.select("#mapwindow")
				.append("svg")
                .attr({
					width:wi,
					height:hi
				});

		svg.append("g")
			   .attr("class","map")
			   .attr({
			   	width:wi,
			   	height:hi
			   	});
	var projection=d3.geo.mercator()
				.center([104,38])
				.scale(wi*0.9)
				.translate([wi/2,hi/2]);
						
	var path=d3.geo.path()
				.projection(projection);
	
	d3.json("jsons/china.json", function(error,jsons) {
					if(error)
						return console.error(error);					   			
	        d3.select("g.map")
					   .selectAll("path")
					   .attr("class","naw1")
					   .data(jsons.features)
					   .enter()
					   .append("path")
					   .attr("stroke","#000")
					   .attr("stroke-width",1)
					   .attr("d", path)
					   .attr("fill", "#FAFAD2")
					   .on("click",function(d,i){
								var jsonid=d.properties.id;
								d3.json("jsons/"+jsonid+".json", function(error,fenjson) {
						        d3.select("g.map")
								   .selectAll("g.path2")
								   .attr("class","naw")
								   .data(fenjson.features)
								   .enter()
								   .append("path")
								   .attr("stroke","#000")
								   .attr("stroke-width",1)
								   .attr("d", path)
								   .attr("fill", "yellow")
							})    
							var jsonid=d.properties.id;
							$.ajax({
								type: "get",
								dataType:'json',
								url:'jsons/province/'+jsonid+'.json',
								error: function(XMLHttpRequest, textStatus, errorThrown) {
                                   alert("抱歉，无法加载");
                                },
								beforeSend:function(){
		                            showload();
	                                 },
								success:function(data){
										console.log(data);
										//清除之前div里面的内容
										document.getElementById("pie1").innerHTML = "";
										document.getElementById("pie2").innerHTML = "";
										document.getElementById("pie3").innerHTML = "";
										document.getElementById("source").innerHTML = "";
										document.getElementById("time").innerHTML = "";
										document.getElementById("hottopic1").innerHTML = "";
										document.getElementById("hottopic2").innerHTML = "";
										document.getElementById("hottopic3").innerHTML = "";
										document.getElementById("hottopic4").innerHTML = "";
										document.getElementById("hottopic5").innerHTML = "";
										document.getElementById("hottopic6").innerHTML = "";
										document.getElementById("hottopic7").innerHTML = "";
										document.getElementById("hottopic8").innerHTML = "";
										document.getElementById("hottopic9").innerHTML = "";
										document.getElementById("hottopic10").innerHTML = "";
										document.getElementById("hotuser1").innerHTML = "";
										document.getElementById("hotuser2").innerHTML = "";
										document.getElementById("hotuser3").innerHTML = "";
										document.getElementById("hotuser4").innerHTML = "";
										document.getElementById("hotuser5").innerHTML = "";
										document.getElementById("hotuser6").innerHTML = "";
										document.getElementById("hotuser7").innerHTML = "";
										document.getElementById("hotuser8").innerHTML = "";
										document.getElementById("hotuser9").innerHTML = "";
										document.getElementById("hotuser10").innerHTML = "";
										document.getElementById("province").innerHTML = "";
										$("a#province").html(data.province);
										render_pie(data.male,data.fe,100,60,createsvgpie1(),"男性");
										render_pie(data.plusv,data.notv,100,60,createsvgpie2(),"认证");
										render_pie(data.fol,data.ori,100,60,createsvgpie3(),"转发");
										var datasource=[data.weibo,data.ios,data.android,data.thirst,data.qita];
										render_source(datasource,createsvgsrc());
										render_time(data.zero0,data.one,data.two,data.three,data.four,data.five,data.six,data.seven,data.eight,data.nine,data.ten,data.eleven,
													data.twelve,data.thirteen,data.fourteen,data.fifteen,data.sixteen,data.seventeen,data.eighteen,data.ninteen,data.twenty,
													data.twentyone,data.twentytwo,data.twentythree,createsvgzhe());
										$("li#hotuser1").html(data.ren1);
										$("li#hotuser2").html(data.ren2);
										$("li#hotuser3").html(data.ren3);
										$("li#hotuser4").html(data.ren4);
										$("li#hotuser5").html(data.ren5);
										$("li#hotuser6").html(data.ren6);
										$("li#hotuser7").html(data.ren7);
										$("li#hotuser8").html(data.ren8);
										$("li#hotuser9").html(data.ren9);
										$("li#hotuser10").html(data.ren10);
				
										$("li#hottopic1").html(data.top1);
										$("li#hottopic2").html(data.top2);
										$("li#hottopic3").html(data.top3);
										$("li#hottopic4").html(data.top4);
										$("li#hottopic5").html(data.top5);
										$("li#hottopic6").html(data.top6);
										$("li#hottopic7").html(data.top7);
										$("li#hottopic8").html(data.top8);
										$("li#hottopic9").html(data.top9);
										$("li#hottopic10").html(data.top10);
								},
								complete:function(){
										hideload();
												}
									});	//ajax
				
				
							})//click
					   .on("mouseup",function(d,i){
					   		d3.select("g.map")
					   			.selectAll("path")
								.attr("fill","#FAFAD2")
					   	    })
					.append("title")
					.text(function(d,i){return d.properties.name})
					});//d3.json

	
	}
	
	
	//下面是各个svg创建函数的定义
	var piewidth=200;
    var pieheight=200;
	function createsvgpie1(){
				var svg=d3.select("#pie1")
	   			.append("svg")
	   			.attr({
				    width:piewidth,
	   				height:pieheight
	   				});
			    return svg;
	}
	function createsvgpie2(){
				var svg=d3.select("#pie2")
	   			.append("svg")
	   			.attr({
				    width:piewidth,
	   				height:pieheight
	   				});
				return svg;
	}
	function createsvgpie3(){
				var svg=d3.select("#pie3")
	   			.append("svg")
	   			.attr({
				    width:piewidth,
	   				height:pieheight
	   				});
				return svg;
	}
	function createsvgpie4(){
				var svg=d3.select("#pie4")
	   			.append("svg")
	   			.attr({
				    width:piewidth,
	   				height:pieheight
	   				});	
				return svg;
	}
var wikuang=document.documentElement.scrollWidth * (1/3);
	function createsvgsrc(){
                var svg=d3.select("#source")
	             .append("svg")
				 .attr("class","chart")
				 .attr({
				width:wikuang,
				 //width:500,
				 height:475
				 });
			return svg;
	}
	
var margin = {
			top: 50,
			right: 50,
			bottom: 50,
			left: 50
		};
var margin = {
			top: 50,
			right: 50,
			bottom: 50,
			left: 50
		};
var widthz = wikuang- margin.left - margin.right;
var heightz = 475 - margin.bottom - margin.top;	
	function createsvgzhe(){
                var svg = d3.select("#time").append("svg")
	                         .attr("width", widthz + margin.left + margin.right)
			                 .attr("height",heightz+margin.top+margin.bottom);
			    return svg;
			}
	//饼图函数
	function render_pie(content1,content2,outerRadius,innerRadius,svgname,name1){
      var dataplus=[content1,content2];	  
      var arc=d3.svg.arc()
               .innerRadius(innerRadius)
               .outerRadius(outerRadius);
      var pie=d3.layout.pie();
      var color=["#3399CC","#99CCFF"];
	  var arcs = svgname.selectAll("g.arc")
						  .data(pie(dataplus))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
		arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color[i];
			    })
			    .attr("d", arc);
		arcs.append("text")
		        .transition()
			    .duration(3000)
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			    	return d.value+"%";
			    });
		svgname.data(pie(dataplus)).append("text").attr("x",75).attr("y",105).text(function(d) {return d.value+"%"+name1;});
      }//render_pie
	  //消息来源函数
	
	function render_source(datasource,svgname){
	svgname.append("g")
			.attr("class","source1")
			.attr("transform","translate(0,150)");
	svgname.append("g")
			.attr("class","source2")
            .attr("transform","translate(70,150)");
	d3.select("g.source1")
	         .append("text")
			 .attr("class","sourcetext")
			 .attr("transform","translate(0,30)")
			 .text("weibo.com");
    d3.select("g.source1")
	         .append("text")
			 .attr("class","sourcetext")
			 .attr("transform","translate(30,70)")
			 .text("iOS");
    d3.select("g.source1")
	         .append("text")
			 .attr("class","sourcetext")
			 .attr("transform","translate(10,110)")
			 .text("Android");
	d3.select("g.source1")
	         .append("text")
			 .attr("class","sourcetext")
			 .attr("transform","translate(10,150)")
			 .text("第三方");
    d3.select("g.source1")
	         .append("text")
			 .attr("class","sourcetext")
			 .attr("transform","translate(20,190)")
			 .text("其他");
	var x = d3.scale.linear()
            .domain([0, d3.max(datasource)])
			.range([0, wikuang*(2/3)]);
            //.range([0, 310]);
    var y = d3.scale.ordinal()
	        //.domain(datasource)
			.domain(d3.range(datasource.length))
            .rangeBands([0, 200]);
	d3.select("g.source2")
	        .selectAll("rect")
            .data(datasource)
            .enter().append("rect")
			.transition()
			.duration(2000)
			.attr("fill",function(d){ return "rgb(0,0, "+(255-d*2)+")";})
			.attr("stroke","white")
			.attr("y", function(d, i) {
			   		return y(i);
			 })
            .attr("width", x)
			.attr("height", y.rangeBand());
	d3.select("g.source2")
	        .selectAll("text1")
            .data(datasource)
            .enter().append("text")
			.transition()
			.duration(2000)
            .attr("x", x)
			.attr("y", function(d, i) {
			   		return y(i) + y.rangeBand() / 2;
			 })
            .attr("dx", -3) // padding-right
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "end") // text-align: right
			.attr("fill","#FFEFD5")
            .text(function(d)
			{return d+"%";}
			);
    }//source
	//折线函数
	function render_time(zero0,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,
				               sixteen,seventeen,eighteen,ninteen,twenty,twentyone,twentytwo,twentythree,svgname)
		{
		var datatime=[
		             [
		             [0,zero0],[1,one],[2,two],[3,three],[4,four],[5,five],[6,six],[7,seven],[8,eight],[9,nine],[10,ten],[11,eleven],[12,twelve],
		             [13,thirteen],[14,fourteen],[15,fifteen],[16,sixteen],[17,seventeen],[18,eighteen],[19,ninteen],[20,twenty],[21,twentyone],
					 [22,twentytwo],[23,twentythree]
					 ]
					 ];	
	  
      svgname.append("g")
			.attr("class","zhexian")
			.attr("transform", "translate(" + margin.left + ","+margin.top+")");

		var x = d3.scale.linear().range([0, widthz]);
		var y = d3.scale.linear().range([heightz, 0]);
		var xAxis = d3.svg.axis().scale(x).orient("bottom");
		var yAxis = d3.svg.axis().scale(y).orient("left");

		var tempData = [];
		for (var i = 0; i < datatime.length; i++) {
			for (var j = 0; j < datatime[i].length; j++) {
				tempData.push(datatime[i][j]);
			}
		}
		
		x.domain(d3.extent(tempData, function(d) {
			return d[0];
		}));
		y.domain(d3.extent(tempData, function(d) {
			return d[1];
		}));
		var line = d3.svg.line()
			.x(function(d) {
				return x(d[0]);
			})
			.y(function(d) {
				return y(d[1]);
			})
			.interpolate("monotone");

		d3.select("g.zhexian").append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + heightz+")")
			.call(xAxis)
			.append("text")
			.text("时间/h")
			.attr("transform","translate("+(wikuang-120)+",0)");
				
		d3.select("g.zhexian").append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.text("数据/万条")
			.attr("transform","rotate(-90)")
			.attr("text-anchor","end")
			.attr("dy","1.5em");

		var paths = d3.select("g.zhexian").selectAll('.line').data(datatime);
		paths.enter().append("path").attr("class", "line").attr("d", line);
		paths.exit().remove();

		}//zhexian
	 

	
	
	