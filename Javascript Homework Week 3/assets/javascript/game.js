var wordPool = ["djent", "vapor", "polka"];

    var secretWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    var userWins = 0;
    var guessesRemaining = 10;
    var userGuesses = [];
    var internalCorrectGuesses = [];
    // var gameWin = internalCorrectGuesses === secretWord.length;


    $(document).ready(function () {


      document.onkeyup = function (event) {
        var userChoice = event.key;

        // This adds to the userGuess array of guessed letters and then prints out the full array
        var guessChange = function () {
          userGuesses.push(userChoice);
          $("#user-guesses").text(userGuesses);
          guessesRemaining--;
          $("#user-remaining").text(guessesRemaining);
        }

        var correctGuesses = function () {
          internalCorrectGuesses.push(userChoice);
        }

        var restartGame = function () {
          secretWord = wordPool[Math.floor(Math.random() * wordPool.length)];
          guessesRemaining = 10;
          userGuesses = [];
          internalCorrectGuesses = [];
          $("#user-guesses").text("");
          $("#user-remaining").text("10");
          $("#letter1").text("_");
          $("#letter2").text("_");
          $("#letter3").text("_");
          $("#letter4").text("_");
          $("#letter5").text("_");

        }

        var userWinsGame = function () {

        userWins++;
        $("#user-wins").text(userWins);
        }

        var winCondition = internalCorrectGuesses === secretWord.length;
        // var winCondition = function () {
          
        // if (internalCorrectGuesses === secretWord.length) {

        // userWinsGame();
        // restartGame();
        // }
        // }
        
        // For some reason we cannot get the win condition tied to the final keypress, for sure this is a limitation on our approach and we should have used an array! 

        if (!/^[a-z]$/.test(userChoice)) {
          alert("Please press a letter!")
         } 
        
        else if (internalCorrectGuesses.length === secretWord.length) {

          alert("You have won the game!")
          userWinsGame();
          restartGame();


        } else if (guessesRemaining <= 0) {

          alert("Game is over! Press F5 to restart and try again!");
          restartGame();

        } else if (userChoice === secretWord[0]) {

          $("#letter1").text(secretWord[0]);
          guessChange();
          correctGuesses();
          if (internalCorrectGuesses === secretWord.length) {  // how can we get the game to win on final keystroke? Tried to nest an if statement but it still didn't trigger
            userWinsGame();
            restartGame();
          }
          // winCondition();

        } else if (userChoice === secretWord[1]) {

          $("#letter2").text(secretWord[1]);
          guessChange();
          correctGuesses();

        } else if (userChoice === secretWord[2]) {

          $("#letter3").text(secretWord[2]);
          guessChange();
          correctGuesses();


        } else if (userChoice === secretWord[3]) {

          $("#letter4").text(secretWord[3]);
          guessChange();
          correctGuesses();
          

        } else if (userChoice === secretWord[4]) {

          $("#letter5").text(secretWord[4]);
          guessChange();
          correctGuesses();
          

        } else if (userChoice !== secretWord) {

          guessChange();
        }

        console.log(internalCorrectGuesses);
        console.log(userChoice);
        console.log(userGuesses);
        console.log(secretWord);

        // } // Letter checker ends

      }; // Document On Key End

    }); // Document On Load End