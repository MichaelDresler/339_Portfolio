var ddw=lottie.loadAnimation({
    container: document.getElementById('animation'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'ddw.json'

  })



 ddw.addEventListener("complete",e => {
  setTimeout(()=> {
    document.getElementById("about").scrollIntoView();
  },500)
 })

//  ddw.removeEventListener();
//  console.log(ddw)
  // lottie.play();
  // setTimeout(()=> {
  //   lottie.pause();
  // },2000);
  // console.log(animation);
