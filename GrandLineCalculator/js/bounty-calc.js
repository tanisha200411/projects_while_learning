/*=========================================================
  BOUNTY-CALC.JS - Crew Bounty & Marine Threat Calculator
=========================================================*/

document.addEventListener('DOMContentLoaded', () => {
  initBountyCalculator();
  initWantedPosterGenerator();
});

function initBountyCalculator() {
  const calcBtn = document.getElementById('calcBountyBtn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    calculateCrewBounty();
  });
}

function calculateCrewBounty() {
  const luffy = document.getElementById('chkLuffy')?.checked ? 3000000000 : 0;
  const zoro = document.getElementById('chkZoro')?.checked ? 1111000000 : 0;
  const nami = document.getElementById('chkNami')?.checked ? 366000000 : 0;
  const usopp = document.getElementById('chkUsopp')?.checked ? 500000000 : 0;
  const sanji = document.getElementById('chkSanji')?.checked ? 1032000000 : 0;
  const chopper = document.getElementById('chkChopper')?.checked ? 1000 : 0;
  const robin = document.getElementById('chkRobin')?.checked ? 930000000 : 0;
  const franky = document.getElementById('chkFranky')?.checked ? 394000000 : 0;
  const brook = document.getElementById('chkBrook')?.checked ? 383000000 : 0;
  const jinbe = document.getElementById('chkJinbe')?.checked ? 1100000000 : 0;

  const baseBounty = luffy + zoro + nami + usopp + sanji + chopper + robin + franky + brook + jinbe;

  const hakiLevel = parseFloat(document.getElementById('hakiMultiplier')?.value || 1.0);
  const fruitCount = parseInt(document.getElementById('fruitCount')?.value || 0);

  const totalBounty = Math.round((baseBounty * hakiLevel) + (fruitCount * 500000000));
  const count = [luffy, zoro, nami, usopp, sanji, chopper, robin, franky, brook, jinbe].filter(b => b > 0).length;

  let threatRank = 'D Rank';
  let admiralRisk = '5%';
  if (totalBounty > 1000000000) { threatRank = 'B Rank (Worst Generation)'; admiralRisk = '35%'; }
  if (totalBounty > 3000000000) { threatRank = 'A Rank (Warlord Level)'; admiralRisk = '65%'; }
  if (totalBounty > 8000000000) { threatRank = 'SS Rank (Emperor of the Sea)'; admiralRisk = '98%'; }

  const resElem = document.getElementById('totalBountyVal');
  const rankElem = document.getElementById('threatRankVal');
  const riskElem = document.getElementById('admiralRiskVal');

  if (resElem) resElem.innerText = `฿ ${totalBounty.toLocaleString()}`;
  if (rankElem) rankElem.innerText = threatRank;
  if (riskElem) riskElem.innerText = admiralRisk;

  const resContainer = document.getElementById('bountyResults');
  if (resContainer) resContainer.style.display = 'block';

  if (typeof sfx !== 'undefined') sfx.playLock();
}

function initWantedPosterGenerator() {
  const generateBtn = document.getElementById('generatePosterBtn');
  if (!generateBtn) return;

  generateBtn.addEventListener('click', () => {
    const pirateName = document.getElementById('posterName')?.value || 'MONKEY D. LUFFY';
    const posterBounty = parseInt(document.getElementById('posterBountyVal')?.value) || 3000000000;
    const condition = document.getElementById('posterCondition')?.value || 'DEAD OR ALIVE';

    const displayName = document.getElementById('displayPosterName');
    const displayBounty = document.getElementById('displayPosterBounty');
    const displayCond = document.getElementById('displayPosterCondition');

    if (displayName) displayName.innerText = pirateName.toUpperCase();
    if (displayBounty) displayBounty.innerText = `฿ ${posterBounty.toLocaleString()}-`;
    if (displayCond) displayCond.innerText = condition;

    if (typeof sfx !== 'undefined') sfx.playClick();
  });
}
