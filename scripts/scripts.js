const $greenBox = document.querySelector("#green-box");
const $redBox = document.querySelector("#red-box");
const $yellowBox = document.querySelector("#yellow-box");
const $bluenBox = document.querySelector("#blue-box");
const $playButton = document.querySelector("#play-button");

const colorsBox = [$greenBox, $redBox, $yellowBox, $bluenBox];
let round = 1;
const simonSequence = [];
const userSequence = [];

$playButton.onclick = (e) => {
    e.preventDefault();
    const colorsBox = selectColor();

    turnOnColor(colorsBox);
    turnOffColor(colorsBox);
}

function turnOnColor(colorsBox) {
    setTimeout(()=> {  
        fillColor(colorsBox);
    },500)
}
function turnOffColor(colorsBox){
    setTimeout(()=> {
        resetColor(colorsBox);
    }, 1000)
}

function selectColor(){
    const index = Math.floor(Math.random() * 4);
    return colorsBox[index];
}

function fillColor(colorBox) {
    colorBox.classList.add("full-color");
}

function resetColor(colorBox) {
    colorBox.classList.remove("full-color");
}

