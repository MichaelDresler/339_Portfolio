var ddw=lottie.loadAnimation({
    container: document.querySelector('.animation'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'ddw.json'

  })

  function hover(src) {
    document.getElementById('thumbnail').setAttribute('src', src);
}

function unhover(src) {
    document.getElementById('thumbnail').setAttribute('src', src);
}

//  ddw.addEventListener("complete",e => {
//   setTimeout(()=> {
//     document.querySelector("main").scrollIntoView();
//   },500)
//  })

//  ddw.removeEventListener();
//  console.log(ddw)
  // lottie.play();
  // setTimeout(()=> {
  //   lottie.pause();
  // },2000);
  // console.log(animation);
