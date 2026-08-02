const hero=document.querySelector(".hero");

for(let i=0;i<50;i++){

const p=document.createElement("span");

p.className="particle";

p.style.left=Math.random()*100+"%";

p.style.animationDelay=Math.random()*10+"s";

p.style.animationDuration=5+Math.random()*10+"s";

hero.appendChild(p);

}