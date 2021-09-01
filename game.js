//canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
//player
const snakeSize = 50;
let snakeSpeed = 50;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;

let velocityX = 0;
let velocityY = 0;

const tileCountX = canvas.width / snakeSize;
const tileCountY = canvas.height / snakeSize;

//listeners
document.addEventListener('keydown', keyPush);


function gameLoop() {
    drawStuff()
    moveStuff()
    setTimeout(gameLoop, 1000 / 15);
}
gameLoop();

//move everything
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    if (snakePosX > canvas.width) {
        snakePosX = 0;
    }
    if (snakePosX < -snakeSize) {
        snakePosX = canvas.width;
    }
    if (snakePosY > canvas.height) {
        snakePosY = 0;
    }
    if (snakePosY < -snakeSize) {
        snakePosY = canvas.height;
    }
}

//draw everything
function drawStuff() {
    //background
    rectangle('#efc93f', 0, 0, canvas.width, canvas.height);
    //grid
    drawGrid();
    //snake
    rectangle('green', snakePosX, snakePosY, snakeSize, snakeSize);
}

//draw rectangle
function rectangle(color, x, y, width, height) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}
    
//keyboard
function keyPush(event) {
    switch(event.key) {
        case 'ArrowLeft':
            if(velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case 'ArrowUp':
            if(velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowRight':
            if(velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        case 'ArrowDown':
            if(velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
    }
}

//grid
function drawGrid() {
    for (let i=0; i < tileCountX; i++) {
        for (let j=0; j < tileCountY; j++) {
            rectangle(
                '#fff',
                snakeSize * i,
                snakeSize * j,
                snakeSize - 1,
                snakeSize - 1
            );
        }
    }
}

