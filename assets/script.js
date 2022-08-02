var timerEl = document.getElementById("timer");
var startBtn = document.getElementById('start-btn')
var questionBox = document.getElementById('question-box')
var answers = document.getElementById('answers')
var introRules = document.getElementById('intro')
var title = document.getElementById('title')
var questionText = document.getElementById('question')
var scoreSheet = document.getElementById('scoreSheet')
var scoreHeader = document.getElementById('score-header')
var submitBtn = document.getElementById('submit-btn')
var yourScore = document.getElementById('your-score')
var choices = Array.from(document.getElementsByClassName('answer'))

const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
            choice1: '<script>', //
            choice2: "<js>", 
            choice3: "<scripting>", 
            choice4: "<javascript>", 
            answer: 1,
    },
    {
        question: "What is JavaScript mainly used for?", 
            choice1: 'Making coffee',
            choice2: "Creating dynamic and interactive applications", //
            choice3: "Both", 
            choice4: "It scripts stuff", 
            answer: 2,
    },
    {
        question: "How do you create a function in JavaScript?",
            choice1: "function myFunction()", //
            choice2: "function:myFunction()>", 
            choice3: "function = myFunction()>", 
            choice4: "createFunction () ", 
            answer: 1,  
    },
    {
        question: "What will the code return? Boolean(3 < 7)",
 
            choice1: "True", //
            choice2: "false", 
            choice3: "NaN",
            choice4: "SyntaxError", 
            answer: 1, 
    },
    {
        question: "Which of the following means 'does not equal?'", 
            choice1: "=",
            choice2: "<=",
            choice3: "===", 
            choice4: "!==", //
            answer: 4,
    },
]

startBtn.addEventListener('click', startGame)
answers.addEventListener('click', nextQuestion)


// let currentQuestion = {}
// let availableQuestion = []
let score = 0 
let questionNumber = 0

MAX_QUESTIONS = 5
MY_SCORE = 0

function startGame (){
    startBtn.classList.add('hide')
    introRules.classList.add('hide')
    title.classList.add('hide')
    questionBox.classList.remove('hide')
    timerEl.classList.remove('hide')
    score = 0
    questionCounter = 0
    availableQuestion = [...questions]


    timer()
    nextQuestion() 
}

function timer () {
    var timeLeft = 60;
    
    var timerInterval = setInterval(function(){
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
          } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
          } 
            else {
            timerEl.textContent = '';
            clearInterval(timerInterval);
            return(scorePage())
          }

    }, 1000);
    
}

function nextQuestion () {
    questionNumber ++
    const questionIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex]
    questionText.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    
    if (availableQuestion.length === 0 || questionNumber >= MAX_QUESTIONS) {
        return (scorePage())
    }
    
    
    availableQuestion.splice(questionIndex, 1);
    }
    // if answer is correct add one point out of 5 to score then post that score in h1 at end page
    
    function correctAnswer() {
        MY_SCORE ++
    }
    
    
    //else answer is incorrect deduct 5 seconds from timer
    function wrongAnswer () {
        
        timer = timeLeft - 5; 
        nextQuestion()
    }

function scorePage() {
    startBtn.classList.add('hide')
    introRules.classList.add('hide')
    title.classList.add('hide')
    questionBox.classList.add('hide')
    timerEl.classList.add('hide')
    scoreSheet.classList.remove('hide')
    scoreHeader.classList.remove('hide')
    yourScore.classList.remove('hide')

    submitBtn.addEventListener('click', function(event){
        event.preventDefault(); 
        
        var name = document.querySelector('#name').value
        localStorage.setItem('name', name);
    });
}