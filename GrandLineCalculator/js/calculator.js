/*=========================================================
  CALCULATOR.JS - Grand Line Navigation & Voyage Calculator
=========================================================*/

let islandsDataGlobal = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('../data/islands.json');
    if (response.ok) {
      islandsDataGlobal = await response.json();
    } else {
      islandsDataGlobal = fallbackIslandsData();
    }
  } catch (e) {
    islandsDataGlobal = fallbackIslandsData();
  }

  populateSelectOptions();
  bindCalculatorForm();
});

function fallbackIslandsData() {
  return [
    { id: "reverse_mountain", name: "Reverse Mountain", x: 80, y: 480, lockTimeHours: 0, danger: 4, climate: "Stormy Canal" },
    { id: "cactus_island", name: "Cactus Island (Whisky Peak)", x: 160, y: 420, lockTimeHours: 12, danger: 3, climate: "Arid" },
    { id: "little_garden", name: "Little Garden", x: 230, y: 450, lockTimeHours: 8760, danger: 5, climate: "Prehistoric" },
    { id: "drum_island", name: "Drum Island", x: 300, y: 380, lockTimeHours: 38, danger: 4, climate: "Winter" },
    { id: "alabasta", name: "Alabasta Kingdom", x: 380, y: 440, lockTimeHours: 120, danger: 4, climate: "Desert" },
    { id: "jaya", name: "Jaya Island", x: 450, y: 390, lockTimeHours: 96, danger: 4, climate: "Tropical" },
    { id: "skypiea", name: "Skypiea", x: 450, y: 200, lockTimeHours: 168, danger: 5, climate: "Sky Clouds" },
    { id: "water_7", name: "Water 7", x: 600, y: 400, lockTimeHours: 168, danger: 3, climate: "Maritime" },
    { id: "sabaody", name: "Sabaody Archipelago", x: 780, y: 420, lockTimeHours: 0, danger: 5, climate: "Mangrove" },
    { id: "fishman_island", name: "Fish-Man Island", x: 780, y: 600, lockTimeHours: 120, danger: 4, climate: "Undersea" },
    { id: "dressrosa", name: "Dressrosa Kingdom", x: 940, y: 380, lockTimeHours: 96, danger: 5, climate: "Mediterranean" },
    { id: "wano", name: "Wano Country", x: 1160, y: 330, lockTimeHours: 336, danger: 5, climate: "Imperial" },
    { id: "egghead", name: "Egghead Island", x: 1240, y: 390, lockTimeHours: 72, danger: 5, climate: "Futuristic" },
    { id: "laughtale", name: "Laugh Tale (Raftel)", x: 1340, y: 360, lockTimeHours: 0, danger: 5, climate: "Legendary" }
  ];
}

function populateSelectOptions() {
  const startSelect = document.getElementById('startIsland');
  const destSelect = document.getElementById('destIsland');

  if (!startSelect || !destSelect) return;

  startSelect.innerHTML = '';
  destSelect.innerHTML = '';

  islandsDataGlobal.forEach((isl, index) => {
    const opt1 = document.createElement('option');
    opt1.value = isl.id;
    opt1.textContent = `${isl.name} (${isl.climate})`;
    
    const opt2 = document.createElement('option');
    opt2.value = isl.id;
    opt2.textContent = `${isl.name} (${isl.climate})`;

    startSelect.appendChild(opt1);
    destSelect.appendChild(opt2);
  });

  // Set defaults: Reverse Mountain -> Water 7
  if (startSelect.options.length > 0) startSelect.selectedIndex = 0;
  if (destSelect.options.length > 7) destSelect.selectedIndex = 7;
}

function bindCalculatorForm() {
  const calcBtn = document.getElementById('calculateVoyageBtn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateVoyage();
  });
}

