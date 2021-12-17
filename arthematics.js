/**
 * arthematics.js
 * author:vezzzing
 * start at 2021.12.14
 */

/**
 * 常规全局变量
 */
var canvasList=[];//画布列表
var currentCanvasIndex=0;
var canvas;//如果只有一个画布,就以此命名
var frameCount=0;//帧数
var T=0;//十分之一帧数
var width=window.innerWidth;//窗口宽高
var height=window.innerHeight;//窗口宽高

/**
 * 常量
 */
const PI=Math.PI;
const TWO_PI=Math.PI*2;
const HALF_PI=Math.PI/2;

/**
 * canvas全局变量
 */
//绘图宏
var noFill;
var noStroke;
var fill;
var stroke;
var strokeWidth;
var background;
//图形绘制
var point;
var rect;
var rectCenter;
var circle;
var line;
var text;
//上层数学函数
var draw2dFunction;

//初始化canvas全局变量
function _initFunctionValueE(canvas){
    noFill=function(){canvasList[currentCanvasIndex].noFill()};
    noStroke=function(){canvasList[currentCanvasIndex].noStroke()};
    fill=function(colorObj){canvasList[currentCanvasIndex].fill(colorObj)};
    stroke=function(colorObj){canvasList[currentCanvasIndex].stroke(colorObj)};
    strokeWidth=function(lineWidth){canvasList[currentCanvasIndex].strokeWidth(lineWidth)};
    background=function(colorObj){canvasList[currentCanvasIndex].background(colorObj)};

    point=function(x,y){canvasList[currentCanvasIndex].point(x,y)};
    rect=function(x,y,width,height){arguments.length==3?canvasList[currentCanvasIndex].rect(x,y,width):canvasList[currentCanvasIndex].rect(x,y,width,height)};
    rectCenter=function(x,y,width,height){arguments.length==3?canvasList[currentCanvasIndex].rectCenter(x,y,width):canvasList[currentCanvasIndex].rectCenter(x,y,width,height)};
    circle=function(x,y,r){canvasList[currentCanvasIndex].circle(x,y,r)};
    line=function(x1,y1,x2,y2){canvasList[currentCanvasIndex].line(x1,y1,x2,y2)};
    text=function(words,x,y){canvasList[currentCanvasIndex].text(words,x,y)};

    draw2dFunction=function(draw2dFunctionObj){canvasList[currentCanvasIndex].draw2dFunction(draw2dFunctionObj)};
}

/**
 * 全局操作函数
 */
var createCanvas;
var loop;
var rgba;

var sin;
var cos;
var abs;
var random;

var map;
var scalev;

createCanvas=function createCanvas(dom,x,y,width,height,argList){
    let cs=new Canvas(dom,x,y,width,height,"m2m"+canvasList.length,argList);
    //更新画布列表
    canvasList.push(cs);
    if(canvasList.length==1){
        canvas=cs;
        _initFunctionValueE(canvas);
    }
    return(cs);
}
rgba=function rgba(p1,p2,p3,p4){
    if(arguments.length==1){
        return(new RGBColor(p1));
    }else if(arguments.length==2){
        return(new RGBColor(p1,p2));
    }else if(arguments.length==3){
        return(new RGBColor(p1,p2,p3));
    }else if(arguments.length==4){
        return(new RGBColor(p1,p2,p3,p4));
    }
}
loop=function loop(f){
    setInterval(function(){
        frameCount++;
        T+=0.05;
        f();
    },50/3);
}

/**
 * 数学函数
 */
sin=function sin(x){
    return(Math.sin(x));
}
cos=function cos(x){
    return(Math.cos(x));
}
abs=function abs(x){
    return(Math.abs(x));
}
random=function random(from,to){
    return(Math.random()*(Math.abs(from-to))+(to-from)/2);
}
/**
 * 映射函数
 */
map=function map(p,fp,tp,fa,ta){
    return((fa*p-fa*tp-ta*p+ta*fp)/(fp-tp));
}
scalev=function scalev(delta,from,to){
    return(delta*to/from);
}
/**
 * 类型判断函数
 */
