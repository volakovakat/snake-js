//canvas
const canvas = document.querySelector('canvas');
const title = document.querySelector('h1');
const context = canvas.getContext('2d');

//game
let gameIsRunning = true;

const fps = 10;
const tileSize = 50;

const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

let score = 0;

//player
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;

let velocityX = 1;
let velocityY = 0;

let tail = [];
let snakeLength = 4;

//food
let foodPosX = 0;
let foodPosY = 0;

//listeners
document.addEventListener('keydown', keyPush);

//loop
function gameLoop() {
    if (gameIsRunning) {
        drawStuff()
        moveStuff()
        setTimeout(gameLoop, 1000 / fps);
    }
}
resetFood();
gameLoop();

//move everything
function moveStuff() {
    snakePosX += snakeSpeed * velocityX;
    snakePosY += snakeSpeed * velocityY;

    //wall collision
    if (snakePosX > (canvas.width - tileSize)) {
        snakePosX = 0;
    }
    if (snakePosX < 0) {
        snakePosX = canvas.width;
    }
    if (snakePosY > (canvas.height - tileSize)) {
        snakePosY = 0;
    }
    if (snakePosY < 0) {
        snakePosY = canvas.height;
    }

    //GAME OVER
    //Keyboard restarts game
    tail.forEach((snakePart) => {
        if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
            gameOver();
        }
    } );

    //tail 
    tail.push({ x: snakePosX, y: snakePosY });

    //forget earliest parts of snake
    tail = tail.slice(-1 * snakeLength);

    //food collision
    if (snakePosX === foodPosX && snakePosY === foodPosY) {
        title.textContent = ++score;
        snakeLength++;
        resetFood();
    }
}

//draw everything
function drawStuff() {
    //background
    rectangle('#0c8f94', 0, 0, canvas.width, canvas.height);

    //grid
    drawGrid();

    //tail
    tail.forEach((snakePart) => rectangle('#629553', snakePart.x, snakePart.y, tileSize, tileSize));

    //snake
    rectangle('#3c7b29', snakePosX, snakePosY, tileSize, tileSize);

    //food
    rectangle('#ffa500', foodPosX, foodPosY, tileSize, tileSize);

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
            default:
                //restart game
                if (! gameIsRunning) {
                    location.reload();
                }
                break
    }
}

//grid
function drawGrid() {
    for (let i=0; i < tileCountX; i++) {
        for (let j=0; j < tileCountY; j++) {
            rectangle(
                '#fff',
                tileSize * i,
                tileSize * j,
                tileSize - 1,
                tileSize - 1
            );
        }
    }
}

//randomize food position
function resetFood() {
    if ( snakeLength === tileCountX * tileCountY) {
        gameOver();
    }

    foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
    foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
    //don't spawn food on snakes head
    if (foodPosX === snakePosX && foodPosY === snakePosY) {
       resetFood();
    }

    //don't spawn food on any snake part
    if (tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY)) {
        resetFood();
    }
}

//game over
function gameOver() {
    title.innerHTML = `<strong>GAME OVER!</br>Score: ${score}</strong>`
            gameIsRunning = false;
}

