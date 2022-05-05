const container = document.querySelector('.container');
const blackButton = document.getElementById('black-button');
const rainbowButton = document.getElementById('rainbow-button');
const grayScaleButton = document.getElementById('gray-scale-button');
const sizeButton = document.getElementById('size-button');
const clearButton = document.getElementById('clear-button');

let currentSize = 16;

createGrid(currentSize);

function createGrid(gridSize) {
    const totalBoxes = gridSize * gridSize;

    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < totalBoxes; i++) {
        let box = document.createElement('div');
        box.className = 'hover';
        box.onmouseover = () => box.style.backgroundColor = 'black';
        container.appendChild(box);
    }
}

function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

// Generates a random value between 0 and 255
function randomNum() {
    return Math.floor(Math.random() * 256);
}

// Returns a string of a rgb value
function randomRGB() {
    let red = randomNum();
    let green = randomNum();
    let blue = randomNum();
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function changeHoverToBlack() {
    const boxes = container.childNodes;

    boxes.forEach(box => {
        box.onmouseover = () => box.style.backgroundColor = 'black';
    });
}

function changeHoverToRandom() {
    const boxes = container.childNodes;
    
    boxes.forEach(box => {
        box.onmouseover = () => {
            box.style.filter = 'brightness(1)';
            box.style.backgroundColor = randomRGB()
        }
    });
}

function changeHoverToGrayScale() {
    const boxes = container.childNodes;

    boxes.forEach(box => {
        box.onmouseover = () => {
            let value = getComputedStyle(box).filter.match(/[+-]?\d+(\.\d+)?/g);
            let backgroundColor = getComputedStyle(box).backgroundColor;
            
            if(backgroundColor !== 'rgb(255, 255, 255)') box.style.backgroundColor = 'rgb(255, 255, 255)';
            value = value.join('');
            if(value !== 0) box.style.filter = `brightness(${value - 0.1})`;
            if(value < 0.1) box.style.filter = `brightness(0)`;
        }
    });
}

blackButton.addEventListener('click', function () {
    changeHoverToBlack();
});

rainbowButton.addEventListener('click', function() {
    changeHoverToRandom();
});

grayScaleButton.addEventListener('click', function() {
    changeHoverToGrayScale();
});

sizeButton.addEventListener('click', function () {
    const newSize = prompt('Choose the size of the new grid (between 1 and 100)');

    if (newSize === null) return;

    if (Number.isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a number between 1 and 100');
    } else {
        clearGrid();
        createGrid(newSize);
        currentSize = newSize;
    }
});

clearButton.addEventListener('click', function () {
    clearGrid();
    createGrid(currentSize);
});