function _isNumber(x){
    var regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。
    if(regPos.test(x)){
        return(true);
    }else{
        return(false);
    }
}
class AMError{
    constructor(type,dis){
        this.type=type;
        this.dis=dis;
    }
    log(){
        return(this.type+":"+this.dis);
    }
}
class Canvas{//canvas画布类
    constructor(dom,x,y,width,height,id,argList/*携带的参数列表*/){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.left=this.x;
        this.right=this.x+this.width;
        this.top=this.y;
        this.bottom=this.y+this.height;
        
        this.id=id;

        this.parameters={};
        {//参数列表赋值
            if(argList){
                try{
                    for(let i=0;i<argList.length;i++){
                        this.parameters[argList[i].parameter]=argList[i].value;
                    }
                }catch{
                    return(new AMError("参数列表赋值错误","参见:参数列表赋值"));
                }
            }
        }
        {//创建canvas
            let newCanvas=document.createElement("canvas");
            newCanvas.width=this.width;
            newCanvas.height=this.height;
            newCanvas.id=this.id;
            newCanvas.style.position="absolute";
            newCanvas.style.left=this.x+"px";
            newCanvas.style.top=this.y+"px";
            this.canvas=newCanvas;
            this.context=this.canvas.getContext("2d");
            dom.appendChild(newCanvas);
        }
    }
    /*绘图函数*/
    noFill(){//无填充
        this.context.fillStyle="transparent";
    }
    noStroke(){//无描边
        this.context.strokeStyle="transparent";
    }
    fill(color){//指定填充颜色-传入Color类或Color函数
        this.context.fillStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
    stroke(color){//指定描边颜色-传入Color类或Color函数
        this.context.strokeStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
    strokeWidth(w){//指定描边宽度-传入宽度
        this.context.lineWidth=w;
    }
    point(x,y){//画点-x,y
        this.context.beginPath(); 
        this.context.rect(x,y,1,1);
        this.context.closePath();
        this.context.fill();
    }
    rect(x,y,width,height){//画矩形-x,y,width,[height]
        this.context.beginPath(); 
        if(arguments.length==4){
            this.context.rect(x,y,width,height);
        }else if(arguments.length==3){
            this.context.rect(x,y,width,width);
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
    rectCenter(x,y,width,height){//以中点画矩形-x,y,width,[height]
        this.context.beginPath(); 
        if(arguments.length==4){
            this.context.rect(x-width/2,y-height/2,width,height);
        }else if(arguments.length==3){
            this.context.rect(x-width/2,y-width/2,width,width);
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
    circle(x,y,r){//画圆-x,y,r
        this.context.beginPath(); 
        this.context.arc(x,y,r,0,Math.PI*2,false);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
    background(color){//刷背景-传入Color类或Color函数
        var pfstyle=this.context.fillStyle;
        this.context.fillStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
        this.context.rect(0,0,this.width,this.height);
        this.context.fill();
        this.context.fillStyle=pfstyle;
    }
    line(x1,y1,x2,y2){//画线-x1,y1,x2,y2
        this.context.beginPath(); 
        this.context.moveTo(x1,y1);
        this.context.lineTo(x2,y2);
        this.context.closePath();
        this.context.stroke();
    }
    text(words,x,y){//绘制文本-文本,x,y
        this.context.font='50px sans-serif';
        this.context.fillText(words,x,y);
        this.context.strokeText(words,x,y);
    }
    /*上层数学函数*/
    draw2dFunction(obj){//绘制二元函数-传入函数对象
        let boundxl=this.width/2-obj.sizex;
        let boundxr=this.width/2+obj.sizex;
        let boundyt=this.height/2-obj.sizey;
        let boundyb=this.height/2+obj.sizey;
        //读取函数对象
        let xl=obj.xl;
        let xr=obj.xr;
        let yt=obj.yt;
        let yb=obj.yb;
        //计算映射
        let addAmountX=scalev(obj.deltaX,Math.abs(xr-xl),Math.abs(boundxr-boundxl));
        let addAmountY=scalev(obj.deltaY,Math.abs(yb-yt),Math.abs(boundyb-boundyt));
        for(let ax=boundxl;ax<boundxr;ax+=addAmountX){
            for(let ay=boundyt;ay<boundyb;ay+=addAmountY){
                let x=map(ax,boundxl,boundxr,xl,xr);
                let y=map(ay,boundyt,boundyb,yt,yb);
                let z=obj.f(x,y);
                obj.colorf(x,y,z);
                obj.shapef(ax,ay,z);
            }
        }
    }
    /*实例函数*/
    log(){//打印自己
        console.log(this);
    }
    /*DOM显示函数*/
    showParameters(color){//在多画布模式下显示参数-字体颜色
        let tag=document.createElement("div");
        let lineHiehgt=20;
        //指定样式
        tag.style.position="absolute";
        tag.style.width=this.width+"px";
        tag.style.height=this.height+"px";
        tag.style.left=this.x+"px";
        tag.style.top=this.y+"px";
        tag.style.lineHeight=lineHiehgt+"px";
        tag.style.color=color.toStyle();
        tag.style.paddingTop=this.height/2-(Object.getOwnPropertyNames(this.parameters).length)*lineHiehgt/2+"px";
        tag.style.textAlign="center";
        tag.style.display="block";
        tag.style.fontSize="10px";
        tag.style.cursor="default";
        tag.style.opacity="0";
        {//绑定事件
            tag.onmouseenter=function(){
                this.style.opacity="1";
                this.style.backgroundColor="rgba(150,150,150,0.2)";
            }
            tag.onmouseleave=function(){
                this.style.opacity="0";
                this.style.backgroundColor="transparent";
            }
        }
        {//嵌入文本
            for(let i in this.parameters){
                if(_isNumber(this.parameters[i])){//判断是数字:四舍五入}
                    tag.innerHTML+=`${i}:${this.parameters[i].toFixed(2)}`+"<br>";
                }
            }
        }
        this.canvas.parentNode.appendChild(tag);
    }
}
/*数学绘图大类*/
class Function2d{//二元函数类
    constructor(fromx,tox,padx,fromy,toy,pady,f){
        this.xl=fromx;
        this.xr=tox;
        this.padx=padx;
        this.yt=fromy;
        this.yb=toy;
        this.pady=pady;
        this.f=f;
    }
    /*数学运算函数*/
    calculate(x,y){//计算f(x,y)-x,y
        return(this.f(x,y));
    }
}
class Point{//数学点类
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    display(){//绘制点
        canvasList[currentCanvasIndex].point(this.x,this.y);
    }
    log(){//打印输出
        return(`(${this.x},${this.y})`);
    }
}
class Rect{//数学矩形类
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        if(arguments.length==3){
            this.height=width;
        }else if(arguments.length==4){
            this.height=height;
        }
    }
    display(){//绘制矩形
        canvasList[currentCanvasIndex].rect(this.x,this.y,this.width,this.height);
    }
    log(){//打印输出
        return(`[x:${this.x},y:${this.y},width:${this.width},height:${this.height}]`);
    }
}
/*颜色大类*/
class Color{//color基类
    constructor(p1,p2,p3,p4){
        if(arguments.length==4){
            this.r=p1;
            this.g=p2;
            this.b=p3;
            this.a=p4;
        }else if(arguments.length==3){
            this.r=p1;
            this.g=p2;
            this.b=p3;
            this.a=1;
        }else if(arguments.length==2){
            this.r=p1;
            this.g=p1;
            this.b=p1;
            this.a=p2;
        }else if(arguments.length==1){
            this.r=p1;
            this.g=p1;
            this.b=p1;
            this.a=p1;
        }else{
            return(new AMError("颜色初始化错误","参见:颜色初始化"));
        }
    }
    toStyle(){//打印输出
        return(`rgba(${this.r},${this.g},${this.b},${this.a})`);
    }
    print(){//打印输出
        return(this.toStyle());
    }
    toGrayScale(){//转化为灰度
        let avg=(this.r+this.g+this.b)/3;
        this.r=avg;
        this.g=avg;
        this.b=avg;
    }
}
class RGBColor extends Color{//RGB颜色类
    constructor(p1,p2,p3,p4){
        if(arguments.length==1){
            super(p1);
        }else if(arguments.length==2){
            super(p1,p2);
        }else if(arguments.length==3){
            super(p1,p2,p3);
        }else{
            super(p1,p2,p3,p4)
        }
    }
    add1(newColor){//颜色加法,多余归顶-颜色对象【rgb】
        this.r+=newColor.r;
        this.g+=newColor.g;
        this.b+=newColor.b;
        return(this);
    }
    add1R(r){//颜色加法,多余归顶-颜色R
        this.r+=r;
        return(this);
    }
    add1G(g){//颜色加法,多余归顶-颜色G
        this.g+=g;
        return(this);
    }
    add1B(b){//颜色加法,多余归顶-颜色B
        this.b+=b;
        return(this);
    }
    add2(newColor){//颜色加法,多余折返-颜色对象【rgb】
        this.r=(this.r+newColor.r)%255;
        this.g=(this.g+newColor.g)%255;
        this.b=(this.b+newColor.b)%255;
        return(this);
    }
    add2R(r){//颜色加法,多余折返-颜色R
        this.r=(this.r+r)%255;
        return(this);
    }
    add2G(g){//颜色加法,多余折返-颜色G
        this.g=(this.g+g)%255;
        return(this);
    }
    add2B(b){//颜色加法,多余折返-颜色B
        this.b=(this.b+b)%255;
        return(this);
    }
    invert(){//反色
        this.r=255-this.r;
        this.g=255-this.g;
        this.b=255-this.b;
        return(this);
    }
    toRGBBound(){//归顶到RGB
        if(Math.max(this.r,this.g,this.b)==this.r){
            this.r=255;this.g=0;this.b=0;
        }else if(Math.max(this.r,this.g,this.b)==this.g){
            this.r=0;this.g=255;this.b=0;
        }else{
            this.r=0;this.g=0;this.b=255;
        }
        return(this);
    }
}
