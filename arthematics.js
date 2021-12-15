class AMError{
    constructor(type,dis){
        this.type=type;
        this.dis=dis;
    }
    log(){
        return(this.type+":"+this.dis);
    }
}
class Canvas{
    constructor(x,y,width,height,id,argList/*携带的参数列表*/){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.left=this.x;
        this.right=this.x+this.width;
        this.top=this.y;
        this.bottom=this.y+this.height;
        
        this.id=id;
        //参数列表赋值
        if(argList){
            try{
                for(let i=0;i<argList.length;i++){
                    this[argList[i].parameter]=argList[i].value;
                }
            }catch{
                return(new AMError("参数列表赋值错误","参见:参数列表赋值"));
            }
        }
        //创建canvas
        let newCanvas=document.createElement("canvas");
        newCanvas.width=this.width;
        newCanvas.height=this.height;
        newCanvas.id=this.id;
        newCanvas.style.position="absolute";
        newCanvas.style.left=this.x+"px";
        newCanvas.style.top=this.y+"px";
        newCanvas.style.border="1px solid rgb(100,100,100)";
        this.canvas=newCanvas;
        this.context=this.canvas.getContext("2d");
        document.body.appendChild(newCanvas);
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
    line(x1,y1,x2,y2){
        this.context.beginPath(); 
        this.context.moveTo(x1,y1);
        this.context.lineTo(x2,y2);
        this.context.closePath();
        this.context.stroke();
    }
    text(words,x,y){
        this.context.font='50px sans-serif';
        this.context.fillText(words,x,y);
        this.context.strokeText(words,x,y);
    }
    /**
     * 上层建筑数学函数
     */
    draw2dFunction(fromx,tox,fromy,toy,f,colorf){
        this.context.scale()
    }
    /**
     * 实例函数
     */
    log(){
        console.log(this);
    }
}
class Color{
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
}
//全局变量
window.canvasList=[];//画布列表
window.frameCount=0;//帧数
window.T=0;
window.width=window.innerWidth;
window.height=window.innerHeight;
//全局函数
function createCanvas(x,y,width,height,argList){
    let cs=new Canvas(x,y,width,height,"m2m"+canvasList.length,argList);
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
function abs(x){
    return(Math.abs(x));
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