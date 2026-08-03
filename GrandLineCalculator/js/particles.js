/*=========================================================
                    PARTICLES.JS
=========================================================*/

const PARTICLE_COUNT = 80;

const particleContainer = document.createElement("div");
particleContainer.className = "particles";

document.body.appendChild(particleContainer);

/*=========================================================
            CREATE PARTICLES
=========================================================*/

for(let i=0;i<PARTICLE_COUNT;i++){

    createParticle();

}

function createParticle(){

    const particle=document.createElement("span");

    particle.className="particle";

    resetParticle(particle,true);

    particleContainer.appendChild(particle);

}

/*=========================================================
            RANDOM POSITION
=========================================================*/

function resetParticle(particle,instant=false){

    const size=Math.random()*5+2;

    const duration=Math.random()*12+8;

    const delay=instant?Math.random()*duration:0;

    const left=Math.random()*100;

    particle.style.width=size+"px";

    particle.style.height=size+"px";

    particle.style.left=left+"vw";

    particle.style.bottom="-20px";

    particle.style.animationDuration=duration+"s";

    particle.style.animationDelay="-"+delay+"s";

}

/*=========================================================
          RESTART ANIMATION
=========================================================*/

document.querySelectorAll(".particle").forEach((particle)=>{

    particle.addEventListener("animationiteration",()=>{

        resetParticle(particle);

    });

});

/*=========================================================
            MOUSE GLOW
=========================================================*/

const glow=document.createElement("div");

glow.className="mouse-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

    glow.style.left=e.clientX+"px";

    glow.style.top=e.clientY+"px";

});

/*=========================================================
        PARALLAX PARTICLES
=========================================================*/

window.addEventListener("scroll",()=>{

    const scroll=window.scrollY;

    particleContainer.style.transform=`translateY(${scroll*0.15}px)`;

});

/*=========================================================
          TWINKLING STARS
=========================================================*/

const stars=document.createElement("div");

stars.className="stars";

document.body.appendChild(stars);

for(let i=0;i<50;i++){

    const star=document.createElement("span");

    star.className="star";

    star.style.left=Math.random()*100+"vw";

    star.style.top=Math.random()*100+"vh";

    star.style.animationDelay=Math.random()*4+"s";

    stars.appendChild(star);

}

/*=========================================================
          BUTTON SPARKLES
=========================================================*/

const button=document.querySelector(".start-btn");

if(button){

button.addEventListener("mouseenter",()=>{

for(let i=0;i<15;i++){

const sparkle=document.createElement("span");

sparkle.className="button-sparkle";

sparkle.style.left=Math.random()*100+"%";

sparkle.style.top=Math.random()*100+"%";

button.appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},1200);

}

});

}

/*=========================================================
            FPS COUNTER (DEV)
=========================================================*/

// Uncomment if needed

/*

let lastTime=performance.now();

let frames=0;

function fpsCounter(now){

frames++;

if(now-lastTime>=1000){

console.log("FPS:",frames);

frames=0;

lastTime=now;

}

requestAnimationFrame(fpsCounter);

}

requestAnimationFrame(fpsCounter);

*/

console.log("✨ Particle System Loaded");