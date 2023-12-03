document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const leftPaddle = document.getElementById("leftPaddle");
    const rightPaddle = document.getElementById("rightPaddle");
    const gameContainer = document.querySelector(".game-container");
    const scoreboard = document.getElementById("scoreboard");
    const winnerDisplay = document.getElementById("winnerDisplay");
    const startButton = document.getElementById("startButton");
    const tryAgainButton = document.getElementById("tryAgainButton");
    const bounceSound = new Audio('bounce.mp3');
    const scoreSound = new Audio('score.mp3');

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    let leftPaddleY = 170;
    let rightPaddleY = 160;
    const paddleSpeed = 10; 

    let leftPlayerScore = 0;
    let rightPlayerScore = 0;

    const maxScore = 10;
    function playBounceSound() {
    bounceSound.currentTime = 0;
    bounceSound.play();
   }

   function playScoreSound() {
  scoreSound.currentTime = 0;
   scoreSound.play();
   }

    let leftPaddleMovingUp = false;
    let leftPaddleMovingDown = false;
    let rightPaddleMovingUp = false;
    let rightPaddleMovingDown = false;

    document.addEventListener("keydown", function (event) {
        if (event.key === "w" && leftPaddleY > 0) {
            leftPaddleMovingUp = true;
        } else if (event.key === "s" && leftPaddleY < gameContainer.clientHeight - 80) {
            leftPaddleMovingDown = true;
        }

        if (event.key === "ArrowUp" && rightPaddleY > 0) {
            rightPaddleMovingUp = true;
        } else if (event.key === "ArrowDown" && rightPaddleY < gameContainer.clientHeight - 80) {
            rightPaddleMovingDown = true;
        }
    });

    document.addEventListener("keyup", function (event) {
        if (event.key === "w") {
            leftPaddleMovingUp = false;
        } else if (event.key === "s") {
            leftPaddleMovingDown = false;
        }

        if (event.key === "ArrowUp") {
            rightPaddleMovingUp = false;
        } else if (event.key === "ArrowDown") {
            rightPaddleMovingDown = false;
        }
    });

    function updatePaddlePositions() {
        if (leftPaddleMovingUp && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        } else if (leftPaddleMovingDown && leftPaddleY < gameContainer.clientHeight - 80) {
            leftPaddleY += paddleSpeed;
        }

        if (rightPaddleMovingUp && rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        } else if (rightPaddleMovingDown && rightPaddleY < gameContainer.clientHeight - 80) {
            rightPaddleY += paddleSpeed;
        }
    }

    function update() {
        if (leftPlayerScore >= maxScore || rightPlayerScore >= maxScore) {
            showWinner();
            return;
           
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 0 || ballY > gameContainer.clientHeight - 20) {
    ballSpeedY = -ballSpeedY;
    playBounceSound();
}

if (
    (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 80) ||
    (ballX > gameContainer.clientWidth - 40 && ballY > rightPaddleY && ballY < rightPaddleY + 80)
) {
    ballSpeedX = -ballSpeedX;
    playBounceSound();
}

if (ballX < 0) {
    rightPlayerScore++;
    playScoreSound();
    resetGame();
} else if (ballX > gameContainer.clientWidth) {
    leftPlayerScore++;
    playScoreSound();
    resetGame();
}

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        leftPaddle.style.top = leftPaddleY + "px";
        rightPaddle.style.top = rightPaddleY + "px";

        document.getElementById("leftScore").innerText = leftPlayerScore;
        document.getElementById("rightScore").innerText = rightPlayerScore;
    }

    function resetGame() {
        if (leftPlayerScore >= maxScore || rightPlayerScore >= maxScore) {
            showWinner();
        } else {
            ballX = gameContainer.clientWidth / 2;
            ballY = gameContainer.clientHeight / 2;
            leftPaddleY = rightPaddleY = gameContainer.clientHeight / 2 - 40;
        }
    }

    function showWinner() {
        let winnerMessage = "";
        if (leftPlayerScore >= maxScore) {
            winnerMessage = "Player 1 Wins!";
        } else if (rightPlayerScore >= maxScore) {
            winnerMessage = "Player 2 Wins!";
        }

        winnerDisplay.innerText = winnerMessage;
        tryAgainButton.style.display = "block";
        startButton.style.display = "none";
    }

    function tryAgain() {
        leftPlayerScore = rightPlayerScore = 0;
        resetGame();
        winnerDisplay.innerText = "";
        tryAgainButton.style.display = "none";
        startButton.style.display = "block";
    }

    tryAgainButton.addEventListener("click", tryAgain);

    function gameLoop() {
        update();
        updatePaddlePositions();
        requestAnimationFrame(gameLoop);
    }

    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        gameLoop();
    });
});
