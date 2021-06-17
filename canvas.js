let gamecanvas = document.querySelector('.gamecanvas')
let ctx=gamecanvas.getContext('2d')
gamewidth=800;
gameheight=800;
let score = document.querySelector('.score')
let scorenum=0
let div = document.querySelector('.div')
div.style.border='2px solid red'
div.style.height='800px'
div.style.width='800px'
class Ball {
    constructor()
    {
        this.height=15;
        this.width=15;
        this.position={
            x:200,
            y:200
        }
        this.speed={
            x:20,y:30
        }

    }
    movement(dt,paddle)
    {
        if(!dt)
        {
            return 
        }
       // console.log(dt)
       
        if(this.position.x+this.width>paddle.position.x && this.position.x <paddle.position.x+paddle.weight)

        {
          //  console.log("before position")
          //  console.log(this.position.y,paddle.position.y)
            if(this.position.y+this.height>paddle.position.y-5 && this.position.y+this.height<paddle.position.y+5){
            
            this.speed.y=-this.speed.y;
            scorenum+=1
          //  console.log("position",this.position.x,this.position.y)
            }

        }
        if(this.position.x>=800)
        {
           this.speed.x=-this.speed.x
        }
        if(this.position.x<=0)
        {
            this.speed.x=-this.speed.x
        }
        if(this.position.y<=0)
        {
            this.speed.y=-this.speed.y
        }
        if(this.position.y>=800)
        {
             this.speed.y=-this.speed.y
        }
        this.position.x+=this.speed.x/dt;

        this.position.y+=this.speed.y/dt;
     //   console.log("position",this.position.x,this.position.y)
    }
    draw(ctx)
    {
     //   console.log("drwaing ball")
       
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
      //  console.log("console logging after drwaing");
    }

}
let ball = new Ball()

class Paddle {
    constructor()
    {
      this.height=40;
      this.weight=100;
      this.position={
          x:gamewidth/2-this.weight/2
          ,
          y:gameheight-this.height-20
      }
      this.speed=10;
    }
    left()
    {
        this.position.x=this.position.x-this.speed
    }
    right()
    {
        this.position.x+=this.speed
    }
    draw(ctx)
    {
        
        ctx.fillRect(this.position.x,this.position.y,this.weight,this.height)
    }
    
}
let paddle = new Paddle();
let prevtime=0;
function incspeed(paddle,ball)
{
    console.log("x",paddle.speed.x,"y",paddle.speed.y)
paddle.speed.x=paddle.speed.x*2
paddle.speed.y=2*paddle.speed.y
ball.speed.x=2*ball.speed.x
ball.speed.y=2*ball.speed.y
}
function gameloop(timestamp)
{
    ctx.clearRect(0,0,800,800)
let dt = timestamp-prevtime;
prevtime=timestamp;
ball.movement(dt,paddle);
ball.draw(ctx)
score.innerHTML=scorenum
if(scorenum%5==0 && scorenum!=0)
{
    incspeed(paddle,ball)
}
paddle.draw(ctx)


requestAnimationFrame(gameloop)
}



document.addEventListener('keydown',keycases)
function keycases(event)
{
     if(event.keyCode==37)
     {
         if(paddle.position.x>0 && paddle.position.x<800)
         
         {
             
         paddle.left()

         }
         else{
             paddle.position.x=0
         }
     }
     if(event.keyCode==39)
     {
        if(paddle.position.x>=0 && paddle.position.x<=800-paddle.weight)
        {
            paddle.right()
        }
        else{
            paddle.position.x=800-paddle.weight
        }
        
         
     }
}
gameloop()