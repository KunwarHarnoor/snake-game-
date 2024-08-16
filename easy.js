var rows = 20;
var cols = 20;
var blocksize = 25;
var context;
var board;
let score=0;
let gameover=false;

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;
var snakebody=[];
var velocityX = 0;
var velocityY = 0;

// food
var foodX = Math.floor(Math.random() * cols) * blocksize;
var foodY = Math.floor(Math.random() * rows) * blocksize;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blocksize;
  board.width = cols * blocksize;
  document.addEventListener("keyup", changeDirection);
  context = board.getContext("2d"); //used for drawing the board

  setInterval(update, 1000 / 10);
};



function update() {
  // Set the fill color to black
  if(gameover){
    document.getElementById('score').innerHTML = 
    `<span style="color: red;">GAMEOVER!</span> Score: ${score.toString()}`;
;
    return;
  }
  context.fillStyle = "black";

  // Draw a filled rectangle covering the entire board
  context.fillRect(0, 0, board.width, board.height); //from one corner to the other

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blocksize, blocksize);
  if (snakeX == foodX && snakeY == foodY) {
     foodX = Math.floor(Math.random() * cols) * blocksize;
     foodY = Math.floor(Math.random() * rows) * blocksize;
     score+=1;
     document.getElementById('score').innerHTML="Score:"+""+score.toString();
     snakebody.push([snakeX, snakeY]);
  }
  for(let i=snakebody.length-1; i>0 ; i--){
    snakebody[i]=snakebody[i-1];
  }

  if(snakebody.length){
    snakebody[0]=[snakeX,snakeY];
  }


  context.fillStyle = "lime";
  snakeX += velocityX * blocksize;
  snakeY += velocityY * blocksize;
  context.fillRect(snakeX, snakeY, blocksize, blocksize);
  for(let i=0;i<snakebody.length;i++){
    context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
  }

  checkCollision();
 
}

function changeDirection(event) {
  if (event.code == "ArrowUp") {
    velocityY = -1;
    velocityX = 0;
  }
  if (event.code == "ArrowDown") {
    velocityY = 1;
    velocityX = 0;
  }
  if (event.code == "ArrowLeft") {
    velocityY = 0;
    velocityX = -1;
  }
  if (event.code == "ArrowRight") {
    velocityY = 0;
    velocityX = 1;
  }
}
function checkCollision() {
    // Check collision with walls
    if (snakeX < 0 || snakeX >= board.width || snakeY < 0 || snakeY >= board.height) {
        gameover=true;
    }

    // Check collision with itself
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX === snakebody[i][0] && snakeY === snakebody[i][1]) {
            gameover=true;
        }
    }

    return false;
}

