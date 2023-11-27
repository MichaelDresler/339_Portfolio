

var isHovering = false;
function curse() {

  var children = document.querySelectorAll(".cursor-item");


  var divs = document.querySelectorAll("a,.portrait");
  for (var i = 0; i < divs.length; i++) {

    divs[i].addEventListener("mouseenter", function (e) {
      var rect = this.getBoundingClientRect();
      console.log("w")
      for (let k = 0; k < children.length; k++) {
        if(k == 0 ){
            children[k].style.transform = "translate(" + (rect.left-e.clientX) + "px, " + (rect.top - e.clientY) + "px)";
            console.log(rect.left - e.clientX );

        }
        if(k == 1 ){
            children[k].style.transform = "translate(" + (rect.right-e.clientX) + "px, " + (rect.top - e.clientY) + "px) rotate(0deg)";


        }
        
        if(k == 2 ){
            children[k].style.transform = "translate(" + (rect.left-e.clientX) + "px, " + (rect.bottom - e.clientY) + "px) rotate(0deg)";

        }
        
        if(k == 3 ){
            children[k].style.transform = "translate(" + (rect.right-e.clientX) + "px, " + (rect.bottom - e.clientY) + "px) rotate(0deg)";

        }
        
        isHovering = true;
        
      }

    });
    divs[i].addEventListener("mouseleave", function (e) {
        isHovering = false;
      for (let m = 0; m < children.length; m++) {

        children[m].style.transform = "none"
      }


    });

  }
}
const mouseCursor = document.querySelector(".cursor-container");


function mouseMoveHandler(e) {
    mouseCursor.style.top = "calc(" + e.clientY + "px - 5px)";
    mouseCursor.style.left = "calc(" + e.clientX + "px - 5px)";
    console.log(isHovering);

  }


  function mouseMove() {
    function mouseMoveHandler(e) {
      if (!isHovering) {
        mouseCursor.style.top = "calc(" + e.clientY + "px - 5px)";
        mouseCursor.style.left = "calc(" + e.clientX + "px - 5px)";
        console.log("checking");
      }
    }
  
    document.addEventListener("mousemove", mouseMoveHandler);
  
    // Add event listener only if isHovering is false
    if (!isHovering) {
      document.addEventListener("mousemove", mouseMoveHandler);
    }
  }
  
  


//   function mouseMove() {

//     document.addEventListener("mousemove", function mouseMoveHandler(e) {
//       if (isHovering) {
//         document.removeEventListener("mousemove", mouseMoveHandler);
//       } else {
//         mouseCursor.style.top = "calc(" + e.clientY + "px - 5px)";
//         mouseCursor.style.left = "calc(" + e.clientX + "px - 5px)";
//         console.log("checking")

//       }
//     });
//   }
// function mouseMove() {
//     if(isHovering){

//     document.addEventListener("mousemove", (e) => {
//     document.removeEventListener("mousemove", mouseMoveHandler);
//     console.log(isHovering)
//   });

// }
// else{


// }
// }
mouseMove();
curse();


// function mouseAnimate(){
//     const mouseCursor = document.querySelector(".cursor-container");
//     const anchors = document.querySelectorAll("a, .portrait")
//     const corners = document.querySelectorAll(".cursor-item")


//     anchors.forEach(function(link){
//         link.addEventListener("mouseenter",function(){
//             const state = Flip.getState(corners)
//             for(var i = 0; i < corners.length; i++){
//                 this.appendChild(corners[i]);
//                 console.log("w")

//             }

//             Flip.from(state,{
//                 duration:.2,
//                 // ease: "power1.out",
//             })

//         })

//         link.addEventListener("mouseleave", function (e) {
//             for (let m = 0; m < corners.length; m++) {
//               mouseCursor.insertBefore(corners[m], mouseCursor.firstChild);
//             }
//           });
//     })
// }

// mouseAnimate();