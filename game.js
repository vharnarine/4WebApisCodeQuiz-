const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
let timeId;
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// timer that penalizes wrong answer
const startingSeconds = 90;
let time = startingSeconds;
const timerEl = document.getElementById('timer');
timeId = setInterval(updateCountdown, 1000);
function updateCountdown () {
    timerEl.innerHTML = time;
    time--;
    if (time <= 0){ 
        return;
    }
}

// Quiz questions array
let questions = [
    {
        "question": "Commonly used JS data types do not include one of the following?",
        "choice1": "<strings>",
        "choice2": "<booleans>",
        "choice3": "<alerts>",
        "choice4": "<numbers>",
        "answer": 3
      },
      {
        "question": "Inside which HTML element do we put the JavaScript?",
        "choice1": "<script>",
        "choice2": "<javascript>",
        "choice3": "<js>",
        "choice4": "<scripting>",
        "answer": 1
      },
      {
        "question": " How do you write 'Hello World' in an alert box?",
        "choice1": "msgBox('Hello World');",
        "choice2": "alertBox('Hello World');",
        "choice3": "msg('Hello World');",
        "choice4": "alert('Hello World');",
        "answer": 4
      },
      {
        "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
        "choice1": "<script href='xxx.js'>",
        "choice2": "<script name='xxx.js'>",
        "choice3": "<script src='xxx.js'>",
        "choice4": "<script file='xxx.js'>",
        "answer": 3
      },
      {
        "question": "Who invented Java Script?",
        "choice1": "Cindy Crawford",
        "choice2": "Brendan Eich",
        "choice3": "Vint Cerf",
        "choice4": "Alan Turing",
        "answer": 2
      },
];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    console.log(availableQuestions);
    getNewQuestions();
};

getNewQuestions = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the last page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        choices.forEach((choice) => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });
        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // increments score
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        } else if (classToApply === 'incorrect'){
            time-= 20;
        }
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 750);
    });
});
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

// startgame call below
startGame();