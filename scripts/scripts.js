const $boxContainer = document.querySelector("#box-container");
const $greenBox = document.querySelector("#green-box");
const $redBox = document.querySelector("#red-box");
const $yellowBox = document.querySelector("#yellow-box");
const $bluenBox = document.querySelector("#blue-box");
const $playButton = document.querySelector("#play-button");
const $stopButton = document.querySelector("#stop-button")
const $infoBox = document.querySelector("#info-box");
const $infoText = document.querySelector("#info-text");

const colorsBox = [$greenBox, $redBox, $yellowBox, $bluenBox];
const simonSequence = [];
const userSequence = [];
let round = simonSequence.length + 1;

$playButton.addEventListener("click", (e) => {
    e.preventDefault();
    $playButton.disabled = true;
    simonPlays(round);
})

$stopButton.addEventListener("click", () => {
    location.reload();
})

$boxContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    const userTarget = e.target;
    userSequence.push(userTarget);
    for (let i = 0; i < simonSequence.length; i++) {
        if (userSequence[i] !== simonSequence[i]) {
            return;
        }
    }
});

function simonPlays(round) {
    const TIME_IN_MILISECOND = 1000;
    const SIMON_PLAY_TIME = round * TIME_IN_MILISECOND;

    changeInfoBoxColor("bg-info", "bg-primary");
    $infoText.innerText = "Simon Turn";

    simonTurnOnBoxes(round);
    enablePlayButton(SIMON_PLAY_TIME);
    increaseRound(SIMON_PLAY_TIME);
}

function changeInfoBoxColor(previousColor, newColor) {
    $infoBox.classList.remove(previousColor);
    $infoBox.classList.add(newColor);
}

function simonTurnOnBoxes(round) {
    for (let i = 0; i < round; i++) {
        const TIME_IN_MILISECOND = 1000;
        const DELAY_IN_MILLISECONDS = i * TIME_IN_MILISECOND;

        setTimeout(() => {
            const colorsBox = selectColor();
            simonSequence.push(colorsBox);
            turnOnColor(colorsBox);
            turnOffColor(colorsBox);
        }, DELAY_IN_MILLISECONDS);
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

function enablePlayButton(timeToEnable) {
    setTimeout(() => {
        $playButton.disabled = false;
    }, timeToEnable);
}

function increaseRound(timeToIncrease) {
    setTimeout(() => {
        round++
    }, timeToIncrease);
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

