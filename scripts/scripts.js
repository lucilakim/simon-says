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
let simonSequence = [];
let userSequence = [];
let round = simonSequence.length + 1;

$playButton.addEventListener("click", (e) => {
    e.preventDefault();
    $playButton.disabled = true;
        simonPlays(round);
        userPlays(round)
})

$stopButton.addEventListener("click", () => {
    location.reload();
})


function userPlays(round) {
    const TIME_IN_MILISECOND = round + 1300;
    setTimeout(() => {
        changeInfoBoxColor("bg-primary", "bg-success");
        $infoText.innerText = "Your Turn";

        $boxContainer.addEventListener("click", (e) => {
            e.stopPropagation();
            const userTarget = e.target;

            userSequence.push(userTarget);
            for (let i = 0; i < simonSequence.length; i++) {
                if (userSequence[i] !== simonSequence[i]) {
                    loseGame();
                    $infoText.innerText = "You Lose, Try Again";
                    return;
                } else {
                    console.log("Well done")
                    userSequence = [];
                    round++
                }
            }
        });
    }, TIME_IN_MILISECOND);
}

function loseGame() {
    changeInfoBoxColor("bg-success", "bg-danger");
    enablePlayButton();
    simonSequence = [];
    userSequence = [];
    round = simonSequence.length + 1;
}

function simonPlays(round) {
    const TIME_IN_MILISECOND = 1000;
    const SIMON_PLAY_TIME = round * TIME_IN_MILISECOND;

    const $infoBoxColor = getColorInfoBox($infoBox);
    changeInfoBoxColor($infoBoxColor, "bg-primary");
    $infoText.innerText = "Simon Turn";

    simonTurnOnBoxes(round);
    enablePlayButton(SIMON_PLAY_TIME);
}

function getColorInfoBox(box){
    if(box.classList.contains("bg-info")){
        return "bg-info";
    } else if(box.classList.contains("bg-success")) {
        return "bg-success";
    } else if(box.classList.contains("bg-danger")){
        return "bg-danger";
    }
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
    const TIME_IN_MILISECOND = 500;
    setTimeout(() => {
        fillColor(colorsBox);
    }, TIME_IN_MILISECOND)
}

function turnOffColor(colorsBox) {
    const TIME_IN_MILISECOND = 100;
    setTimeout(() => {
        resetColor(colorsBox);
    }, TIME_IN_MILISECOND)
}

function enablePlayButton(timeToEnable) {
    setTimeout(() => {
        $playButton.disabled = false;
    }, timeToEnable);
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

