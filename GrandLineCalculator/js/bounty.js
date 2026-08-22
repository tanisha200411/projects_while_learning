/*=========================================================
  BOUNTY.JS - Wanted Poster 3D Flip & Search Filter
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("bountySearchInput");
  const searchBtn = document.getElementById("bountySearchBtn");
  const grid = document.getElementById("bountyGrid");

  if (searchInput) {
    searchInput.addEventListener("input", filterPosters);
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", filterPosters);
  }

  function filterPosters() {
    const query = (searchInput ? searchInput.value : "").toLowerCase();
    const posters = document.querySelectorAll(".poster");

    posters.forEach((p) => {
      const name = p.getAttribute("data-name") || p.innerText;
      if (name.toLowerCase().includes(query)) {
        p.style.display = "block";
      } else {
        p.style.display = "none";
      }
    });
  }
});