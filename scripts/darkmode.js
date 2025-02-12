let darkmode = localStorage.getItem("darkmode");
darkmode == "active" ? document.body.classList.add("darkmode") : null;

const themeSwitch = document.getElementById("theme-switch");

const disableDarkmode = ()=>{
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
    darkmode = null;
}

const enableDarkmode = ()=>{
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    darkmode = "active";
}

themeSwitch.addEventListener("click",()=>{
    darkmode == "active" ?  disableDarkmode() : enableDarkmode();
})