/*=========================================================
  MAP.JS - Interactive Grand Line Route & Map Visualizer
=========================================================*/

let mapCanvas = null;
let mapCtx = null;
let mapIslands = [];
let routeStartIsland = null;
let routeDestIsland = null;

document.addEventListener('DOMContentLoaded', async () => {
  mapCanvas = document.getElementById('grandLineMapCanvas');
  if (!mapCanvas) return;
  mapCtx = mapCanvas.getContext('2d');

  initMapCanvas();
  
  try {
    const res = await fetch('../data/islands.json');
    if (res.ok) {
      mapIslands = await res.json();
    }
  } catch (e) {
    if (typeof fallbackIslandsData === 'function') {
      mapIslands = fallbackIslandsData();
    }
  }

  bindMapClickEvents();
  renderMap();
});

function initMapCanvas() {
  if (!mapCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = mapCanvas.parentElement.getBoundingClientRect();
  mapCanvas.width = (rect.width || 900) * dpr;
  mapCanvas.height = 500 * dpr;
  mapCanvas.style.width = `${rect.width || 900}px`;
  mapCanvas.style.height = '500px';
  mapCtx.scale(dpr, dpr);
}

function bindMapClickEvents() {
  if (!mapCanvas) return;

  mapCanvas.addEventListener('click', (e) => {
    const rect = mapCanvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (1400 / rect.width);
    const clickY = (e.clientY - rect.top) * (500 / rect.height);

    mapIslands.forEach(isl => {
      const dist = Math.hypot(isl.x - clickX, isl.y - clickY);
      if (dist < 22) {
        showIslandDetailsModal(isl);
      }
    });
  });
}

function drawGrandLineRoute(start, dest) {
  routeStartIsland = start;
  routeDestIsland = dest;
  renderMap();
}

function renderMap() {
  if (!mapCanvas || !mapCtx) return;
  const ctx = mapCtx;
  const width = 1400;
  const height = 500;

  ctx.clearRect(0, 0, width, height);

  // --- Ocean Background ---
  const seaGrad = ctx.createLinearGradient(0, 0, 0, height);
  seaGrad.addColorStop(0, '#001219');
  seaGrad.addColorStop(0.5, '#062033');
  seaGrad.addColorStop(1, '#000c14');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, 0, width, height);

  // --- Grid & Sea Waves ---
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // --- Red Line (Vertical Red Barrier) ---
  ctx.fillStyle = 'rgba(230, 57, 70, 0.4)';
  ctx.fillRect(70, 0, 30, height);
  ctx.fillRect(770, 0, 30, height);

  ctx.fillStyle = '#ff2a5f';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('RED LINE 1', 50, 20);
  ctx.fillText('RED LINE 2', 750, 20);

  // --- Calm Belts (Top and Bottom Hazards) ---
  ctx.fillStyle = 'rgba(252, 163, 17, 0.08)';
  ctx.fillRect(0, 0, width, 80);
  ctx.fillRect(0, 420, width, 80);
  ctx.fillStyle = 'rgba(252, 163, 17, 0.6)';
  ctx.font = '11px sans-serif';
  ctx.fillText('NORTH CALM BELT (SEA KINGS)', 200, 40);
  ctx.fillText('SOUTH CALM BELT (SEA KINGS)', 200, 460);

  // --- Grand Line Canal Route Lines ---
  ctx.beginPath();
  ctx.moveTo(80, 480);
  mapIslands.forEach(isl => {
    ctx.lineTo(isl.x, isl.y);
  });
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.stroke();
  ctx.setLineDash([]);

  // --- Plotted Trajectory Route Line (If Selected) ---
  if (routeStartIsland && routeDestIsland) {
    const sx = routeStartIsland.x;
    const sy = routeStartIsland.y;
    const dx = routeDestIsland.x;
    const dy = routeDestIsland.y;

    // Glowing Cyan Trajectory Line
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(dx, dy);
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Direction Vector Arrow in center of route
    const midX = (sx + dx) / 2;
    const midY = (sy + dy) / 2;
    const arrowAngle = Math.atan2(dy - sy, dx - sx);

    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(arrowAngle);
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(16, 0);
    ctx.lineTo(0, 8);
    ctx.fillStyle = '#fca311';
    ctx.fill();
    ctx.restore();
  }

  // --- Render Island Markers ---
  mapIslands.forEach(isl => {
    const isStart = routeStartIsland && routeStartIsland.id === isl.id;
    const isDest = routeDestIsland && routeDestIsland.id === isl.id;

    ctx.beginPath();
    ctx.arc(isl.x, isl.y, isStart || isDest ? 14 : 10, 0, Math.PI * 2);

    if (isStart) {
      ctx.fillStyle = '#ff2a5f';
    } else if (isDest) {
      ctx.fillStyle = '#00e5ff';
    } else {
      ctx.fillStyle = '#fca311';
    }
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Island Label
    ctx.fillStyle = isStart || isDest ? '#ffffff' : 'rgba(233, 236, 239, 0.85)';
    ctx.font = isStart || isDest ? 'bold 13px sans-serif' : '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isl.name.split(' ')[0], isl.x, isl.y - 16);
  });
}

function showIslandDetailsModal(isl) {
  const modal = document.createElement('div');
  modal.className = 'map-popup show';
  modal.innerHTML = `
    <div class="popup-content">
      <span class="close-popup" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <h2>${isl.icon || '🏝️'} ${isl.name}</h2>
      <p><strong>Sea Region:</strong> ${isl.sea || 'Grand Line'}</p>
      <p><strong>Climate:</strong> ${isl.climate}</p>
      <p><strong>Log Pose Lock Time:</strong> ${isl.lockTimeHours} hours</p>
      <p><strong>Danger Rating:</strong> ${'⭐'.repeat(isl.danger || 3)}</p>
      <p>${isl.description || ''}</p>
    </div>
  `;
  document.body.appendChild(modal);
}