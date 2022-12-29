const $greenBox = document.querySelector("#green-box");
const $redBox = document.querySelector("#red-box");
const $yellowBox = document.querySelector("#yellow-box");
const $bluenBox = document.querySelector("#blue-box");
const $playButton = document.querySelector("#play-button");
const $stopButton = document.querySelector("#stop-button")
const $infoBox = document.querySelector("#info-box");
const $infoText = document.querySelector("#info-text");

const colorsBox = [$greenBox, $redBox, $yellowBox, $bluenBox];
let round = 5;
const simonSequence = [];
const userSequence = [];

$playButton.addEventListener("click", (e) => {
    e.preventDefault();
    $playButton.disabled = true;
    simonPlays(round);
})

$stopButton.addEventListener("click", () => {
    location.reload();
})

function simonPlays(round) {
    $infoBox.classList.remove("bg-info");
    $infoBox.classList.add("bg-primary");
    $infoText.innerText = "Simon Turn";

    for (let i = 0; i < round; i++) {
        const TIME_IN_MILISECOND = 1000;
        const DELAY_IN_MILLISECONDS = i * TIME_IN_MILISECOND;

        setTimeout(() => {
            const colorsBox = selectColor();
            turnOnColor(colorsBox);
            turnOffColor(colorsBox);
        }, DELAY_IN_MILLISECONDS);

        const SIMON_PLAY_TIME = round * TIME_IN_MILISECOND;

        setTimeout(() => {
            $playButton.disabled = false;
        }, SIMON_PLAY_TIME);
    }
}

function turnOnColor(colorsBox) {
    setTimeout(() => {
        fillColor(colorsBox);
    }, 500)
}
function turnOffColor(colorsBox) {
    setTimeout(() => {
        resetColor(colorsBox);
    }, 1000)
}

function selectColor() {
    const index = Math.floor(Math.random() * 4);
    return colorsBox[index];
}

function fillColor(colorBox) {
    colorBox.classList.add("full-color");
}

function resetColor(colorBox) {
    colorBox.classList.remove("full-color");
}

