$(document).ready(function () {

  var userTotal = 0;
  var gameWins = 0;
  var gameLosses = 0;

  var randomNumber = Math.floor(Math.random() * 101 + 19) // Generates random number
  var randomizeNumber = function () {
    randomNumber = Math.floor(Math.random() * 101 + 19);
  }
  $('#randomNumber').text(randomNumber); // Writes initial value of randomNumber to the DOM
  var randomReplace = function () { // Function to replace random number when run in resetGame()
    $('#randomNumber').text(randomNumber);
  }

  var jewelOne = Math.floor(Math.random() * 11 + 1) // Sets jewel value
  var jewelTwo = Math.floor(Math.random() * 11 + 1)
  var jewelThree = Math.floor(Math.random() * 11 + 1)
  var jewelFour = Math.floor(Math.random() * 11 + 1)

  var randomizeGame = function () {
    jewelOne = Math.floor(Math.random() * 11 + 1)
    jewelTwo = Math.floor(Math.random() * 11 + 1)
    jewelThree = Math.floor(Math.random() * 11 + 1)
    jewelFour = Math.floor(Math.random() * 11 + 1)
  };

  $('#numberWins').text(gameWins); // Writes initial value of gameWins to the DOM
  var updateWins = function () {
    $('#numberWins').text(gameWins);
  }

  $('#numberLosses').text(gameLosses); // Writes initial value of gameLosses to the DOM
  var updateLosses = function () {
    $('#numberLosses').text(gameLosses);
  }

  $('#game-counter-total').text(userTotal); // Writes initial value of userTotal to the DOM
  var updateUserTotal = function () {
    $('#game-counter-total').text(userTotal);
  }

  var debugUserTotal = function () {
    console.log("Updated userTotal =  " + userTotal);
  }

  var debugRandomNumber = function () {
    console.log("New randomNumber = " + randomNumber);
  }

  function resetGame() { // This will reset the game when called 
    randomizeNumber();
    debugRandomNumber();
    randomReplace();
    randomizeGame();
    userTotal = 0;
    updateUserTotal();
  }

  function userWinsGame() { // This function will alert a game win, updates the win counter & resets the game
    alert("You won the game!");
    gameWins++;
    updateWins();
    resetGame();
  }

  function userLosesGame() { // This function will alert a game loss, updates the loss counter & resets the game
    alert("You lost the game!");
    gameLosses++;
    updateLosses();
    resetGame();
  }

  $('#jewel-one').on('click', function () { // On click event for each jewel press, checks to see if win/loss conditions are met
    userTotal = userTotal + jewelOne;
    debugUserTotal(); // debugs to see if userTotal is being updated on click
    updateUserTotal();
    // Is there a way to wrap this if statement below into a variable and call it without having to write out this every time?
    if (userTotal == randomNumber) { // if userTotal is equal to randomNumber set at start -> game wins! 
      userWinsGame();
    } else if (userTotal > randomNumber) { // else -> game loss!
      userLosesGame();
    }
  })
  $('#jewel-two').on('click', function () {
    userTotal = userTotal + jewelTwo;
    debugUserTotal();
    updateUserTotal();
    if (userTotal == randomNumber) {
      userWinsGame();
    } else if (userTotal > randomNumber) {
      userLosesGame();
    }
  })
  $('#jewel-three').on('click', function () {
    userTotal = userTotal + jewelThree;
    debugUserTotal();
    updateUserTotal();
    if (userTotal == randomNumber) {
      userWinsGame();
    } else if (userTotal > randomNumber) {
      userLosesGame();
    }
  })
  $('#jewel-four').on('click', function () {
    userTotal = userTotal + jewelFour;
    debugUserTotal();
    updateUserTotal();
    if (userTotal == randomNumber) {
      userWinsGame();
    } else if (userTotal > randomNumber) {
      userLosesGame();
    }
  });
});