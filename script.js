//HTML elements
const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const h1TextElement = document.getElementById('H1')

//Random Shuffling of questions
let shuffledQuestions, currentQuestionIndex
let secondsLeft = 75;

// Questions Array
const questions = [{
    question: 'What is the model of the first broom Harry ever receives?',
    answers: [
        { text: 'Nimbus 2000', correct: true },
        { text: 'Cleansweep One', correct: false },
        { text: 'Hoover', correct: false },
        { text: 'Firebolt', correct: false }
    ]
},
{
    question: 'How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?',
    answers: [
        { text: 'He transfigures into a shark', correct: false },
        { text: 'He kisses a mermaid', correct: false },
        { text: 'He eats gillyweed', correct: true },
        { text: 'He performs a bubble-head charm', correct: false }
    ]
},
{
    question: 'What is the name of Fred and George’s joke shop?',
    answers: [
        { text: 'Weasley Joke Emporium', correct: false },
        { text: 'Weasleys Wizard Wheezes', correct: true },
        { text: 'Fred & Georges Wonder Emporium', correct: false },
        { text: 'Zonkos Joke Shop', correct: false }
    ]
},
{
    question: 'Which of these is NOT one of the Unforgivable Curses?',
    answers: [
        { text: 'Cruciatus Curse', correct: false },
        { text: 'Imperius Curse', correct: false },
        { text: 'Sectumsempra', correct: true },
        { text: 'Avada Kedavra', correct: false }
    ]
},
{
    question: 'Where does Hermione brew her first batch of Polyjuice Potion?',
    answers: [
        { text: 'Moaning Myrtle’s Bathroom', correct: true },
        { text: 'The Hogwarts Kitchen', correct: false },
        { text: 'The Room of Requirement', correct: false },
        { text: 'The Gryffindor Common Room', correct: false }
    ]
}
]

//START BUTTON
startButton.addEventListener('click', function (event) {
    currentQuestionIndex++
    event.preventDefault();
    //Start Timer
    startTimer();
    //Start Questions
    startGame();
    //Allow next Question after initial choice
    displayNextQuestion()

});

// TIMER FOR THE QUIZ

var timer = document.querySelector("#time");

//TIMER FUNCTION
function time() {

    secondsLeft--;

    if (secondsLeft <= 0) {
        secondsLeft = 0;
        
    }

    timer.textContent = secondsLeft;

};

//START TIMER FUNCTION
function startTimer() {
    let timerInterval = setInterval(time, 1000);
}


//Start Game Function w/ Question array random shuffle


