const canvas = document.querySelector(".canvas1")
const ctx = canvas.getContext('2d');
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
// var scrollTop = (window.scrollY !== undefined) ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;

canvas.width = vw;
canvas.height = vh
// canvas.style.width = vw + "px"; 
// canvas.style.height = vh + "px"; 
ctx.translate(0.5,0.5)

let hovering =false
let damp = 0.2
var rect

const mouse = {
  x: null,
  y: null,
}

class Corner {
  constructor(x,y,id) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.id = id
  }
  draw() {
    ctx.beginPath();
    if(hovering){
      this.size = (rect.width)/18
    }
    else{
      this.size = 10;
    }
   let stroke = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary');
    if(this.id == "br"){

      ctx.moveTo(this.x, this.y + this.size);                  // Move to top-left corner
      ctx.lineTo(this.x+this.size,this.y + this.size);      // Draw top side
      ctx.lineTo(this.x+this.size,this.y );      // Draw top side
    }
    else if(this.id == "tr"){
      ctx.moveTo(this.x, this.y - this.size);                  // Move to top-left corner
      ctx.lineTo(this.x+this.size,this.y - this.size);      // Draw top side
      ctx.lineTo(this.x+this.size,this.y );      // Draw top side
    }
    else if(this.id == "tl"){
      ctx.moveTo(this.x, this.y - this.size);                  // Move to top-left corner
      ctx.lineTo(this.x-this.size,this.y - this.size);      // Draw top side
      ctx.lineTo(this.x-this.size,this.y );      // Draw top side
    }
    else if(this.id == "bl"){
      ctx.moveTo(this.x, this.y + this.size);                  // Move to top-left corner
      ctx.lineTo(this.x -this.size,this.y + this.size);      // Draw top side
      ctx.lineTo(this.x-this.size,this.y  );      // Draw top side
 
    }
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.strokeStyle = stroke

  }
  setPos(x, y) {
    this.x = x;
    this.y = y;
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
      this.x += this.vx;
      this.y += this.vy;
  
 
    }
  }
}

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

});

const bRightCorner = new Corner(mouse.x,mouse.y,"br")
const tRightCorner = new Corner(mouse.x,mouse.y,"tr")
const tLeftCorner = new Corner(mouse.x,mouse.y,"tl")
const bLeftCorner = new Corner(mouse.x,mouse.y,"bl")


function animate() {
  ctx.clearRect(0, 0, vw, vh);
  if(!hovering) {
    bRightCorner.moveTo(mouse.x, mouse.y);
    tRightCorner.moveTo(mouse.x, mouse.y);
    bLeftCorner.moveTo(mouse.x, mouse.y);
    tLeftCorner.moveTo(mouse.x, mouse.y)
  

  } 
  else{
    bRightCorner.moveTo(rect.right, rect.bottom)
    tRightCorner.moveTo(rect.right, rect.top)
    bLeftCorner.moveTo(rect.left, rect.bottom)
    tLeftCorner.moveTo(rect.left, rect.top)
  } 

  
  bRightCorner.draw();
  bLeftCorner.draw();
  tRightCorner.draw();
  tLeftCorner.draw();
  requestAnimationFrame(animate);
  console.log(window.scrollY)
}



var divs = document.querySelectorAll(".portrait, .can-hover");

for (var i = 0; i < divs.length; i++) {
  divs[i].addEventListener("mouseenter", function (e) {
     rect = this.getBoundingClientRect();
     console.log(this)
    hovering = true
    damp = 0.04
  });
      divs[i].addEventListener("mouseleave", function (e) {
        bRightCorner.moveTo(rect.right, rect.bottom)
        tRightCorner.moveTo(rect.right, rect.top)
        bLeftCorner.moveTo(rect.left, rect.bottom)
        tLeftCorner.moveTo(rect.left, rect.top)
        hovering = false
        damp = 0.05

      });
        
}

function reportWindowSize() {
  vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  canvas.width = vw;
  canvas.height = vh
}

window.onresize = reportWindowSize;

