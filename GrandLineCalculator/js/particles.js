/*=========================================================
  PARTICLES.JS - Canvas Ocean Currents & Sparkles
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.id = "particlesCanvas";
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  hero.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let particles = [];

  const resizeCanvas = () => {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * -0.8 - 0.2;
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
        this.reset();
        this.y = canvas.height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  };

  animate();
});