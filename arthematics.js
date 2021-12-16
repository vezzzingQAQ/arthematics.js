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
        this.parameters={};
        if(argList){
            try{
                for(let i=0;i<argList.length;i++){
                    this.parameters[argList[i].parameter]=argList[i].value;
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
        //newCanvas.style.border="1px solid rgb(100,100,100)";
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
        if(arguments.length==4){
            this.context.rect(x,y,width,height);
        }else if(arguments.length==3){
            this.context.rect(x,y,width,width);
        }
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
    draw2dFunction_o(obj){
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
        let addAmountX=scalev(obj.padx,Math.abs(xr-xl),Math.abs(boundxr-boundxl));
        let addAmountY=scalev(obj.pady,Math.abs(yb-yt),Math.abs(boundyb-boundyt));
        for(let ax=boundxl;ax<boundxr;ax+=addAmountX){
            for(let ay=boundyt;ay<boundyb;ay+=addAmountY){
                let x=map(ax,boundxl,boundxr,xl,xr);
                let y=map(ay,boundyt,boundyb,yt,yb);
                let z=obj.f(x,y);
                //canvas.background(new Color(0));
                obj.colorf(x,y,z);
                obj.shapef(ax,ay,z);
            }
        }
    }
    draw2dFunction(sizex,sizey,func,colorf,shapef){
        let boundxl=this.width/2-sizex;
        let boundxr=this.width/2+sizex;
        let boundyt=this.height/2-sizey;
        let boundyb=this.height/2+sizey;
        //读取函数对象
        let xl=func.xl;
        let xr=func.xr;
        let yt=func.yt;
        let yb=func.yb;
        //计算映射
        let addAmountX=scalev(func.padx,Math.abs(xr-xl),Math.abs(boundxr-boundxl));
        let addAmountY=scalev(func.pady,Math.abs(yb-yt),Math.abs(boundyb-boundyt));
        for(let ax=boundxl;ax<boundxr;ax+=addAmountX){
            for(let ay=boundyt;ay<boundyb;ay+=addAmountY){
                let x=map(ax,boundxl,boundxr,xl,xr);
                let y=map(ay,boundyt,boundyb,yt,yb);
                let z=func.calculate(x,y);
                //canvas.background(new Color(0));
                colorf(x,y,z);
                shapef(ax,ay,z);
            }
        }
    }
    /**
     * 实例函数
     */
    log(){
        console.log(this);
    }
    /**
     * 显示函数
     */
    showParameters(color){
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
        //绑定事件
        tag.onmouseenter=function(){
            this.style.opacity="1";
            this.style.backgroundColor="rgba(150,150,150,0.2)";
        }
        tag.onmouseleave=function(){
            this.style.opacity="0";
            this.style.backgroundColor="transparent";
        }
        for(let i in this.parameters){
            if(isNumber(this.parameters[i])){//判断是数字:四舍五入}
                tag.innerHTML+=`${i}:${this.parameters[i].toFixed(2)}`+"<br>";
            }
        }
        this.canvas.parentNode.appendChild(tag);
    }
}
class Function2d{
    constructor(fromx,tox,padx,fromy,toy,pady,f){
        this.xl=fromx;
        this.xr=tox;
        this.padx=padx;
        this.yt=fromy;
        this.yb=toy;
        this.pady=pady;
        this.f=f;
    }
    calculate(x,y){
        return(this.f(x,y));
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
    toStyle(){
        return(`rgba(${this.r},${this.g},${this.b},${this.a})`);
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
    return((fa*p-fa*tp-ta*p+ta*fp)/(fp-tp));
}
function scalev(delta,from,to){
    return(delta*to/from);
}
/**
 * 类型判断函数
 */
function isNumber(x){
    var regPos = /^[0-9]+.?[0-9]*/; //判断是否是数字。
    if(regPos.test(x)){
        return(true);
    }else{
        return(false);
    }
}