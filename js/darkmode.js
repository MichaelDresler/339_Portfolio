const switchTheme = () =>{
    const root = document.documentElement
    const changeText = document.querySelector("#theme-switcher");
    let dataTheme = root.getAttribute('data-theme'),newTheme
    newTheme = (dataTheme === "light")? "dark": "light";
    root.setAttribute("data-theme", newTheme)
    changeText.textContent = (dataTheme === "light")? "Light": "Dark";
    localStorage.setItem("theme",newTheme)


}

document.querySelector("#theme-switcher").addEventListener("click",switchTheme)

function hover(src) {
    document.getElementById('thumbnail').setAttribute('src', src);
    document.getElementById('thumbnail').style.opacity = 100;
    console.log("picture hover")
}

function unhover(src) {
    // document.getElementById('thumbnail').setAttribute('src', src);
    document.getElementById('thumbnail').style.opacity = 0;
}