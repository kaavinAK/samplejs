let gamescreen = document.querySelector('.gamescreen')
let ctx = gamescreen.getContext('2d')
gamescreen.style.border='2px red solid'
let div = document.querySelector('.div')
class Ball {
    constructor()
    {
        this.height=15;
        this.width=15;
        this.position={
            x:600,
            y:350
        };
        this.speed={
            x:20,
            y:30
        }
    }
    movement(dt,rightpaddle,leftpaddle)
    {
        if(!dt)
        {
            return 
        }
      if(this.position.x>rightpaddle.position.x-5 && this.position.x<rightpaddle.position.x+5)
      {
         if(this.position.y>=rightpaddle.position.y && this.position.y  <rightpaddle.position.y+rightpaddle.height)
         {
             this.speed.x=-this.speed.x
         }
      }
      if(this.position.x>leftpaddle.position.x-5 && this.position.x<leftpaddle.position.x+5)
      {
         if(this.position.y>=leftpaddle.position.y && this.position.y  <leftpaddle.position.y+leftpaddle.height)
         {
             this.speed.x=-this.speed.x
         }
      }
      if(this.position.x<=0)
      {
          this.speed.x=-this.speed.x
      }
      if(this.position.x+this.width>=1200)
      {
          this.speed.x=-this.speed.x
      }
      if(this.position.y<=0)
      {
          this.speed.y=-this.speed.y
      }
      if(this.position.y>=650)
      {
          this.speed.y=-this.speed.y
      }
      this.position.x+=this.speed.x/dt
      this.position.y+=this.speed.y/dt
    }
    draw(ctx)
    {
ctx.fillRect(this.position.x,this.position.y,this.height,this.width)
    }
}

class RightPaddle {
    constructor()
    {
        this.height=200
        this.width=15
        this.position={
            x:1000,y:200
        }
        this.speed={
            x:10,y:10
        }
    }
    draw(ctx)
    {
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }

}
class LeftPaddle {
    constructor()
    {
        this.height=200
        this.width=15
        this.position={
            x:200
            ,y:200
        }
        this.speed={
            x:10,y:10
        }
    }
     draw(ctx)
    {
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

let rightpaddle = new RightPaddle()
let leftpaddle = new LeftPaddle()
let prev=0
function func(event,rightpaddle,leftpaddle)

{
    console.log(event.keyCode)
    if(event.keyCode==40)
    {
       rightpaddle.position.y+=rightpaddle.speed.y
    }
    if(event.keyCode==38)
    {
        rightpaddle.position.y-=rightpaddle.speed.y
    }
    if(event.keyCode==83)
    {
        leftpaddle.position.y+=leftpaddle.speed.y
    }
    if(event.keyCode==87)
    {
        leftpaddle.position.y-=leftpaddle.speed.y
    }

}
document.addEventListener('keydown',(e)=>
{
    func(e,rightpaddle,leftpaddle)
})
let ball = new Ball()
function gameloop(timestamp)
{
  ctx.clearRect(0,0,1200,650)
  let dt = timestamp-prev
  prev=timestamp
  rightpaddle.draw(ctx)
  leftpaddle.draw(ctx)
  ball.movement(dt,rightpaddle,leftpaddle)
  ball.draw(ctx)
  
  requestAnimationFrame(gameloop)
}
gameloop()