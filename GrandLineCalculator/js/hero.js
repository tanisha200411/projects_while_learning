/*=========================================================
  HERO.JS - Hero Parallax & Ocean Wave Effects
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const sun = hero.querySelector(".sun");
  const compass = hero.querySelector(".compass");
  const cloud1 = hero.querySelector(".cloud1");
  const cloud2 = hero.querySelector(".cloud2");

  hero.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (clientX - centerX) / 40;
    const moveY = (clientY - centerY) / 40;

    if (sun) sun.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    if (compass) compass.style.transform = `translate(${moveX * -0.8}px, ${moveY * -0.8}px) rotate(${moveX * 2}deg)`;
    if (cloud1) cloud1.style.transform = `translateX(${moveX * 1.2}px)`;
    if (cloud2) cloud2.style.transform = `translateX(${moveX * -1.2}px)`;
  });
});
