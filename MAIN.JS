const playBord = document.querySelector(".play-bord")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const controlar = document.querySelectorAll(".controlars i")
let foodX, foodY;
let snakeX = 5,snakeY = 10;
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setintervalId;
let snackBody = [];
let score = 0;



let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`



const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() *30) +1;
    foodY = Math.floor(Math.random() *30) +1;
}

const changeDdiration = (e) =>{
if(e.key === "ArrowUp" && velocityY !=1){

    velocityX = 0;
    velocityY = -1;
}

else if(e.key === "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;



}

else if(e.key === "ArrowLeft" && velocityX !=1){
    velocityX = -1;
    velocityY = 0;
}

else if(e.key === "ArrowRight" && velocityX !=-1){
    velocityX = 1;
    velocityY = 0;
}

}




const handleGameOver = () =>{
    clearInterval(setintervalId);
    alert("Game over press ok to replay")
    location.reload();
}

controlar.forEach(key => {
    key.addEventListener("click", () =>{
        changeDdiration({key:key.dataset.key})
    })
})

const initGame = () =>{


if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class = "food" style="grid-area : ${foodY} / ${foodX}">🍒</div>`;

   if(snakeX === foodX && snakeY === foodY){
    changeFoodPosition();
    snackBody.push([foodX,foodY]);
    score ++;

    highScore = score>=highScore ?score: highScore;
    localStorage.setItem("high-score",highScore)
    scoreElement.innerText = `Score: ${score}`
    highScoreElement.innerText = `High Score: ${highScore}`
   }

   for (let i = snackBody.length - 1; i >0; i--) {
    snackBody[i] = snackBody[i-1];
    
   }

   snackBody[0] = [snakeX,snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY >30){
        gameOver = true;
    }

    for (let i = 0; i < snackBody.length; i++) {
       
        htmlMarkup += `<div class = "head" style="grid-area : ${snackBody[i][1]} / ${snackBody[i][0]}"></div>`;
        if(i !== 0 && snackBody[0][1] === snackBody[i][1] && snackBody[0][0] === snackBody[i][0]){
            gameOver= true;
        }
        
    }


    playBord.innerHTML = htmlMarkup;
}



changeFoodPosition();

setintervalId = setInterval(initGame,125);


document.addEventListener("keydown",changeDdiration);
