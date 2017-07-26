$(document).ready(function() {
});
function large(){
	var diameter = document.documentElement.scrollWidth * (2/3);
	d3.select("g.treezoom").attr("transform","translate(" + diameter / 2 + "," + diameter / 2.5 + ")scale(2)");
}
function small(){
	var diameter = document.documentElement.scrollWidth * (2/3);
	d3.select("g.treezoom").attr("transform","translate(" + diameter / 2 + "," + diameter / 2.5 + ")scale(1)");
}
function tree(){
	document.getElementById("tree").innerHTML = "";
	document.getElementById("line").innerHTML = "";
	document.getElementById("rz").innerHTML = "";
	document.getElementById("ceng").innerHTML = "";
	document.getElementById("sex").innerHTML = "";
	document.getElementById("prov").innerHTML = "";
var diameter = document.documentElement.scrollWidth * (2/3);
var tree = d3.layout.tree()//树形布局
    .size([360, diameter / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()//对角线生成器可以创建path，连接两个点
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });
	
 var drag = d3.behavior.drag() // 拖拽
            .on("drag", move);
var svg = d3.select("#tree").append("svg")
    .attr("width", diameter)
    .attr("height", diameter-120)
    .append("g").attr("class","treezoom")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2.5 + ")")
	.call(drag);
	function move(d) {//拖拽到合适位置
        var x = d3.event.x, // <-C
            y = d3.event.y;

        if(inBoundaries(x, y))
            d3.select(this) 
                .attr("transform", function (d) { // <-D
                    return "translate(" + x + ", " + y + ")";
                });
    }
    var r=100;
    function inBoundaries(x, y){//放置拖出边界
        return (x >= (0 + r) && x <= (diameter - r)) 
            && (y >= (0 + r) && y <= (diameter-120 - r));
    }
  var wi=document.documentElement.scrollWidth * (1/3);
   var hi=document.documentElement.scrollHeight * 0.3;
   var mapsvg=d3.select("#prov")
				.append("svg")
                .attr({
					width:wi*0.8,
					height:hi
				});

		mapsvg.append("g")
			   .attr("class","map")
			   .attr({
			   	width:wi,
			   	height:hi-50
			   	});
	var projection=d3.geo.mercator()
				.center([107,31])
				.scale(wi*0.55)
				.translate([wi*0.8/2,hi/2]);
						
	var path=d3.geo.path()
				.projection(projection);
mapsvg.append("g")
			   .attr("class","tiao")
			   .attr({
			   	width:wi,
			   	height:50
			   	})
	var defs=svg.append("defs");
	var linearGradient=defs.append("linearGradient")
							.attr("id","linearColor")
							.attr("x1","0%")
							.attr("y1","0%")
							.attr("x2","100%")
							.attr("y2","0%")
	var a=d3.rgb(255,255,0);
	var b=d3.rgb(255,255,255);
	var stop1=linearGradient.append("stop").attr("offset","0%").style("stop-color",a.toString());
	var stop2=linearGradient.append("stop").attr("offset","100%").style("stop-color",b.toString());
	 d3.select("g.tiao").append("text")
	                .attr("x",wi*0.15)
					.attr("y",hi*0.9)
					.text("100%")
	 d3.select("g.tiao").append("text")
	                .attr("x",wi*0.64)
					.attr("y",hi*0.9)
					.text("0")

function showload(){
			 $("#dialog").show();
		 }
function hideload(){
			 $("#dialog").hide();
		 }
