const btn = document.querySelector(".start-btn");

btn.addEventListener("click", () => {

    window.scrollTo({

        top: document.querySelector(".characters").offsetTop,

        behavior: "smooth"

    });

});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const x = e.offsetX / card.offsetWidth - 0.5;
        const y = e.offsetY / card.offsetHeight - 0.5;

        card.style.transform =
            `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "rotateX(0deg) rotateY(0deg)";

    });

});