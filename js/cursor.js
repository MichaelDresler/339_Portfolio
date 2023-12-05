const canvas = document.querySelector(".canvas1")
const ctx = canvas.getContext('2d');

let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
// var scrollTop = (window.scrollY !== undefined) ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;
var initialScroll
var body = document.body,
  html = document.documentElement;

var height = Math.max(body.scrollHeight, body.offsetHeight,
  html.clientHeight, html.scrollHeight, html.offsetHeight);

let  stroke = getComputedStyle(document.documentElement).getPropertyValue('--color-header');;
canvas.width = window.innerWidth;
canvas.height = height


ctx.lineWidth = 2;



let hovering = false
let damp = 0.2
var rect

const mouse = {
  x: null,
  y: null,
}

document.querySelector("#theme-switcher").addEventListener("click",()=>{
  stroke = getComputedStyle(document.documentElement).getPropertyValue('--color-background');
  ctx.strokeStyle =  stroke

})


class Corner {
  constructor(x, y, id) {
    this.baseSize = 7.5
    this.x = x;
    this.y = y;
    this.size = this.baseSize;
    this.id = id
  }
  draw() {

    this.size = hovering ? (rect.width / 20 > this.size ? Math.log(rect.width * rect.height) * 1.5 : this.size) : this.baseSize;
    // ctx.fillRect(this.x,this.y,this.size,this.size)
    ctx.save();
    ctx.translate(this.x, this.y)


    if (this.id == "br") {
      ctx.rotate(Math.PI);
    }
    else if (this.id == "tr") {
      ctx.rotate(Math.PI / 2);
    }

    else if (this.id == "bl") {
      ctx.rotate(-Math.PI / 2);
    }

    ctx.moveTo(this.size, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(0, this.size);
    ctx.restore()
    ctx.strokeStyle = stroke

  }


  moveTo(targetX, targetY) {
    let dx = targetX - this.x;
    let dy = targetY - this.y;

    // Calculate the distance to the target
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Normalize the direction
      let nx = dx / distance;
      let ny = dy / distance;

      // Calculate acceleration based on distance
      let acceleration = distance * damp; // Adjust the acceleration factor

      // Update velocity
      this.vx = nx * acceleration;
      this.vy = ny * acceleration;

      // Update position
      this.x += this.vx
      this.y += this.vy

    }
  }
}

function throttle(callback, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    callback(...args);
  };
}

window.addEventListener("mousemove", throttle(function (event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  // console.log("firing")
  // console.log(ctx.strokeStyle)

}, 50)); // Adjust the delay as needed

const bRightCorner = new Corner(mouse.x, mouse.y, "br")
const tRightCorner = new Corner(mouse.x, mouse.y, "tr")
const tLeftCorner = new Corner(mouse.x, mouse.y, "tl")
const bLeftCorner = new Corner(mouse.x, mouse.y, "bl")


function animate() {
  ctx.clearRect(0, 0, window.innerWidth, height);
  if (!hovering) {
    bRightCorner.moveTo(mouse.x, mouse.y);
    tRightCorner.moveTo(mouse.x, mouse.y);
    bLeftCorner.moveTo(mouse.x, mouse.y);
    tLeftCorner.moveTo(mouse.x, mouse.y)

  }
  else {
    tLeftCorner.moveTo(rect.x, rect.y + initialScroll)
    tRightCorner.moveTo(rect.x + rect.width, rect.y + initialScroll)
    bRightCorner.moveTo(rect.x + rect.width, rect.y + rect.height + initialScroll)
    bLeftCorner.moveTo(rect.x, rect.y + rect.height + initialScroll)

  }


  ctx.beginPath();
  bRightCorner.draw();
  bLeftCorner.draw();
  tRightCorner.draw();
  tLeftCorner.draw();
  ctx.stroke();
  requestAnimationFrame(animate);

}



var divs = document.querySelectorAll(".portrait, .can-hover");
let divLength = divs.length

function handleMouseEnter() {
  rect = this.getBoundingClientRect();
  initialScroll = window.scrollY;
  hovering = true;
  damp = 0.08;
}

function handleMouseLeave() {
  hovering = false;
  damp = 0.07;
}

for (let i = 0; i < divLength; i++) {
  divs[i].addEventListener("mouseenter", handleMouseEnter);
  divs[i].addEventListener("mouseleave", handleMouseLeave);
}




function resize() {
  canvas.width = window.innerWidth;
  canvas.height = height
  // console.log(window.innerwidth)
}

// window.onresize = reportWindowSize;

animate();
