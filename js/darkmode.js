const switchTheme = () =>{
    const root = document.documentElement
    let dataTheme = root.getAttribute('data-theme'),newTheme
    newTheme = (dataTheme === "light")? "dark": "light";
    root.setAttribute("data-theme", newTheme)
}

document.querySelector("#theme-switcher").addEventListener("click",switchTheme)