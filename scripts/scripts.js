const $gameInformation = document.querySelector("#game-information")
const $colorBoxContainer = document.querySelector("#color-box-container");
const $colorsBoxes = document.querySelectorAll(".color-box");
const $playButton = document.querySelector("#play-button");
const $roundNumber = document.querySelector("#round-number")
const $infoText = document.querySelector("#info-text");

let simonSequence = [];
let userSequence = [];
let round = simonSequence.length + 1;

$playButton.addEventListener("click", (e) => {
    e.preventDefault();
    hide($gameInformation);
    hide($playButton);
    reduceOpacity($colorsBoxes);
    $roundNumber.innerText = `${round}`;
    handleRound();
})

function handleRound(){
    const TIME_IN_MILLISECONDS = 1000;
    $infoText.innerText = "Simon is playing - take a good look!";

    for (let i = 0; i < round; i++) {
        const AI_DELAY_IN_MILLISECONDS = i * TIME_IN_MILLISECONDS;
        const TIME_TURN_ON_SIMON = 500;

        setTimeout(() => {
            const newPad = generatePadsRandom();
            simonSequence.push(newPad);
            turnOnColor(simonSequence[i], TIME_TURN_ON_SIMON);
            turnOffColor(simonSequence[i], TIME_IN_MILLISECONDS);
        }, AI_DELAY_IN_MILLISECONDS);
    }

    const USER_DELAY_IN_MILLISECONDS = round + TIME_IN_MILLISECONDS;
    setTimeout(() => {
        $infoText.innerText = "It's your turn. Give me your best!";
        handleUserClick()
    }, USER_DELAY_IN_MILLISECONDS);
}

function handleUserClick(){
    $colorBoxContainer.addEventListener("click", (e) => {
        e.stopPropagation();
        const userTarget = e.target;
        userSequence.push(userTarget);

        const TIME_TURN_ON_USER = 0;
        const TIME_TURN_OFF_USER = 500;
        turnOnColor(userTarget, TIME_TURN_ON_USER);
        turnOffColor(userTarget, TIME_TURN_OFF_USER);

        for (let i = 0; i < simonSequence.length; i++) {
            if (userSequence[i] !== simonSequence[i]) {
                loseGame();
                $infoText.innerText = "You lost. Better luck next time!";
                return;
            } else {
                $infoText.innerText = "Well Done!";
                userSequence = [];
                round++
            }
        }
    });
}

function generatePadsRandom(){
    const colorsBoxes = document.querySelectorAll(".color-box");
    const index = Math.floor(Math.random() * colorsBoxes.length);
    return colorsBoxes[index];
}

function turnOnColor(colorBox, timeInMilliseconds) {
    setTimeout(() => {
        fillColor(colorBox);
    }, timeInMilliseconds)
}

function turnOffColor(colorBox, timeInMilliseconds) {
    setTimeout(() => {
        resetColor(colorBox);
    }, timeInMilliseconds)
}

function fillColor(colorBox) {
    colorBox.classList.add("full-color");
}

function resetColor(colorBox) {
    colorBox.classList.remove("full-color");
}

function reduceOpacity(elements) {
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.add("medium-opacity");
    }
}

function hide(element){
    element.classList.add("hidden")
}

function show(element){
    element.classList.remove("hidden")
}

function loseGame() {
    simonSequence = [];
    userSequence = [];
    round = simonSequence.length + 1;
}
