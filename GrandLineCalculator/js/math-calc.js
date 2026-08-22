/*=========================================================
  MATH-CALC.JS - Pirate Ship Mathematical & Scientific Calculator
=========================================================*/

class MathCalculator {
  constructor() {
    this.expression = "";
    this.result = "0";
    this.history = [];
    this.initUI();
    this.bindEvents();
  }

  initUI() {
    this.exprDisplay = document.getElementById("mathExprDisplay");
    this.resDisplay = document.getElementById("mathResDisplay");
    this.historyList = document.getElementById("mathHistoryList");
  }

  bindEvents() {
    // Physical Keyboard Support
    window.addEventListener("keydown", (e) => {
      // Only capture if active element is not a text input field
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') this.appendChar(e.key);
      else if (e.key === '.') this.appendChar('.');
      else if (e.key === '+') this.appendChar('+');
      else if (e.key === '-') this.appendChar('-');
      else if (e.key === '*') this.appendChar('×');
      else if (e.key === '/') { e.preventDefault(); this.appendChar('÷'); }
      else if (e.key === '(' || e.key === ')') this.appendChar(e.key);
      else if (e.key === '%') this.appendChar('%');
      else if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); this.calculate(); }
      else if (e.key === 'Backspace') { e.preventDefault(); this.deleteChar(); }
      else if (e.key === 'Escape') { this.clearAll(); }
    });
  }

  appendChar(char) {
    if (this.expression === "Error") this.expression = "";
    this.expression += char;
    this.updateDisplay();
    if (typeof sfx !== 'undefined') sfx.playClick();
  }

  appendMultiplier(multiplier) {
    if (multiplier === 'M') this.expression += "*1000000";
    if (multiplier === 'B') this.expression += "*1000000000";
    this.updateDisplay();
    if (typeof sfx !== 'undefined') sfx.playClick();
  }

  appendFunction(func) {
    if (this.expression === "Error") this.expression = "";
    if (func === 'sqrt') this.expression += "sqrt(";
    else if (func === 'sq') this.expression += "^2";
    else this.expression += `${func}(`;
    this.updateDisplay();
    if (typeof sfx !== 'undefined') sfx.playClick();
  }

  deleteChar() {
    if (this.expression.length > 0) {
      this.expression = this.expression.slice(0, -1);
      this.updateDisplay();
    }
    if (typeof sfx !== 'undefined') sfx.playClick();
  }

  clearAll() {
    this.expression = "";
    this.result = "0";
    this.updateDisplay();
    if (typeof sfx !== 'undefined') sfx.playClick();
  }

  updateDisplay() {
    if (this.exprDisplay) this.exprDisplay.innerText = this.expression || "0";
    if (this.resDisplay) this.resDisplay.innerText = this.result;
  }

  calculate() {
    if (!this.expression) return;

    try {
      let evalExpr = this.expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^2/g, '**2')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/π/g, 'Math.PI')
        .replace(/%/g, '*0.01');

      // Evaluate mathematically
      const rawRes = eval(evalExpr);
      if (isNaN(rawRes) || !isFinite(rawRes)) {
        throw new Error("Invalid");
      }

      this.result = Number.isInteger(rawRes) ? rawRes.toLocaleString() : rawRes.toFixed(4);

      // Save to History
      const historyItem = `${this.expression} = ${this.result}`;
      this.history.unshift(historyItem);
      if (this.history.length > 10) this.history.pop();
      this.renderHistory();

      if (typeof sfx !== 'undefined') sfx.playLock();
    } catch (e) {
      this.result = "Error";
    }

    this.updateDisplay();
  }

  renderHistory() {
    if (!this.historyList) return;
    this.historyList.innerHTML = "";
    this.history.forEach(item => {
      const li = document.createElement("li");
      li.style.padding = "6px 10px";
      li.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
      li.style.cursor = "pointer";
      li.style.fontSize = "0.85rem";
      li.style.color = "#00e5ff";
      li.innerText = item;
      li.onclick = () => {
        const val = item.split("=")[1].trim().replace(/,/g, '');
        this.expression += val;
        this.updateDisplay();
      };
      this.historyList.appendChild(li);
    });
  }
}

let pirateMathCalc = null;
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("mathResDisplay")) {
    pirateMathCalc = new MathCalculator();
  }
});
