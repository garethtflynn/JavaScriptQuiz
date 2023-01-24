var timerEl = document.getElementById("timer");
var startBtn = document.getElementById('start-btn')
var questionBox = document.getElementById('question-box')
var answers = document.getElementById('answers')
var introRules = document.getElementById('intro')
var title = document.getElementById('title')
var questionText = document.getElementById('question')
var scoreSheet = document.getElementById('scoreSheetContainer')
var scoreHeader = document.getElementById('score-header')
var submitBtn = document.getElementById('submit-btn')
var yourScore = document.getElementById('your-score')
var nameInput = document.getElementById('userNameContainer')
var choiceA = document.querySelector("#a");
var choiceB = document.querySelector("#b");
var choiceC = document.querySelector("#c");
var choiceD = document.querySelector("#d");
var choiceArr = [choiceA, choiceB, choiceC, choiceD]
var viewHighscoresBtn = document.querySelector('#viewHighscores')
var introPage = document.querySelector('#intro')
var progressText = document.querySelector("#progress");
var controlBtns = document.querySelector('#controls')
var quizBox = document.querySelector("#quizBox");
var scorePage = document.querySelector("#scorePage")
var options = document.querySelector("#options")
var highScores =[]
var timeLeft = 60;

let questionIndex = 0
const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ['<script>',"<js>", "<scripting>","<javascript>"],
        answer: "<script>"
    },
    {
        question: "What is JavaScript mainly used for?", 
        choices: ['Making coffee', "Creating dynamic and interactive applications", "Both", "It scripts stuff"],
        answer: "Creating dynamic and interactive applications",
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function myFunction()","function:myFunction()>","function = myFunction()>", "createFunction () "],
        answer: "function myFunction()"   
    },
    {
        question: "What will the code return? Boolean(3 < 7)",
        choices:["True", "false", "NaN","SyntaxError"],   
        answer: "True"
    },
    {
        question: "Which of the following means 'does not equal?'",
        choices: ["=", "<=", "===", "!==",], 
        answer: "!=="
    },
]

function nextQuestion () {
    console.log('game started')
    questionText.textContent = questions[questionIndex].question;
    for (var i = 0; i < choiceArr.length; i++) {
        choiceArr[i].textContent = questions[questionIndex].choices[i];
        choiceArr[i].onclick = function() {
            if (questions[questionIndex].answer !== this.textContent){
                (timeLeft = timeLeft - 10); 
            }
        questionIndex ++; 
            if (questionIndex >= questions.length) {
                endGame();
            } else if (timeLeft <= 0) {
                endGame();
            } else {
                nextQuestion();
                progressText.textContent = (questionIndex + 1) + " of " + questions.length;
            }
        }
    };
};

function timer () {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "0:" + timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          endGame();
          ;
        }
        if (timeLeft < 10) {
          timerEl.textContent = "0:0" + timeLeft;
        }
      }, 1000);
    
}

function endGame(){
    clearInterval(timer);
    if (timeLeft < 0) {
        timeLeft = 0
    }

    introPage.classList.add("hide");
    quizBox.classList.add('hide')
    scorePage.classList.remove('hide')

    localStorage.setItem('score', JSON.stringify(timeLeft));
    yourScore.textContent = localStorage.getItem("score")

}

//start button on home screen
document.querySelector("#start-btn").onclick = function () {
    timeLeft = 60;
    questionNumber = 0;

    introPage.classList.add("hide")
    quizBox.classList.remove("hide")


    nextQuestion();
    timer();
    progressText.textContent = (questionNumber + 1) + " / " + questions.length;
}

//view Highscores button on home screen
document.querySelector("#viewHighscores").onclick = function (event) {
    console.log('viewHighscores btn pressed')
    event.preventDefault();

    quizBox.classList.add('hide')
    introPage.classList.add('hide')
    controlBtns.classList.add('hide')
    scorePage.classList.remove('hide')

    displayHighscores()
};

// view leader board button on endGame screen
document.querySelector("#leaderBoard").onclick = function (event) {
    event.preventDefault();
    scoreSheetContainer.classList.remove("hidden");
    console.log(highScores);
    displayHighscores()
};

//play again button on endGame screen
document.querySelector("#playAgain").onclick = function (event) {
    event.preventDefault();
    timeLeft = 60;
    questionIndex = 0;

    
    scorePage.classList.add("hide")
    controlBtns.classList.add("hide")
    quizBox.classList.remove("hide")
    progressText.classList.remove('hide')
    timerEl.classList.remove('hide')
    
    
    nextQuestion();
    timer();
    progressText.textContent = (questionIndex + 1) + " of " + questions.length;
};

// save score button on end game screen 
document.querySelector("#saveScore").onclick = function (event){
    event.preventDefault()
    var userName = document.getElementById("userName").value;
    localStorage.setItem('username', userName);

    var score = localStorage.getItem("score");
    var userScores = {
        username: userName,
        score: score,
      };
    localStorage.setItem("userScores", JSON.stringify(userScores));
    
    highScores.push(userScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    var endText = document.querySelector("#endText");
    endText.innerHTML = "SAVED!<br/><br/>Click on View Highscores to see the Leaderboard";
};

function displayHighscores() {
    console.log(localStorage.getItem("highScores"));
    console.log(highScores);
    if (JSON.parse(localStorage.getItem("highScores")) === null){
        var li = document.createElement("li");
        li.className = "high-score";
        li.innerText = "No Highscores to Display"
        scoreSheet.append(li);
    } else {
        highScores = JSON.parse(localStorage.getItem("highScores"));
        if (highScores.length >= 2) {
            highScores.sort((function (a, b) {
            return b.score - a.score;}))
        }
        for (var e = 0; e < highScores.length; e++) {
            var li = document.createElement("li");
            li.className = "high-score";
            li.innerText = highScores[e].username + " : " + highScores[e].score
            scoreSheet.append(li);
        }
    }
};
