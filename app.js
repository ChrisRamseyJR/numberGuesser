//  GAME Function
// -player must guess a number between one and Text
// -player gets a certain amount of guesses
// -notify player of guesses remaining
// -let player choose to play again

//Game values
let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

//UI ELEMENTS
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign Ui Min and Max
minNum.textContent = min;
maxNum.textContent = max;

//Play again Listener
game.addEventListener('mousedown', function (e) {
  if (
    e.target.className === 'play-again') {
    window.location.reload();
  }
})
//Listen for Guess
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //validate guess
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //Check if Won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct!`);

  } else {
    //Wrong Number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // gameOver
      gameOver(false, `Game Over, you lost. The correct number is ${winningNum}`);

      ;
    } else {
      //Game Continues
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(
        `${guess}, is not correct, ${guessesLeft}: Guesses Left`,
        'red'
      );
    }
  }
});

//game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disable input
  guessInput.disabled = true;
  //Border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //set message
  setMessage(msg);

  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//Get Winning num
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}