function calculateVoyage() {
  const startId = document.getElementById('startIsland').value;
  const destId = document.getElementById('destIsland').value;
  const shipType = document.getElementById('shipType').value;
  const weatherCond = document.getElementById('weatherCond').value;
  const crewSize = parseInt(document.getElementById('crewCount').value) || 9;
  const navSkill = document.getElementById('navSkill').value;

  const start = islandsDataGlobal.find(i => i.id === startId);
  const dest = islandsDataGlobal.find(i => i.id === destId);

  if (!start || !dest) return;

  if (startId === destId) {
    alert("Please select different origin and destination islands!");
    return;
  }

  // 1. Calculate Grid Distance & Bearing
  const dx = dest.x - start.x;
  const dy = dest.y - start.y;

  // Euclidean distance scaled to Nautical Miles (NM)
  const distanceNM = Math.round(Math.sqrt(dx * dx + dy * dy) * 8.5);
  const distanceLeagues = Math.round(distanceNM / 3);

  // Bearing Angle (0° = North, 90° = East, 180° = South, 270° = West)
  const rad = Math.atan2(dy, dx);
  let deg = Math.round((rad * 180 / Math.PI + 90 + 360) % 360);
  
  // 2. Ship Speeds & Weather Multipliers
  let speedKnots = 15;
  if (shipType === 'merry') speedKnots = 11;
  if (shipType === 'sunny') speedKnots = 19;
  if (shipType === 'oro') speedKnots = 24;
  if (shipType === 'polar') speedKnots = 16;
  if (shipType === 'marine') speedKnots = 15;

  let weatherMod = 1.0;
  if (weatherCond === 'calm_belt') weatherMod = 2.4;
  if (weatherCond === 'aqua_laguna') weatherMod = 1.7;
  if (weatherCond === 'knock_up') weatherMod = 0.4;
  if (weatherCond === 'heavy_fog') weatherMod = 1.3;

  let navMod = 1.0;
  if (navSkill === 'nami') navMod = 0.7;
  if (navSkill === 'beginner') navMod = 1.4;

  // Travel Days calculation
  const hours = (distanceNM / speedKnots) * weatherMod * navMod;
  const days = Math.max(1, Math.round(hours / 24));

  // 3. Rations & Resource calculation
  const meatKg = days * crewSize * 8;
  const waterL = days * crewSize * 5;
  const colaBarrels = shipType === 'sunny' ? Math.ceil(days / 3) * 3 : 0;
  const costBerries = (days * crewSize * 18000 + distanceNM * 500).toLocaleString();

  // 4. Log Pose Lock Time formatting
  let lockStr = "Instant";
  if (dest.lockTimeHours > 0) {
    if (dest.lockTimeHours >= 8760) {
      lockStr = `${(dest.lockTimeHours / 8760).toFixed(1)} Year(s)`;
    } else if (dest.lockTimeHours >= 24) {
      lockStr = `${Math.round(dest.lockTimeHours / 24)} Day(s)`;
    } else {
      lockStr = `${dest.lockTimeHours} Hour(s)`;
    }
  }

  // 5. Update Results UI
  document.getElementById('resDistance').innerText = `${distanceNM} NM`;
  document.getElementById('resLeagues').innerText = `${distanceLeagues} Leagues`;
  document.getElementById('resDays').innerText = `${days} Days`;
  document.getElementById('resMeat').innerText = `${meatKg} kg`;
  document.getElementById('resWater').innerText = `${waterL} L`;
  document.getElementById('resBerries').innerText = `฿ ${costBerries}`;
  document.getElementById('resLockTime').innerText = lockStr;

  const cardinal = getCardinalDirection(deg);
  document.getElementById('resVectorText').innerText = `${cardinal} (${deg}°)`;

  const resultsCard = document.getElementById('voyageResults');
  if (resultsCard) resultsCard.classList.add('active');

  // 6. Update Log Pose Compass Target & Route Map Canvas
  if (typeof grandLogPose !== 'undefined' && grandLogPose) {
    grandLogPose.setTargetBearing(deg);
  }

  if (typeof drawGrandLineRoute === 'function') {
    drawGrandLineRoute(start, dest);
  }

  if (typeof sfx !== 'undefined') sfx.playShipBell();
}

function getCardinalDirection(angle) {
  const directions = ['NORTH (N)', 'NORTH-EAST (NE)', 'EAST (E)', 'SOUTH-EAST (SE)', 'SOUTH (S)', 'SOUTH-WEST (SW)', 'WEST (W)', 'NORTH-WEST (NW)'];
  const index = Math.round((angle % 360) / 45) % 8;
  return directions[index];
}
