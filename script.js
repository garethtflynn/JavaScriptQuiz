var timerEl = document.getElementById("timer");
var startBtn = document.getElementById('start-btn')
var questionBox = document.getElementById('question-box')
var introRules = document.getElementById('intro')
var title = document.getElementById('title')
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            {choice: '<script>', id: "a"},//
            {choice: "<js>", id: "b"},
            {choice: "<scripting>", id: "c"},
            {choice: "<javascript>", id: "d"},
        ],
        hit: "a",
    },
    {
        question: "JavaScript is a ___ -side programming language.",
        answers: [
            {choice: 'Client', id: "a"},
            {choice: "Server", id: "b"},
            {choice: "Both", id: "c"},//
            {choice: "None", id: "d"},
        ],
        hit: "a",
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {choice: 'function myFunction()', id: "a"},//
            {choice: "function:myFunction()>", id: "b"},
            {choice: "function = myFunction()>", id: "c"},
            {choice: "createFunction () ", id: "d"},
        ],
        hit: "a",
    },
    {
        question: "What will the code return? Boolean(3 < 7)",
        answers: [
            {choice: 'True', id: "a"},//
            {choice: "false", id: "b"},
            {choice: "NaN", id: "c"},
            {choice: "SyntaxError", id: "d"},
        ],
        hit: "a",
    },
    {
        question: "Which of the following means 'does not equal?'",
        answers: [
            {choice: '=', id: "a"},
            {choice: "<=", id: "b"},
            {choice: "===", id: "c"},
            {choice: "!==", id: "d"},//
        ],
        hit: "a",
    },

]

startBtn.addEventListener('click', startGame)

function startGame (){
    startBtn.classList.add('hide')
    introRules.classList.add('hide')
    questionBox.classList.remove('hide')
    timerEl.classList.remove('hide')
    title.classList.add('hide')
    timer()
    nextQuestion()

}

function timer () {
    var timeLeft = 20;
    
    var timerInterval = setInterval(function(){
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
          } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
          } else {
            timerEl.textContent = '';
            clearInterval(timerInterval);
          }
    }, 1000);
}

function nextQuestion () {

}




