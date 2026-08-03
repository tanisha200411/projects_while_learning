/*=========================================================
                MAIN.JS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeScrollReveal();

    initializeSmoothScroll();

    initializeActiveNavigation();

});

/*=========================================
        SCROLL REVEAL
=========================================*/

function initializeScrollReveal(){

    const elements = document.querySelectorAll(
        ".card, .island, .fruit, .about, section h2"
    );

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{

        threshold:0.15

    });

    elements.forEach(element=>{

        element.classList.add("fade-up");

        observer.observe(element);

    });

}

/*=========================================
      SMOOTH NAVIGATION
=========================================*/

function initializeSmoothScroll(){

    const links=document.querySelectorAll('nav a');

    links.forEach(link=>{

        link.addEventListener("click",(e)=>{

            e.preventDefault();

            const target=document.querySelector(

                link.getAttribute("href")

            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

            const menu=document.querySelector("nav ul");

            if(menu){

                menu.classList.remove("active");

            }

        });

    });

}

/*=========================================
        ACTIVE NAV LINK
=========================================*/

function initializeActiveNavigation(){

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-120;

            const height=section.offsetHeight;

            if(window.scrollY>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href")==="#" + current

            ){

                link.classList.add("active");

            }

        });

    });

}

/*=========================================
       HERO BUTTON
=========================================*/

const startButton=document.querySelector(".start-btn");

if(startButton){

    startButton.addEventListener("click",()=>{

        const crew=document.querySelector("#characters");

        crew.scrollIntoView({

            behavior:"smooth"

        });

    });

}

/*=========================================
       BACK TO TOP
=========================================*/

window.addEventListener("load",()=>{

    window.scrollTo({

        top:0,

        behavior:"instant"

    });

});

console.log("🏴‍☠️ Grand Line Adventure Loaded Successfully");