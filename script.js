const etchDisplay = document.querySelector("#etch-display");



let gridSize = 32;
let squareSize = 0;

function debugColor(event)
{
    console.log("Mouse Down on " + event.target.id);
}

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

let currentSquareID = "";

function draw(event) {
    let mouseX = Math.floor(event.clientX);
    let mouseY = Math.floor(event.clientY);
    let gridXPosition = Math.floor(etchDisplay.getBoundingClientRect().x);
    let gridYPosition = Math.floor(etchDisplay.getBoundingClientRect().y);

    currentSquareID = "#A" + Math.ceil((mouseX - gridXPosition) / squareSize) + "_" + Math.ceil((mouseY - gridYPosition) / squareSize);
    
    document.querySelector(currentSquareID).style.backgroundColor = "black";
    let currentOpacity = Number(document.querySelector(currentSquareID).style.opacity);
    console.log(currentOpacity + 0.1);
    document.querySelector(currentSquareID).style.opacity = (currentOpacity >= 1) ? 1  : (currentOpacity + .1).toString();


}

function drawDrag(event) {
    if(isMouseDown)
        draw(event)
}
function clear()
{
    etchDisplay.replaceChildren();
    generateGrid(gridSize);
}






generateGrid(gridSize);

//etchDisplay.addEventListener("onmousemove", (event) => getCurrentGridSquare(event));
etchDisplay.onmousemove = (event) => drawDrag(event);
etchDisplay.onclick = (event) => draw(event);



