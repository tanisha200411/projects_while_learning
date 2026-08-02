window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(window.scrollY > 60){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});

const menuBtn=document.querySelector(".menu-btn");

const navMenu=document.querySelector("nav ul");

if(menuBtn){

menuBtn.addEventListener("click",()=>{

navMenu.classList.toggle("active");

});

}