const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

//clean up this code...
//figure out best practices... etc... 

const resize = function() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

resize();

function TV ()
{
  let self = this;

  this.dvds = [];
  
  this.onClick = function (event)
  {
    let temp = [];
    for (let i = 0; i < self.dvds.length; i++)
    {

      let rect = canvas.getBoundingClientRect();
      let clickX = event.pageX - rect.left;;
      let clickY = event.pageY - rect.top;;

      let dvd = self.dvds[i];

      //horizontal check intersection
      let hCheck = (clickX > dvd.x - 10) && (clickX < dvd.x + dvd.width + 10);
      //vertical check intersection
      let vCheck = (clickY > dvd.y - 10) && (clickY < dvd.y + dvd.height + 10);
      
      if (hCheck && vCheck)
      {
        temp.push(new DVD(dvd.x, dvd.y))
        break;
      }

    }
    for (let i = 0; i < temp.length; i++)
    {
      self.addDVD(temp[i]);
    }
  }

  this.addDVD = function (dvd) 
  {
    self.dvds.push(dvd);
  }

  canvas.addEventListener('click', this.onClick, false);

  this.update = function ()
  {
    //clear canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < self.dvds.length; i++)
    {
      let dvd = self.dvds[i];
      if (dvd.x + dvd.width > canvas.width || dvd.x < 0)
      {
        if (dvd.xVelocity > 0)
        {
          dvd.xVelocity = (-dvd.xVelocity);
        }
        else {
          dvd.xVelocity = Math.abs(dvd.xVelocity)
        }
      }
      if (dvd.y + dvd.height > canvas.height || dvd.y < 0)
      {
        if (dvd.yVelocity > 0)
        {
          dvd.yVelocity = (-dvd.yVelocity);
        }
        else {
          dvd.yVelocity = Math.abs(dvd.yVelocity);
        }
      }
      dvd.update();
    }
  }
}



function DVD (x, y)
{
  let self = this;
  this.x = x;
  this.y = y;

  this.height = 60; 
  this.width = 120;

  this.render = function() {
    ctx.drawImage(self.image, self.x, self.y, self.width, self.height)
  }
  
  let random = Math.floor(Math.random() * 3);

  if (random == 0)
  {
    this.xVelocity = -1;
    this.yVelocity = -1;
  }

  else if (random == 1)
  {
    this.xVelocity = 1;
    this.yVelocity = -1;
  }
  else if (random == 2)
  {
    this.xVelocity = -1;
    this.yVelocity = 1;
  }
  //this is not ogog this loads every new one think aboutthis more...
  this.image = new Image();
  this.image.src = 'dvd.png';
  this.image.onload = this.render;

  this.update = function (){
    self.x += self.xVelocity;
    self.y += self.yVelocity;
    self.render();
  }

}

const tv = new TV();
tv.addDVD(new DVD(0, 0));
setInterval(tv.update, 10);



window.addEventListener('resize', resize);
z
//https://www.phpied.com/3-ways-to-define-a-javascript-class/

//http://jsfiddle.net/jaredwilli/qFuDr/

//https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
