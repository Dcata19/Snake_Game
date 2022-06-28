let matrix = new Array(16);
let snake = new Array();
let id = 0;
let snakeHeadX = 7;
let snakeHeadY = 6; 
let timeInterval;
let keyPressed;
let score = -1;

for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(16);
}

createTable();
snakeUpdateScore();
generateApples();

//generates the game board
function createTable() {
    for (let i = 0; i < 16; ++i) {
        let container = document.createElement('div');
        document.getElementById('parent').appendChild(container);
        for (let j = 0; j < 16; ++j) {
            ++id;
            matrix[i][j] = id;
            let cell = document.createElement('input');
            cell.id = id;
            cell.type = 'text';
            cell.className = 'border border-black';
            cell.style = "width: 27.8px";
            cell.readOnly = true;
            container.appendChild(cell);
        }
    }
    snake.push(matrix[snakeHeadX][snakeHeadY]);
    document.getElementById(snake[0]).style.background = "blue";
    //reads a key from keyboard
    document.addEventListener('keyup', function(key) {
        if ("w" == key.key && keyPressed != "s") {
            clearInterval(timeInterval);
            keyPressed = "w";
            timeInterval = setInterval(moveUp, 150);
        } else if ("a" == key.key && keyPressed != "d") {
            clearInterval(timeInterval);
            keyPressed = "a";
            timeInterval = setInterval(moveLeft, 150);
        } else if ("s" == key.key && keyPressed != "w") {
            clearInterval(timeInterval);
            keyPressed = "s";
            timeInterval = setInterval(moveDown, 150);
        } else if ("d" == key.key && keyPressed != "a") {
            clearInterval(timeInterval);
            keyPressed = "d";
            timeInterval = setInterval(moveRight, 150);
        }
    });
}

function moveUp() {
    --snakeHeadX;
    generateSnake();
    checkEat();
}

function moveLeft() {
    --snakeHeadY;
    generateSnake();
    checkEat();
}

function moveDown() {
    ++snakeHeadX;
    generateSnake();
    checkEat();
}

function moveRight() {
    ++snakeHeadY;
    generateSnake();
    checkEat();
}

//generates the snake's body
function generateSnake() {
    //firstly checks if the game meets the conditions to run
    if (gameOver() == 0) {
        document.getElementById(snake[0]).style.backgroundColor = "white";
        snake.push(matrix[snakeHeadX][snakeHeadY]);
        for (let i = 1; i < snake.length; ++i) {    
            document.getElementById(snake[i]).style.background = "blue";//snake's body color
        }
        snake.shift();
    } else {
        document.getElementById('score').innerText = 'You Lost!';
        setTimeout(function(){
            alert('Try again');
            location.reload();
        })
    }
}

//checks if the game is over
function gameOver() {
    //if the snake's head is not in a wall return 0(gameOver is false)
    if (snakeHeadX >= 0 && snakeHeadX <= 15 && snakeHeadY >= 0 && snakeHeadY <= 15) {
        //if the snake's head collides with itself it returns 1 (gameOver is true)
        if (snake.indexOf(matrix[snakeHeadX][snakeHeadY]) > -1) {
            clearInterval(timeInterval);
            return 1;
        }
        return 0;
    }
    clearInterval(timeInterval);
    return 1;
}

function generateApples() {
    let apple = Math.floor(Math.random() * id) + 1;
    if (snake.indexOf(apple) == -1) {
        return document.getElementById(apple).value = "🍎"
    }
    generateApples();
}

//check if the snake's head is eating an apple
function checkEat() {
    if (document.getElementById(snake[snake.length - 1]).value == "🍎") {
        snake.splice(0, 0, matrix[snakeHeadX][snakeHeadY]);
        document.getElementById(snake[snake.length - 1]).value = "";
        snakeUpdateScore();
        generateApples();
    }
}

function snakeUpdateScore() {
    ++score;
    return document.getElementById('score').innerText ="Score: " + " " + score;
}