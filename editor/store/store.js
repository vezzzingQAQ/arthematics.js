var stroge={
displayIndex:1,
displayList:[
{
name:"一维函数",
author:"vezzzing",
date:"2021.12.18",
code:
`
start(function(){//创建画布

    createCanvas(document.querySelector(".displayDiv"),0,0,document.querySelector(".displayDiv").offsetWidth,document.querySelector(".displayDiv").offsetHeight);

});
loop(function(){

    //刷背景
    noStroke();
    background(rgba(0));
    fill(rgba(255));
    text(\`f(x)=sin(x*(\${map(my,0,height,-5,5)})+(\${map(mx,0,width,-5,5)})))\`,20,20);

    //画一元函数
    draw1dFunction({

        /*声明函数的一些条件*/

        sizex:700,
        xl:-6,xr:6,deltaX:0.01,

        /*声明函数表达式*/

        f:function(x){
            return(sin(x*map(my,0,height,-5,5)+map(mx,0,width,-5,5)));
        },

        /*针对函数每个点的上色方式*/

        colorf:function(x,y){
            let ccolor=hsva(map(y,-1,1,0,360),1,1,1);
            ccolor.add2H(frameCount);
            fill(ccolor);
        },

        /*针对函数每个点的绘制方式*/

        shapef:function(x,y){
            rectCenter(x,y*50,map(y,-1,1,0,20));
        }
        }
    );
});

`
}
,
{
name:"基本二元函数",
author:"vezzzing",
date:"2021.12.18",
code:
`
createCanvas(document.querySelector(".displayDiv"),0,0,document.querySelector(".displayDiv").offsetWidth,document.querySelector(".displayDiv").offsetHeight);
loop(function(){
    noFill();
    background(rgba(0,0,0));
    draw2dFunction({
        sizex:300,
        sizey:300,
        xl:-3,xr:3,deltaX:0.5,
        yt:-3,yb:3,deltaY:0.5,
        f:function(x,y){
            return(sin(x*y+sin(x-T/2)+random(0,0.2)+T));
        },
        colorf:function(x,y,z){
            stroke(rgba(map(z,-1,1,0,255),
            map(x,-2,2,255,0),
            map(y,-2,2,255,0),
            1));
            strokeWidth(map(z,-1,1,0,50));
        },
        shapef:function(x,y,z){
            let lineLen=6;
            let rect=new Rect(x,y,map(z,-1,1,0,5));
            rect.display();
        }
        }
    );
});
`
}
,
{
name:"带交互的二元函数",
author:"vezzzing",
date:"2021.12.18",
code:
`
start(function(){//创建画布

    createCanvas(document.querySelector(".displayDiv"),0,0,document.querySelector(".displayDiv").offsetWidth,document.querySelector(".displayDiv").offsetHeight);

});

loop(function(){//按一定间隔执行

    //刷背景
    noStroke();
    background(rgba(0,0.4));
    
    //映射鼠标位置
    let xamount=map(mx,0,width,5,-5);
    let yamount=map(my,0,height,5,-5);
    
    //绘制文字
    fill(rgba(255));
    text(\`f(x)=sin(x*\${xamount}+y*\${yamount}+T)\`,30,35);

    //画二元函数
    draw2dFunction({

        /*声明函数的一些条件*/
        
        sizex:300,//在画布上的宽度
        sizey:300,//在画布上的高度
        xl:-2.5,//左边界
        xr:2.5,//右边界
        deltaX:0.1,//X方向间距
        yt:-2.5,//上边界
        yb:2.5,//下边界
        deltaY:0.1,//Y方向间距

        /*声明函数表达式*/

        f:function(x,y){
            return(sin(x*xamount+y*yamount+T));
        },

        /*针对函数每个点的上色方式*/

        colorf:function(x,y,z){
            fill(rgba(map(z,-1,1,0,255),map(x,-2,2,255,0),map(y,-2,2,0,255),0.2));
        },
        
        /*针对函数每个点的绘制方式*/

        shapef:function(x,y,z){
            rectCenter(x,y,map(z,-1,1,0,50));
        }

        }
    );

});
`
}
,
    
]
}