$.ajax({
	type: "get",
	dataType:'json',
	url:'../jsons/'+$("#exampleInputName2").val()+'.json',
	error: function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("请输入ID");
                    },
	beforeSend:function(){
		showload();
	},
	success:function(root){
	            console.log(root);
	if(root=="notfound"){alert("ID有误，请输入正确的ID")}
	else{
	d3.json("../jsons/chinatree.json",function(error,mapjson){
		 d3.select("g.map")
					   .selectAll("path")
					   .data(mapjson.features)
					   .enter()
					   .append("path")
					   .attr("stroke","#000")
					   .attr("stroke-width",1)
					   .attr("d", path)
					   .attr("fill", function(d,i){
							 var mapcolor=root.information[0].province[i];
							 return "rgb(255,255,"+(255-mapcolor*10)+")";  
					   })
	})
	d3.select("g.tiao").append("rect")
					.attr("x",wi*0.15)
					.attr("y",hi*0.9)
					.attr("width",wi*0.5)
					.attr("height",15)
					.style("fill","url(#"+linearGradient.attr("id")+")")
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")//创建链
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")//创建点
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
	  .append("circle")//点的圆
      .attr("r", 4.5)
	  .on("mouseover",function(d,i){
		  d3.select(this).attr("r",10);
		  })
	  .on("mouseout",function(d,i){d3.select(this).attr("r",4.5);})
      .append("title")
	  .text(function(d,i){return "昵称: "+d.Nickname+"\n内容: "+d.Content+"\n时间: "+d.Time+"\n来源: "+d.Source})		
	  render_time(parseFloat(root.information[0].time[0]),parseFloat(root.information[0].time[1]),parseFloat(root.information[0].time[2]),parseFloat(root.information[0].time[3]),parseFloat(root.information[0].time[4]),
           parseFloat(root.information[0].time[5]),parseFloat(root.information[0].time[6]),parseFloat(root.information[0].time[7]),parseFloat(root.information[0].time[8]),parseFloat(root.information[0].time[9]),
		   parseFloat(root.information[0].time[10]),parseFloat(root.information[0].time[11]),parseFloat(root.information[0].time[12]),parseFloat(root.information[0].time[13]),parseFloat(root.information[0].time[14]),
		   parseFloat(root.information[0].time[15]),parseFloat(root.information[0].time[16]),parseFloat(root.information[0].time[17]),parseFloat(root.information[0].time[18]),
		   parseFloat(root.information[0].time[19]),parseFloat(root.information[0].time[20]),parseFloat(root.information[0].time[21]),parseFloat(root.information[0].time[22]),
		   parseFloat(root.information[0].time[23]),createsvgzhe());
	   var data=[{"bili":root.information[0].plusv,"str":"认证"},{"bili":root.information[0].notv,"str":"VIP"}];
	   render_rect1(data);
	   var data=[{"bili":root.information[0].first,"str":"1"},{"bili":root.information[0].second,"str":"2"},{"bili":root.information[0].third,"str":"3"}
	            ,{"bili":root.information[0].fourth,"str":"4"},{"bili":root.information[0].fifth,"str":"5"},{"bili":root.information[0].sixth,"str":">=6"}];
	   render_rect2(data);
	   var data=[{"bili":root.information[0].male,"str":"男"},{"bili":root.information[0].female,"str":"女"}];
	   render_rect3(data);
	}},
	complete:function(){
		hideload();
	}
})
d3.select(self.frameElement).style("height", diameter - 150 + "px");
};
var margin = {
			top: 20,
			right: 50,
			bottom: 20,
			left: 50
		};
var wikuang=document.documentElement.scrollWidth * (2/3)-100;
var widthz = wikuang- margin.left - margin.right;
var heightz = 200 - margin.bottom - margin.top;	
function createsvgzhe(){
                var svg = d3.select("#line").append("svg")
	                         .attr("width", widthz + margin.left + margin.right)
			                 .attr("height",heightz+margin.top+margin.bottom);
			    return svg;
			}
