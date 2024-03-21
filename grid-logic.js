const etchDisplay = document.querySelector("#etch-display");

let gridSize = 16;
let squareSize = 0;
let primaryColor = "#000000";
let brushType = "shade";

function generateGrid(size) {

    squareSize = 640 / gridSize

    for (let y= 0; y < size; y++) {
        for (let x = 0; x< size; x++) {
            const gridSquare = document.createElement("div");
            
            gridSquare.id = "A" + (x + 1) + "_" + (y + 1);

        
            gridSquare.style.width = squareSize.toString() + "px";
            gridSquare.style.height = squareSize.toString() + "px";
            gridSquare.classList.add("grid-square");
            
            
            etchDisplay.appendChild(gridSquare);
        }
    }

    console.log(Math.floor(etchDisplay.getBoundingClientRect().x) + "_" + etchDisplay.getBoundingClientRect().y );
}

let isMouseDown = false;

document.addEventListener("mousedown", (event) => {
    isMouseDown = true;

}, true);
document.addEventListener("mouseup", (event) => {
    isMouseDown = false;

}, true);



function getSquareID(event) {
    let currentSquareID = "";

    let mouseX = Math.floor(event.clientX);
    let mouseY = Math.floor(event.clientY);
    let gridXPosition = Math.floor(etchDisplay.getBoundingClientRect().x);
    let gridYPosition = Math.floor(etchDisplay.getBoundingClientRect().y);

    return "#A" + Math.ceil((mouseX - gridXPosition) / squareSize) + "_" + Math.ceil((mouseY - gridYPosition) / squareSize);    
}

function drawClassic(squareID) {
    let currentSquare = document.querySelector(squareID);
    currentSquare.style.opacity = 1.0;
    currentSquare.style.backgroundColor = primaryColor;
}

function drawShade(squareID) {
    let currentSquare = document.querySelector(squareID);
    currentSquare.style.backgroundColor = primaryColor;

    let currentOpacity = Number(currentSquare.style.opacity);
    currentSquare.style.opacity = (currentOpacity >= 1) ? 1 : (currentOpacity + .1).toString();
}

function drawLighten(squareID) {
    let currentSquare = document.querySelector(squareID);
    currentSquare.style.backgroundColor = primaryColor;

    let currentOpacity = Number(currentSquare.style.opacity);
    currentSquare.style.opacity = (currentOpacity <= 0) ? 0 : (currentOpacity - .1).toString();
}

function drawErase(squareID) {
    let currentSquare = document.querySelector(squareID);
    currentSquare.style.backgroundColor = "white";

}

function drawRainbow(squareID) {
    let currentSquare = document.querySelector(squareID);
    currentSquare.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) +", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")";
}

function draw(event){
    let squareID = getSquareID(event);

    switch (brushType) {
        case "draw":
            drawClassic(squareID);
            break;
        case "erase":
            drawErase(squareID);
            break
        case "shade":
            drawShade(squareID);
            break;
        case "lighten":
            drawLighten(squareID);
            break;
        case "rainbow":
            drawRainbow(squareID);
            break;
    }
}



function drag(event) {
    if(isMouseDown)
        draw(event)
}

function clear()
{
    etchDisplay.replaceChildren();
    generateGrid(gridSize);
}






generateGrid(gridSize);

etchDisplay.onmousemove = (event) => drag(event);
etchDisplay.onclick = (event) => draw(event);




