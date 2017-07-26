
function wordcld(){
	document.getElementById("wordcld").innerHTML = "";
	document.getElementById("emotion").innerHTML = "";
    document.getElementById("pos0").innerHTML = "";
	document.getElementById("pos1").innerHTML = "";
	document.getElementById("pos2").innerHTML = "";
	document.getElementById("pos3").innerHTML = "";
	document.getElementById("pos4").innerHTML = "";
	document.getElementById("neg0").innerHTML = "";
	document.getElementById("neg1").innerHTML = "";
	document.getElementById("neg2").innerHTML = "";
	document.getElementById("neg3").innerHTML = "";
	document.getElementById("neg4").innerHTML = "";
var widthcld=document.documentElement.scrollWidth * (2/3)-100;
var fill = d3.scale.category20();
 function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

function randomnum(Min,Max){ 
 
        var Range = Max - Min; 
 
        var Rand = Math.random(); 
 
        return(Min + Math.round(Rand * Range)); 
 
}
var svg = d3.select("#wordcld")
		.append("svg")
		.attr("width", widthcld)
		.attr("height", 600)
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
                        alert("请输入微博话题");
                    },
	beforeSend:function(){
		showload();
	},
	success:function(wordlist){
	            console.log(wordlist);
	if(wordlist=="notfound"){alert("话题有误，请输入正确的话题")}
	else{
		var wordcld=wordlist.wordCloud;
                    svg.append("g")
                    .selectAll("text")
                    .data(wordcld)
                    .enter()
					.append("text")
                    .style("font-size", function(d,i) { return (45-i)+ "px"; })
                    .style("fill", function(d, i) { return fill(i); })
                    .style("font-family", "黑体")
                    .attr("transform",function(d,i) {
                        return "translate("+randomnum(randomnum(1,10)*10,widthcld-100)+","+randomnum(randomnum(1,10)*20,600)+")";
                    })
                    .text(function(d) { return d.word; });
			//d3.select("#line-text")
			//				 .append("text").text("正负面微博数量变化曲线(注：正面-蓝 负面-红 横轴为07-04:19点到07-05:21点每隔一小时的时间)");
			// render_time(wordlist.timeSACount.pos[0],wordlist.timeSACount.pos[1],wordlist.timeSACount.pos[2],wordlist.timeSACount.pos[3],
		 // wordlist.timeSACount.pos[4],wordlist.timeSACount.pos[5],wordlist.timeSACount.pos[6],wordlist.timeSACount.pos[7],
		 // wordlist.timeSACount.pos[8],wordlist.timeSACount.pos[9],wordlist.timeSACount.pos[10],wordlist.timeSACount.pos[11],
		 // wordlist.timeSACount.pos[12],wordlist.timeSACount.pos[13],wordlist.timeSACount.pos[14],wordlist.timeSACount.pos[15],
		 // wordlist.timeSACount.pos[16],wordlist.timeSACount.pos[17],wordlist.timeSACount.pos[18],wordlist.timeSACount.pos[19],
		 // wordlist.timeSACount.pos[20],wordlist.timeSACount.pos[21],wordlist.timeSACount.pos[22],wordlist.timeSACount.pos[23],
		 // wordlist.timeSACount.pos[24],wordlist.timeSACount.pos[25],wordlist.timeSACount.pos[26],wordlist.timeSACount.pos[27],
		 // wordlist.timeSACount.neg[0],wordlist.timeSACount.neg[1],wordlist.timeSACount.neg[2],wordlist.timeSACount.neg[3],
		 // wordlist.timeSACount.neg[4],wordlist.timeSACount.neg[5],wordlist.timeSACount.neg[6],wordlist.timeSACount.neg[7],
		 // wordlist.timeSACount.neg[8],wordlist.timeSACount.neg[9],wordlist.timeSACount.neg[10],wordlist.timeSACount.neg[11],
		 // wordlist.timeSACount.neg[12],wordlist.timeSACount.neg[13],wordlist.timeSACount.neg[14],wordlist.timeSACount.neg[15],
		 // wordlist.timeSACount.neg[16],wordlist.timeSACount.neg[17],wordlist.timeSACount.neg[18],wordlist.timeSACount.neg[19],
		 // wordlist.timeSACount.neg[20],wordlist.timeSACount.neg[21],wordlist.timeSACount.neg[22],wordlist.timeSACount.neg[23],
		 // wordlist.timeSACount.neg[24],wordlist.timeSACount.neg[25],wordlist.timeSACount.neg[26],wordlist.timeSACount.neg[27],
		 //createsvgzhe());
		  $("li#pos0").html(wordlist.saWeibos.pos[1]);
		  $("li#pos1").html(wordlist.saWeibos.pos[1]);
		  $("li#pos2").html(wordlist.saWeibos.pos[2]);
		  $("li#pos3").html(wordlist.saWeibos.pos[3]);
		  $("li#pos4").html(wordlist.saWeibos.pos[4]);
		  $("li#neg0").html(wordlist.saWeibos.neg[0]);
		  $("li#neg1").html(wordlist.saWeibos.neg[1]);
		  $("li#neg2").html(wordlist.saWeibos.neg[2]);
		  $("li#neg3").html(wordlist.saWeibos.neg[3]);
		  $("li#neg4").html(wordlist.saWeibos.neg[4]);
		var data=[{"bili":wordlist.saCount.negCount,"str":"负面"},{"bili":wordlist.saCount.posCount,"str":"正面"}];
	      render_rect(data);
	}  },
	complete:function(){
	hideload();}
});

}
function render_rect(data){
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

		var svg = d3.select("#emotion")
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
		
		var sum=data[0].bili+data[1].bili;
		var x0=Math.round(data[0].bili/sum*100);
		var arr=[x0,100-x0];
		bar.append("text")
		.text(function(d,i) { return arr[i]+"%"; })
		.attr({
		  "x":function(d) { return scale(d.bili); },
		  "y": scale_y.rangeBand()/2,
		  "text-anchor": "start"
		})
    }//rect
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
	function render_time(t0,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20,t21,t22,t23,t24,t25,t26,t27,
	                     t28,t29,t30,t31,t32,t33,t34,t35,t36,t37,t38,t39,t40,t41,t42,t43,t44,t45,t46,t47,t48,t49,t50,t51,t52,t53,t54,t55,
							   svgname)
		{
		var color=["#6495ED","red"];
		var datatime=[
		             [
		             [0,t0],[1,t1],[2,t2],[3,t3],[4,t4],[5,t5],[6,t6],[7,t7],[8,t8],[9,t9],[10,t10],[11,t11],[12,t12],[13,t13],[14,t14],[15,t15],
					 [16,t16],[17,t17],[18,t18],[19,t19],[20,t20],[21,t21],[22,t22],[23,t23],[24,t24],[25,t25],[26,t26],[27,t27]
					 ],
					 [
					 [0,t28],[1,t29],[2,t30],[3,t31],[4,t32],[5,t33],[6,t34],[7,t35],[8,t36],[9,t37],[10,t38],[11,t39],[12,t40],[13,t41],[14,t42]
					 ,[15,t43],
					 [16,t44],[17,t45],[18,t46],[19,t47],[20,t48],[21,t49],[22,t50],[23,t51],[24,t52],[25,t53],[26,t54],[27,t55]
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
			.text("微博量/条")
			.attr("transform","rotate(-90)")
			.attr("text-anchor","end")
			.attr("dy","1.5em");

		var paths = d3.select("g.zhexian").selectAll('.line').data(datatime);
		paths.enter().append("path").attr("class", "line").attr("d", line).style("stroke",function(d,i){return color[i]});
		paths.exit().remove();

		}//zhexian