function render_time(one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,
				               sixteen,seventeen,eighteen,ninteen,twenty,twentyone,twentytwo,twentythree,twentyfour,svgname)
		{
		var datatime=[
		             [
		             [1,one],[2,two],[3,three],[4,four],[5,five],[6,six],[7,seven],[8,eight],[9,nine],[10,ten],[11,eleven],[12,twelve],
		             [13,thirteen],[14,fourteen],[15,fifteen],[16,sixteen],[17,seventeen],[18,eighteen],[19,ninteen],[20,twenty],[21,twentyone],
					 [22,twentytwo],[23,twentythree],[24,twentyfour]
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
		var area_generator = d3.svg.area()
			.x(function(d) {
				return x(d[0]);
			})
			.y0(heightz)
			.y1(function(d) {
				return y(d[1])
			})
			.interpolate("monotone")

		var paths = d3.select("g.zhexian").selectAll('.line').data(datatime);
		paths.enter().append("path").attr("class", "line").attr("d", area_generator).style("fill","steelblue");
		paths.exit().remove();
		
        d3.select("g.zhexian").append("g")
			.attr("class", "y axis")
			.call(yAxis)
            .append("text")
			.text("转发量/条")
		d3.select("g.zhexian").append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + heightz+")")
			.call(xAxis)
			.append("text")
			.text("时间/h")
			.attr("style","z-index:1000")
			.attr("transform","translate("+(wikuang-120)+",0)");

		}//zhexian

	function render_rect1(data){
	var width=document.documentElement.scrollWidth * (1/3)-150,
		height=60,
		margin={left:40,right:40,top:10,bottom:10},
	    svg_height = height+margin.top+margin.bottom,
		svg_width = width+margin.left+margin.right;

		var scale = d3.scale.linear()
		.domain([0, d3.max(data,function(d){return d.bili;})])
		.range([0, width]);
		
		var scale_y=d3.scale.ordinal()
		.domain(data.map(function(d){return d.str;}))
		.rangeBands([0,height],0.1);

		var svg = d3.select("#rz")
		.append("svg")
		.attr("width", svg_width)
		.attr("height", svg_height)
		
		var chart=svg.append("g")
		.attr("transform","translate("+ margin.left +","+ margin.top +")");
		
		var y_axis=d3.svg.axis().scale(scale_y).orient("left");
		chart.append("g").call(y_axis);
		
		var bar = chart.selectAll(".bar")
		.data(data)
		.enter()
		.append("g")
		.attr("class","bar")
		.attr("transform", function(d,i) { return "translate(0," + scale_y(d.str) + ")"; })

		bar.append("rect")
		.attr({
		  "y":function(d){return scale_y();},
		  "width": function(d){return scale(d.bili)},
		  "height": scale_y.rangeBand()
		})
		.style("fill", "steelblue")

		bar.append("text")
		.text(function(d) { return d.bili+"%"; })
		.attr({
		  "x":function(d) { return scale(d.bili); },
		  "y": scale_y.rangeBand()/2,
		  "text-anchor": "start"
		})

    }//rect1
	function render_rect2(data){
	var width=document.documentElement.scrollWidth * (1/3)-150,
		height=180,
		margin={left:40,right:40,top:10,bottom:10},
	    svg_height = height+margin.top+margin.bottom,
		svg_width = width+margin.left+margin.right;

		var scale = d3.scale.linear()
		.domain([0, d3.max(data,function(d){return d.bili;})])
		.range([0, width]);
		
		var scale_y=d3.scale.ordinal()
		.domain(data.map(function(d){return d.str;}))
		.rangeBands([0,height],0.1);

		var svg = d3.select("#ceng")
		.append("svg")
		.attr("width", svg_width+10)
		.attr("height", svg_height)
		
		var chart=svg.append("g")
		.attr("transform","translate("+ margin.left +","+ margin.top +")");
		
		var y_axis=d3.svg.axis().scale(scale_y).orient("left");
		chart.append("g").call(y_axis);
		
		var bar = chart.selectAll(".bar")
		.data(data)
		.enter()
		.append("g")
		.attr("class","bar")
		.attr("transform", function(d,i) { return "translate(0," + scale_y(d.str) + ")"; })

		bar.append("rect")
		.attr({
		  "y":function(d){return scale_y();},
		  "width": function(d){return scale(d.bili)},
		  "height": scale_y.rangeBand()
		})
		.style("fill", "steelblue")

		bar.append("text")
		.text(function(d) { return d.bili+"%"; })
		.attr({
		  "x":function(d) { return scale(d.bili); },
		  "y": scale_y.rangeBand()/2,
		  "text-anchor": "start"
		})

    }//rect2
	function render_rect3(data){
	var width=document.documentElement.scrollWidth * (1/3)-150,
		height=60,
		margin={left:40,right:40,top:10,bottom:10},
	    svg_height = height+margin.top+margin.bottom,
		svg_width = width+margin.left+margin.right;

		var scale = d3.scale.linear()
		.domain([0, d3.max(data,function(d){return d.bili;})])
		.range([0, width]);
		
		var scale_y=d3.scale.ordinal()
		.domain(data.map(function(d){return d.str;}))
		.rangeBands([0,height],0.1);

		var svg = d3.select("#sex")
		.append("svg")
		.attr("width", svg_width)
		.attr("height", svg_height)
		
		var chart=svg.append("g")
		.attr("transform","translate("+ margin.left +","+ margin.top +")");
		
		var y_axis=d3.svg.axis().scale(scale_y).orient("left");
		chart.append("g").call(y_axis);
		
		var bar = chart.selectAll(".bar")
		.data(data)
		.enter()
		.append("g")
		.attr("class","bar")
		.attr("transform", function(d,i) { return "translate(0," + scale_y(d.str) + ")"; })

		bar.append("rect")
		.attr({
		  "y":function(d){return scale_y();},
		  "width": function(d){return scale(d.bili)},
		  "height": scale_y.rangeBand()
		})
		.style("fill", "steelblue")

		bar.append("text")
		.text(function(d) { return d.bili+"%"; })
		.attr({
		  "x":function(d) { return scale(d.bili); },
		  "y": scale_y.rangeBand()/2,
		  "text-anchor": "start"
		})

    }//rect3