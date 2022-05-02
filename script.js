const container = document.querySelector('.container');
const clearButton = document.getElementById('clear-button');
const sizeButton = document.getElementById('size-button');
let currentSize = 16;

createGrid(16)

function createGrid(gridSize){
    const totalBoxes = gridSize * gridSize;
    
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for(let i = 0; i < totalBoxes; i++){
        let box = document.createElement('div');
        box.addEventListener('mouseover', () => box.className = 'hover');
        container.appendChild(box);
    }
}

function clearGrid(){
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
}

clearButton.addEventListener('click', function() {
    clearGrid();
    createGrid(currentSize);
});

sizeButton.addEventListener('click', function() {
    const newSize = prompt('Choose the size of the new grid (between 1 and 100)');

    if(newSize === null) return;

    if(Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
    } else {
        clearGrid();
        createGrid(newSize);
        currentSize = newSize;
    }
});