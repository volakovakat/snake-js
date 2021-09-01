//canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
//player
const snakeSize = 50;
let snakeSpeed = 5;
let snakePosX = 0;
let snakePosY = canvas.height / 2 - snakeSize / 2;

//listeners
document.addEventListener('keydown', keyPush);


function gameLoop() {
    drawStuff()
    moveStuff()
    requestAnimationFrame(gameLoop);
}
gameLoop();

//move everything
function moveStuff() {
    //snakePosX += snakeSpeed;

    if (snakePosX > canvas.width) {
        snakePosX = 0;
    }
}

//draw everything
function drawStuff() {
    rectangle('white', 0, 0, canvas.width, canvas.height)
    rectangle('green', snakePosX, snakePosY, snakeSize, snakeSize) 
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
            snakePosX -= snakeSpeed;
            break;
        case 'ArrowUp':
            snakePosY -= snakeSpeed;
            break;
        case 'ArrowRight':
            snakePosX += snakeSpeed;
            break;
        case 'ArrowDown':
            snakePosY += snakeSpeed;
            break;
    }
}
    


