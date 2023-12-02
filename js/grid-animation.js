var tween;
var tweenChange;



function init() {
  gsap.set(".load-grid", { display: "grid" });

    tween = gsap.fromTo(
      ".grid-item",
      {
        opacity: 0,
        duration: 0.5,
      },
      {
        opacity: 0.8,
    

        stagger: {
          repeat: 1,
          repeatDelay: 0.01,
          yoyo: true,
          grid: "auto",
          from: "start",
          ease: "none",
          each: 0.1,
        },
      }
    );

    setTimeout(init, 5500);

}

init();


function changeImage() {
  // !tween.isActive()
  gsap.set(".load-grid", { display: "grid" });
  if (true) {
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
