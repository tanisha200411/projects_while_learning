/*==================================================
  LOADER.JS
==================================================*/

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
    loader.classList.add("loader-hide");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}

window.addEventListener("DOMContentLoaded", hideLoader);
window.addEventListener("load", hideLoader);

// Fallback safety timeout in case load event fires early or late
setTimeout(hideLoader, 300);