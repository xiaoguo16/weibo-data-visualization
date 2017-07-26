/*
 * LockTableTitle  v0.4.1
 * @author 倪金侃 Kagin Ni  
 * @email kkctf@hotmail.com
 * @CreateDate 2011-03-19
 * @version 0.4.1
 * 表格表头锁定.
 * 功能介绍:
 * 表格超过显示范围时,水平移动滑条表头会随之移动,垂直移动滑条表头会悬浮在上端.
 * 窗体在变更大小时表格会根据窗体的大小随之进行改变
 * 定义成动态层后,表格会根据动态层的显示/隐藏情况进行自动调整表体大小
 * 注意事项:
 * 此组件基于JQuery
 * 此组件只支持表格宽度100%展示.如需局部使用表格,请使用Frame或iFrame
 * 使用方法:
 * 1.在需要添加锁定表头的外面添加div.
 * 2.页面加载     
    var locktb;
    $(function(){
        locktb=new Kkctf.table.lockTableSingle({
            tMain:$('#lockTable'),            //table的层
            padWidth:0,                        //单元格左右的padding的值总和数值
            borWidth:2,                    //表格左右边框宽度总和值
            subtHeig:60,                    //表格高度减去多少
            dinamicDiv:$('#dynamicDiv'),      //动态层的高度.表格会根据动态层的显示或隐藏进行表格大小的动态调整(可选)
            autoHeight:true                 //表格窗口是否随着窗口的高度改变自动调整高度(可选)
        });
    });
 * 3.手动调整窗口高度 locktb.autoHeightFn();
 * 
 */
Kkctf = {};
Kkctf.apply = function(o, c, defaults){
    if(defaults){
        Kkctf.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};

Kkctf.bind = function(el,ename,fn,scope){
    el.bind(ename,function(e){
        fn.apply(scope);
    });
};

Kkctf.table = Kkctf.table || {};

Kkctf.table.lockTableSingle = function(configs){
    Kkctf.apply(this,configs);
    this.init();
    Kkctf.apply(this,{
            tBody:$('#tBody'),//表体
            tHead:$('#tHead') //表头
        });
    this.work();
    this.cssStyle();
    this.addBind();
    this.autoHeightFn();
};

Kkctf.apply(Kkctf.table.lockTableSingle.prototype,{
    init:function(){//初始化创建表头
        var tb=this.tMain.find('table').eq(0);
        tb.wrap('<div id=\'tBody\'></div>');
        
        var tBody=$('#tBody');
        tBody.before('<div id=\'tHead\'><div></div></div>');
        
        var tHead=$('#tHead');
        var tp=tb.clone().empty().append(tb.find('tr').eq(0).clone());
        
        tHead.find('div').eq(0).append(tp);    
    },
    work:function(){//执行表头层的每一个单元格与表格的宽度一致
        //表体最上层的一行中的所有单元格
        var allCols=this.tMain.find('#tBody').eq(0).find('tr').eq(0).find('td');
        var allHrd=this.tHead.find('td');
        
        var countWidth=0;
        var padWid=this.padWidth;
        
        //设置表头所有td宽度和表体一致
        allCols.each(function(n){
            var tdWidth=$(this).width();
            allHrd.eq(n).width(tdWidth);
            countWidth+=tdWidth+padWid;
        });
        this.tBody.find('table').width(countWidth);
        this.tHead.find('div').width(countWidth+20+this.borWidth*allCols.length);

    },
    cssStyle:function(){//定义scc
        this.tBody.css({
            width:'100%',
            height:$(window).height()-this.getDinamicHeight()-this.subtHeig+'px',
            overflow:'auto'
        });
        
        this.tHead.css({
            width:'100%',
            overflow:'hidden',
            position:'absolute',
            'z-index':'10'
        });
        
        this.tMain.css({
            position:'relative'
        });
    },
    addBind:function(){//添加事件
        Kkctf.bind(this.tBody,'scroll',this.scrollFn,this);
        if(this.autoHeight){
            Kkctf.bind($(window),'resize',this.autoHeightFn,this);
        }
    },
    scrollFn:function(){//表头平移事件
        this.tHead.scrollLeft(this.tBody.scrollLeft());
    },
    autoHeightFn:function(){//表体高度事件
        var h=$(window).height()-this.getDinamicHeight()-this.subtHeig;
        this.tBody.height(h);
    },
    getDinamicHeight:function(){//获取动态层的高度

        if(!this.dinamicDiv){
            return 0;
        }
    
        if(1>this.dinamicDiv.length){
            return 0;
        }
        
        if(this.dinamicDiv.is(':hidden')){
            return 0;
        }
        
        return this.dinamicDiv.height();
    }
})
