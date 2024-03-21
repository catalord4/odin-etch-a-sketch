
const gridSizeOptionInput = document.querySelector("#grid-size-option");
const gridSizeOptionDisplay = document.querySelector("#grid-size-display");

function selectGridSize(event) {
    gridSize = Math.pow(2, event.target.value);
    gridSizeOptionDisplay.textContent = gridSize + " x " + gridSize;
    clear();
}

gridSizeOptionInput.addEventListener("change", (e) => selectGridSize(e));

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", clear)

const brushColor = document.querySelector("#brush-color-picker");

function colorPicker(event) {
    primaryColor = event.target.value;
}

brushColor.addEventListener("change", (e) => colorPicker(e));

const brushTypeOptions = document.querySelectorAll('input[name="brush-type"]');

brushTypeOptions.forEach(element => {
    element.addEventListener("click", (event) => updateBrushType(event));
    
});

function updateBrushType(event){
    brushType = event.target.value;
}
