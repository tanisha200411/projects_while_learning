/*=========================================================
                HERO.JS
=========================================================*/

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const compass = document.querySelector(".compass");
const sun = document.querySelector(".sun");
const cloud1 = document.querySelector(".cloud1");
const cloud2 = document.querySelector(".cloud2");

/*=========================================
        HERO PARALLAX
=========================================*/

if(hero){

hero.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth)-0.5;
const y=(e.clientY/window.innerHeight)-0.5;

if(heroContent){

heroContent.style.transform=
`translate(${x*25}px,${y*20}px)`;

}

if(compass){

compass.style.transform=
`translate(${x*40}px,${y*30}px) rotate(${x*20}deg)`;

}

if(sun){

sun.style.transform=
`translate(${x*50}px,${y*35}px)`;

}

if(cloud1){

cloud1.style.transform=
`translateX(${x*40}px)`;

}

if(cloud2){

cloud2.style.transform=
`translateX(${-x*50}px)`;

}

});

}

/*=========================================
      RESET POSITION
=========================================*/

if(hero){

hero.addEventListener("mouseleave",()=>{

if(heroContent){

heroContent.style.transform="translate(0,0)";

}

if(compass){

compass.style.transform="translate(0,0) rotate(0deg)";

}

if(sun){

sun.style.transform="translate(0,0)";

}

if(cloud1){

cloud1.style.transform="translateX(0)";

}

if(cloud2){

cloud2.style.transform="translateX(0)";

}

});

}

/*=========================================
      HERO ENTRANCE
=========================================*/

window.addEventListener("load",()=>{

if(heroContent){

heroContent.animate([

{

opacity:0,

transform:"translateY(80px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:1500,

easing:"ease-out",

fill:"forwards"

});

}

});

/*=========================================
      BUTTON HOVER
=========================================*/

const startButton=document.querySelector(".start-btn");

if(startButton){

startButton.addEventListener("mouseenter",()=>{

startButton.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.08)"

},

{

transform:"scale(1)"

}

],{

duration:700

});

});

}

/*=========================================
      SUN GLOW
=========================================*/

if(sun){

setInterval(()=>{

sun.animate([

{

opacity:.75,

transform:"scale(1)"

},

{

opacity:1,

transform:"scale(1.08)"

},

{

opacity:.75,

transform:"scale(1)"

}

],{

duration:3500,

iterations:1

});

},3500);

}

/*=========================================
      HERO TITLE LETTER EFFECT
=========================================*/

const heroTitle=document.querySelector(".hero-content h1");

if(heroTitle){

const text=heroTitle.innerText;

heroTitle.innerHTML="";

text.split("").forEach((letter,index)=>{

const span=document.createElement("span");

span.innerHTML=letter===" "?"&nbsp;":letter;

span.style.display="inline-block";

span.style.opacity="0";

span.style.transform="translateY(30px)";

span.style.transition=`all .4s ease ${index*40}ms`;

heroTitle.appendChild(span);

});

window.addEventListener("load",()=>{

const spans=heroTitle.querySelectorAll("span");

spans.forEach(span=>{

span.style.opacity="1";

span.style.transform="translateY(0)";

});

});

}

/*=========================================
      HERO SCROLL PARALLAX
=========================================*/

window.addEventListener("scroll",()=>{

const scroll=window.scrollY;

if(hero){

hero.style.backgroundPositionY=`${scroll*0.4}px`;

}

if(compass){

compass.style.opacity=Math.max(.08-scroll/2500,0);

}

});

console.log("🏴‍☠️ Hero Initialized");