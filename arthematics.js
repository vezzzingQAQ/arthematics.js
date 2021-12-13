class Canvas{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        //创建canvas
        document.querySelector("body").innerHTML+=`
        <div class="m2c">
        <canvas class="m2canvas" width=${this.width} height=${this.height}
        style="position:absulote;left${this.x}px;top:${this.y}px"
        ></canvas>
        </div>`
        this.canvas=document.querySelector(".m2canvas");
        this.context=this.canvas.getContext("2d");
    }
    /**
     * 基础函数
     */
    noFill(){
        this.context.fillStyle="transparent";
    }
    noStroke(){
        this.context.strokeStyle="transparent";
    }
    fill(color){
        this.context.fillStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
    stroke(color){
        this.context.strokeStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
    strokeWidth(w){
        this.context.lineWidth=w;
    }
    point(x,y){
        this.context.beginPath(); 
        this.context.rect(x,y,1,1);
        this.context.closePath();
        this.context.fill();
    }
    rect(x,y,width,height){
        this.context.beginPath(); 
        this.context.rect(x,y,width,height);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
    circle(x,y,r){
        this.context.beginPath(); 
        this.context.arc(x,y,r,0,Math.PI*2,false);
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
    }
    background(color){
        var pfstyle=this.context.fillStyle;
        this.context.fillStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
        this.context.rect(0,0,this.width,this.height);
        this.context.fill();
        this.context.fillStyle=pfstyle;
    }
    /**
     * 上层建筑数学函数
     */
    draw2dFunction(fromx,tox,fromy,toy,f,colorf){
        this.context.scale()
    }
}
class Color{
    constructor(r,g,b,a){
        this.r=r;
        this.g=g;
        this.b=b;
        this.a=a;
    }
}
//全局变量
window.canvasList=[];//画布列表
window.frameCount=0;//帧数
window.T=0;
window.width=window.innerWidth;
window.height=window.innerHeight;
//全局函数
function createCanvas(x,y,width,height){
    let cs=new Canvas(x,y,width,height)
    //更新画布列表
    canvasList.push(cs);
    if(canvasList.length==1){
        window.canvas=cs;
    }
    return(cs);
}
function draw(f){
    setInterval(function(){
        window.frameCount++;
        window.T+=0.05;
        f();
    },50/3);
}
/**
 * 数学函数
 * sin,cos,tan,random,
 */
function sin(x){
    return(Math.sin(x));
}
function cos(x){
    return(Math.cos(x));
}
function random(from,to){
    return(Math.random()*(Math.abs(from-to))+(to-from)/2);
}
/**
 * 映射函数
 */
function map(p,fp,tp,fa,ta){
    return(p*(ta-fa)/(tp-fp));
}