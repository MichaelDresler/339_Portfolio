const primaryNav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".mobile-nav-toggle");
document.getElementById("navbar").style.display = "flex";

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
  }
});

let duration = 0.5;
let pause = 1;
let stagger = duration + pause;
let repeatDelay = stagger + pause;

var tween;
var tweenChange = gsap.to(".class", {rotation: 360, duration: 5, ease: "elastic"});



function init() {
  gsap.set(".load-grid", { display: "grid" });

    tween = gsap.fromTo(
      ".grid-item",
      {
        opacity: 0,
        duration: duration,
      },
      {
        opacity: 0.8,
        // repeat:-1,
        // repeatDelay:1,
        // duration:0.2,

        stagger: {
          repeat: 1,
          repeatDelay: 0.1,
          yoyo: true,
          grid: "auto",
          from: "start",
          ease: "none",
          each: 0.1,
        },
      }
    );

    setTimeout(init, 8000);

}

init();
// function my(){
// console.log(tweenChange.isActive());
// setTimeout(my, 1000)


// }
// my();
// gsap.fromTo(
//   ".grid-item",
//   {
//     opacity: 1,

//   },
//   {

//     opacity: 0,
//     duration: 0.5,
//     stagger: { amount: 0.5, from: "random" },
//     onComplete: () => {
//         gsap.fromTo(
//             ".grid-item",
//         {
//             opacity: 0,

//         },
//         {
//             opacity: 1,
//             // repeat:-1,
//             // repeatDelay:3,

//             stagger: {
//              repeat:-1,
//              repeatDelay:2,
//               grid: "auto",
//               from: "start",
//               ease: "none",
//               each:.2,
//             }

//         }
//           );
//     }
//   }
// );

function changeImage() {
  gsap.set(".load-grid", { display: "grid" });
  if (!tween.isActive()) {
    tweenChange = gsap.fromTo(
      ".grid-item",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        stagger: { amount: 0.5, from: "random" },
        onComplete: () => {
          const picture = document.getElementById("michael1");
          const zValue = window.getComputedStyle(picture);
          if (zValue.getPropertyValue("z-index") == "1") {
            console.log(zValue.getPropertyValue("z-index"));
            document.getElementById("michael1").style.zIndex = 0;
          } else {
            document.getElementById("michael1").style.zIndex = 1;
          }

          gsap.to(".grid-item", {
            opacity: 0,
            duration: 0.5,
            stagger: { amount: 0.5, from: "random" },
          });
        },
      }
    );
  }
}
