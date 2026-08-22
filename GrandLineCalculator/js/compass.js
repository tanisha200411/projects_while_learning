/*=========================================================
      COMPASS.JS - Interactive 3D Log Pose Canvas Engine
=========================================================*/

class LogPoseCompass {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.currentAngle = 0; // Current rendered angle (degrees)
    this.targetAngle = 0;  // Target bearing (degrees)
    this.needleWobble = 0; // Physics wobble offset
    this.isLocked = false;
    this.helmAngle = 0;    // Manual steering wheel angle

    this.isDragging = false;
    this.lastMouseX = 0;

    this.initCanvas();
    this.bindEvents();
    this.animate();
  }

  initCanvas() {
    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    this.size = Math.min(window.innerWidth - 60, 360);
    this.canvas.width = this.size * dpr;
    this.canvas.height = this.size * dpr;
    this.canvas.style.width = `${this.size}px`;
    this.canvas.style.height = `${this.size}px`;
    this.ctx.scale(dpr, dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvas());

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastMouseX;
        this.helmAngle = (this.helmAngle + deltaX * 0.5) % 360;
        this.lastMouseX = e.clientX;
        this.updateReadouts();
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  setTargetBearing(angleDegrees) {
    this.targetAngle = (angleDegrees + 360) % 360;
    this.isLocked = true;
    if (typeof sfx !== 'undefined') sfx.playLock();
  }

  rotateHelm(delta) {
    this.helmAngle = (this.helmAngle + delta + 360) % 360;
    this.updateReadouts();
  }

  getHeadingDirection(angle) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(((angle % 360) / 22.5)) % 16;
    return directions[(index + 16) % 16];
  }

  updateReadouts() {
    const bearingElem = document.getElementById('bearingReadout');
    const cardinalElem = document.getElementById('cardinalReadout');
    const lockElem = document.getElementById('lockReadout');

    const totalAngle = (this.targetAngle + this.helmAngle + 360) % 360;
    
    if (bearingElem) bearingElem.innerText = `${Math.round(totalAngle)}°`;
    if (cardinalElem) cardinalElem.innerText = this.getHeadingDirection(totalAngle);
    if (lockElem) lockElem.innerText = this.isLocked ? "LOCKED 🔒" : "SCANNING 🌐";
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Interpolate compass angle smoothly with wobble
    const diff = (this.targetAngle - this.currentAngle + 540) % 360 - 180;
    this.currentAngle += diff * 0.08;
    this.needleWobble = Math.sin(Date.now() * 0.005) * (this.isLocked ? 1.5 : 5.0);

    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const center = this.size / 2;
    const radius = center - 15;

    ctx.clearRect(0, 0, this.size, this.size);

    ctx.save();
    ctx.translate(center, center);

    // --- Outer Steering Helm / Brass Ring ---
    ctx.rotate((this.helmAngle * Math.PI) / 180);

    // Helm Outer Glow
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(252, 163, 17, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Brass Bezel Gradient
    const brassGrad = ctx.createRadialGradient(0, 0, radius - 15, 0, 0, radius + 5);
    brassGrad.addColorStop(0, '#14213d');
    brassGrad.addColorStop(0.7, '#fca311');
    brassGrad.addColorStop(1, '#8c5000');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = brassGrad;
    ctx.fill();
    ctx.strokeStyle = '#fca311';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Helm Spokes (Ship Wheel handles)
    for (let i = 0; i < 8; i++) {
      const spokeAngle = (i * Math.PI) / 4;
      const x1 = Math.cos(spokeAngle) * radius;
      const y1 = Math.sin(spokeAngle) * radius;
      const x2 = Math.cos(spokeAngle) * (radius + 12);
      const y2 = Math.sin(spokeAngle) * (radius + 12);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#fca311';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Handle Knobs
      ctx.beginPath();
      ctx.arc(x2, y2, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ff2a5f';
      ctx.fill();
    }

    // --- Inner Dial Face ---
    ctx.beginPath();
    ctx.arc(0, 0, radius - 15, 0, Math.PI * 2);
    ctx.fillStyle = '#001219';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cardinal Points (N, E, S, W)
    const points = [
      { text: 'N', color: '#ff2a5f', angle: 0 },
      { text: 'E', color: '#00e5ff', angle: 90 },
      { text: 'S', color: '#fca311', angle: 180 },
      { text: 'W', color: '#00e5ff', angle: 270 }
    ];

    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    points.forEach(pt => {
      const rad = ((pt.angle - 90) * Math.PI) / 180;
      const px = Math.cos(rad) * (radius - 32);
      const py = Math.sin(rad) * (radius - 32);
      ctx.fillStyle = pt.color;
      ctx.fillText(pt.text, px, py);
    });

    // Degree Ticks
    for (let deg = 0; deg < 360; deg += 15) {
      const rad = ((deg - 90) * Math.PI) / 180;
      const isMajor = deg % 45 === 0;
      const innerR = radius - (isMajor ? 24 : 20);
      const outerR = radius - 16;

      ctx.beginPath();
      ctx.moveTo(Math.cos(rad) * innerR, Math.sin(rad) * innerR);
      ctx.lineTo(Math.cos(rad) * outerR, Math.sin(rad) * outerR);
      ctx.strokeStyle = isMajor ? '#fca311' : 'rgba(255,255,255,0.3)';
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.stroke();
    }

    ctx.restore(); // Restore helm rotation

    // --- Dynamic Needle (Log Pose Magnetic Pointer) ---
    ctx.save();
    ctx.translate(center, center);

    const activeNeedleAngle = ((this.currentAngle + this.needleWobble - 90) * Math.PI) / 180;
    ctx.rotate(activeNeedleAngle);

    // North Needle (Cyan Glowing Red Spear)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-7, -15);
    ctx.lineTo(0, -(radius - 30));
    ctx.lineTo(7, -15);
    ctx.closePath();
    const northGrad = ctx.createLinearGradient(0, 0, 0, -(radius - 30));
    northGrad.addColorStop(0, '#ff2a5f');
    northGrad.addColorStop(1, '#ff758f');
    ctx.fillStyle = northGrad;
    ctx.fill();
    ctx.shadowColor = '#ff2a5f';
    ctx.shadowBlur = 12;

    // South Needle (Gold Spear)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-7, 15);
    ctx.lineTo(0, radius - 30);
    ctx.lineTo(7, 15);
    ctx.closePath();
    ctx.fillStyle = '#fca311';
    ctx.fill();

    // Central Glass Sphere Pivot
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    const glassGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 14);
    glassGrad.addColorStop(0, '#ffffff');
    glassGrad.addColorStop(0.5, '#00e5ff');
    glassGrad.addColorStop(1, '#001219');
    ctx.fillStyle = glassGrad;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }
}

let grandLogPose = null;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('compassCanvas')) {
    grandLogPose = new LogPoseCompass('compassCanvas');
  }
});