animate();

// var isHovering = false;
// function curse() {

//   var children = document.querySelectorAll(".cursor-item");


//   var divs = document.querySelectorAll("a,.portrait,.can-hover");
//   for (var i = 0; i < divs.length; i++) {

//     divs[i].addEventListener("mouseenter", function (e) {
//       var rect = this.getBoundingClientRect();
//       console.log("w")
//       for (let k = 0; k < children.length; k++) {
//         if(k == 0 ){
//             children[k].style.transform = "translate(" + (rect.left-e.clientX) + "px, " + (rect.top - e.clientY) + "px)";
//             console.log(rect.left - e.clientX );

//         }
//         if(k == 1 ){
//             children[k].style.transform = "translate(" + (rect.right-e.clientX) + "px, " + (rect.top - e.clientY) + "px) rotate(0deg)";


//         }
        
//         if(k == 2 ){
//             children[k].style.transform = "translate(" + (rect.left-e.clientX) + "px, " + (rect.bottom - e.clientY) + "px) rotate(0deg)";

//         }
        
//         if(k == 3 ){
//             children[k].style.transform = "translate(" + (rect.right-e.clientX) + "px, " + (rect.bottom - e.clientY) + "px) rotate(0deg)";

//         }
        
//         isHovering = true;
        
//       }

//     });
//     divs[i].addEventListener("mouseleave", function (e) {
//         isHovering = false;
//       for (let m = 0; m < children.length; m++) {

//         children[m].style.transform = "none"
//       }


//     });

//   }
// }
// const mouseCursor = document.querySelector(".cursor-container");


// function mouseMoveHandler(e) {
//     mouseCursor.style.top = "calc(" + e.clientY + "px - 5px)";
//     mouseCursor.style.left = "calc(" + e.clientX + "px - 5px)";

//   }


//   function mouseMove() {
//     function mouseMoveHandler(e) {
//       if (!isHovering) {
//         mouseCursor.style.top = "calc(" + e.clientY + "px - 5px)";
//         mouseCursor.style.left = "calc(" + e.clientX + "px - 5px)";

//       }
//     }
  
//     document.addEventListener("mousemove", mouseMoveHandler);
  
//     // Add event listener only if isHovering is false
//     if (!isHovering) {
//       document.addEventListener("mousemove", mouseMoveHandler);
//     }
//   }
  
  


// //   function mouseMove() {

// //     document.addEventListener("mousemove", function mouseMoveHandler(e) {
// //       if (isHovering) {
// //         document.removeEventListener("mousemove", mouseMoveHandler);
// //       } else {
// //         mouseCursor.style.top = "calc(" + e.clientY + "px - 5px)";
// //         mouseCursor.style.left = "calc(" + e.clientX + "px - 5px)";
// //         console.log("checking")

// //       }
// //     });
// //   }
// // function mouseMove() {
// //     if(isHovering){

// //     document.addEventListener("mousemove", (e) => {
// //     document.removeEventListener("mousemove", mouseMoveHandler);
// //     console.log(isHovering)
// //   });

// // }
// // else{


// // }
// // }
// mouseMove();
// curse();


// // function mouseAnimate(){
// //     const mouseCursor = document.querySelector(".cursor-container");
// //     const anchors = document.querySelectorAll("a, .portrait")
// //     const corners = document.querySelectorAll(".cursor-item")


// //     anchors.forEach(function(link){
// //         link.addEventListener("mouseenter",function(){
// //             const state = Flip.getState(corners)
// //             for(var i = 0; i < corners.length; i++){
// //                 this.appendChild(corners[i]);
// //                 console.log("w")

// //             }

// //             Flip.from(state,{
// //                 duration:.2,
// //                 // ease: "power1.out",
// //             })

// //         })

// //         link.addEventListener("mouseleave", function (e) {
// //             for (let m = 0; m < corners.length; m++) {
// //               mouseCursor.insertBefore(corners[m], mouseCursor.firstChild);
// //             }
// //           });
// //     })
// // }

// // mouseAnimate();