var counter = 15;
var userChoice;
var gameTimer;

var questionArray = ["Which of the following is NOT a Faceless album?", "What is Djent?", "Is Jason Richardson a God of Metal?", "What is Meshuggah?", "Is Metal The Greatest Genre Of Music?"];
var answerArray = [
    ["Autotheism", "In Becoming a Ghost", "Planetary Duality", "Hope Leaves"],
    ["Folk Music", "Polka", "Progressive Metal", "Heavy Metal"],
    ["Yes", "No", "Maybe", "Who Is That?"],
    ["A Croissant", "Polka Stars", "Elvis Impersonators", "A Bunch Of Screaming Psychopaths"],
    ["Absolutely Not", "No But Iron Is", "Yes", "This Is Clearly The Devils Music"],
];
var correctAnswers = ["Hope Leaves", "Progressive Metal", "Yes", "A Bunch Of Screaming Psychopaths", "Yes"];
var internalCounter = 0
var correctAnswerCounter = 0;
var wrongAnswerCounter = 0;
var timeOuts = 0;
var guitarDjent = new Audio("sound/djent.mp3");

function createGame() { // This function will create the game's HTML and populate the questions which are held in an array
                        // The value of the answers array is tracked by the internal counter
    hideGameMessages();
    $("#question-here").html(questionArray[internalCounter]);
    $("#first-a").html(answerArray[internalCounter][0]);
    $("#second-a").html(answerArray[internalCounter][1]);
    $("#third-a").html(answerArray[internalCounter][2]);
    $("#fourth-a").html(answerArray[internalCounter][3]);
    showQuestions();
}

function timerCounter() {
    gameTimer = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(gameTimer);
            timeOutLoss();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function gameTracker() {           // internal tracker that keeps track of total questions asked/passed/failed, 
    if (internalCounter < 4) {     // resets questions via createGame(), resets counter to 15 until final screen stats are shown
        internalCounter++;
        counter = 15;
        createGame();
        timerCounter();
    } else {
        gameOverScreen();
    }
}

$("#user-question-area").hide(); // Initially hides Question Area
$("#user-timeover-area").hide(); // Initially hides Time Over Area
$("#user-gameover-area").hide(); // Initially hides Game Over Area 
$("#user-wronganswer-area").hide(); // initially hides Wrong Answer Area 
$("#user-correctanswer-area").hide(); // initially hides Correct Answer Area 

$(document).ready(function () {

    $("body").on("click", ".start-button", function (event) {

        guitarDjent.play(); // adds a djent-y background click :-)
        hideStartGameButton();
        createGame();
        timerCounter();

    }); // <- Start Button Click

    $("body").on("click", ".answer", function (event) {
        
        guitarDjent.play();
        userChoice = $(this).text();
        console.log(userChoice);
        console.log(correctAnswers[internalCounter])
        if (userChoice === correctAnswers[internalCounter]) {
            clearInterval(gameTimer);
            userWins();
        } else {
            clearInterval(gameTimer);
            userLoses();
        }
    }); // <- Answer Click

    $("body").on("click", ".reset-button", function (event) {
        guitarDjent.play();
        resetGame();
    }); // <- Reset Button Click

}); 

function timeOutLoss() {    // will run whenever the user runs out of time
    timeOuts++;
    showGameMessages();
    showTimeOver();
    setTimeout(gameTracker, 3000); 
}

function userWins() {       // will run when the user chooses the right answer
    correctAnswerCounter++;
    showGameMessages();
    showCorrectAnswer();
    setTimeout(gameTracker, 3000); 
}

function userLoses() {      // will run when the user chooses the wrong answer
    wrongAnswerCounter++;
    showGameMessages();
    showWrongAnswer();
    setTimeout(gameTracker, 3000); 
}

function gameOverScreen() {
    hideGameMessages();
    showGameOver();
}

function resetGame() {      // resets all counters to 0, resets questions, hides Game Over screen
    internalCounter = 0;
    correctAnswerCounter = 0;
    wrongAnswersCounter = 0;
    timeOuts = 0;
    counter = 15;
    createGame();
    timerCounter();
    hideGameOver();
}

// Functions For Cleanup Purposes

function hideQuestions() {
    $("#user-question-area").hide();
}

function showQuestions() {
    $("#user-question-area").show();
}

function hideTimeOver() {
    $("#user-timeover-area").hide();
}

function showTimeOver() {
    $("#user-timeover-area").show();
}

function hideWrongAnswer() {
    $("#user-wronganswer-area").hide();
}

function showWrongAnswer() {
    $("#user-wronganswer-area").show();
}

function hideCorrectAnswer() {
    $("#user-correctanswer-area").hide();
}

function showCorrectAnswer() {
    $("#user-correctanswer-area").show();
}

function hideGameOver() {
    $("#user-gameover-area").hide();
}

function showGameOver() {
    $("#user-gameover-area").show();
    $('#user-correct-total').html(correctAnswerCounter);
    $('#user-wrong-total').html(wrongAnswerCounter);
    $('#user-timeout-total').html(timeOuts);
}

function hideGameMessages() {
    hideTimeOver();
    hideCorrectAnswer();
    hideWrongAnswer();
}

function showGameMessages() {
    $(".timer").html(counter);
    correctAnswerIs();
    hideQuestions();
}

function hideStartGameButton() {
    $(".intro-screen").hide();
}

function correctAnswerIs() {
    $('.correct-answer').html(correctAnswers[internalCounter]);
}