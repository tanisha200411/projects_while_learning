/*=========================================================
                LOADER.JS
=========================================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";

        document.body.style.overflowY = "auto";

    }, 2200);

});

/*=========================================
        LOADER TEXT ANIMATION
=========================================*/

const loadingText = document.querySelector("#loader p");

const loadingMessages = [

    "Preparing Your Ship...",
    "Drawing The Grand Line...",
    "Loading Straw Hat Crew...",
    "Finding Devil Fruits...",
    "Setting Sail..."

];

let currentIndex = 0;

const loadingInterval = setInterval(() => {

    if (!loadingText) return;

    currentIndex++;

    if (currentIndex >= loadingMessages.length) {

        clearInterval(loadingInterval);

        return;

    }

    loadingText.style.opacity = "0";

    setTimeout(() => {

        loadingText.textContent = loadingMessages[currentIndex];

        loadingText.style.opacity = "1";

    }, 250);

}, 400);

/*=========================================
          LOADER SPIN
=========================================*/

const skull = document.querySelector(".skull");

if (skull) {

    setInterval(() => {

        skull.animate([

            {

                transform: "rotate(0deg)"

            },

            {

                transform: "rotate(360deg)"

            }

        ], {

            duration: 2500,

            iterations: 1,

            easing: "linear"

        });

    }, 2500);

}

/*=========================================
      LOADER PULSE
=========================================*/

const loaderTitle = document.querySelector("#loader h1");

if (loaderTitle) {

    setInterval(() => {

        loaderTitle.animate([

            {

                transform: "scale(1)"

            },

            {

                transform: "scale(1.08)"

            },

            {

                transform: "scale(1)"

            }

        ], {

            duration: 1200,

            easing: "ease-in-out"

        });

    }, 1400);

}

/*=========================================
      RANDOM LOADING QUOTES
=========================================*/

const quotes = [

    "The sea is calling...",
    "Adventure awaits...",
    "A new voyage begins...",
    "Treasure is near...",
    "Welcome aboard, Captain!"

];

function randomQuote() {

    const quote = document.createElement("div");

    quote.className = "loading-quote";

    quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

    quote.style.position = "absolute";
    quote.style.bottom = "40px";
    quote.style.width = "100%";
    quote.style.textAlign = "center";
    quote.style.color = "#ffffff";
    quote.style.opacity = ".7";
    quote.style.fontSize = "14px";
    quote.style.letterSpacing = "2px";

    const loader = document.getElementById("loader");

    if (loader && !document.querySelector(".loading-quote")) {

        loader.appendChild(quote);

    }

}

randomQuote();

console.log("☠ Loader Initialized");