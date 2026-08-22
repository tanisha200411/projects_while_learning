/*=========================================================
                    MAIN.JS
=========================================================*/

const startBtn = document.querySelector(".start-btn");
const charSection = document.querySelector(".characters");

if (startBtn && charSection) {
    startBtn.addEventListener("click", (e) => {
        if (startBtn.getAttribute('href') === '#characters') {
            e.preventDefault();
            window.scrollTo({
                top: charSection.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
}

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const x = e.offsetX / card.offsetWidth - 0.5;
        const y = e.offsetY / card.offsetHeight - 0.5;
        card.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
});