/*=========================================================
                    CARDS.JS
=========================================================*/

const cards = document.querySelectorAll(".card");

/*=========================================
            3D TILT EFFECT
=========================================*/

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 15;
        const rotateX = (centerY - y) / 15;

        card.style.transition = "0.1s";

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-15px)
            scale(1.03)
        `;

    });

});

/*=========================================
            RESET CARD
=========================================*/

cards.forEach((card) => {

    card.addEventListener("mouseleave", () => {

        card.style.transition = "0.5s";

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
            scale(1)
        `;

    });

});

/*=========================================
        IMAGE PARALLAX
=========================================*/

cards.forEach((card) => {

    const image = card.querySelector("img");

    if (!image) return;

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 30;
        const moveY = (y - rect.height / 2) / 30;

        image.style.transform = `
            translate(${moveX}px, ${moveY}px)
            scale(1.08)
        `;

    });

    card.addEventListener("mouseleave", () => {

        image.style.transform = `
            translate(0,0)
            scale(1)
        `;

    });

});

/*=========================================
        GLOW FOLLOW CURSOR
=========================================*/

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(252,163,17,.22),
            rgba(255,255,255,.08) 45%,
            rgba(255,255,255,.05)
        )`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background =
        "rgba(255,255,255,.08)";

    });

});

/*=========================================
        CLICK ANIMATION
=========================================*/

cards.forEach((card) => {

    card.addEventListener("click", () => {

        card.animate([

            {

                transform: "scale(1)"

            },

            {

                transform: "scale(.96)"

            },

            {

                transform: "scale(1)"

            }

        ], {

            duration: 250

        });

    });

});

/*=========================================
      STAGGER ENTRANCE
=========================================*/

window.addEventListener("load", () => {

    cards.forEach((card, index) => {

        card.animate([

            {

                opacity: 0,

                transform: "translateY(70px)"

            },

            {

                opacity: 1,

                transform: "translateY(0)"

            }

        ], {

            duration: 700,

            delay: index * 120,

            easing: "ease-out",

            fill: "forwards"

        });

    });

});

/*=========================================
        FLOAT EFFECT
=========================================*/

cards.forEach((card, index) => {

    const duration = 4000 + index * 250;

    card.animate([

        {

            transform: "translateY(0px)"

        },

        {

            transform: "translateY(-8px)"

        },

        {

            transform: "translateY(0px)"

        }

    ], {

        duration: duration,

        iterations: Infinity,

        easing: "ease-in-out"

    });

});

console.log("🎴 Crew Cards Loaded");