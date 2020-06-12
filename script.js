//HTML elements
const startButton = document.getElementById('startBtn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const h1TextElement = document.getElementById('H1')

//Random Shuffling of questions
let shuffledQuestions, currentQuestionIndex
let secondsLeft = 75;


//START BUTTON
startButton.addEventListener('click', function (event) {
    currentQuestionIndex++
    event.preventDefault();

    //Hide Start Display
    startQuizz.style.display = "none";

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
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide');
    h1TextElement.innerText = ""
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}



// Questions Array
const questions = [{
    question: 'What is the model of the first broom Harry ever receives?',
    answers: [
     'Nimbus 2000',
     'Cleansweep One',
     'Hoover',
     'Firebolt',
    ],
    correctAnswer: 'Nimbus 2000',
},
{
    question: 'How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?',
    answers: [
     'He transfigures into a shark',
     'He kisses a mermaid',
     'He eats gillyweed',
     'He performs a bubble-head charm',
    ],
    correctAnswer: 'He eats gillyweed'
},
{
    question: 'What is the name of Fred and George’s joke shop?',
    answers: [
     'Weasley Joke Emporium',
     'Weasleys Wizard Wheezes',
     'Fred & Georges Wonder Emporium',
     'Zonkos Joke Shop'
    ],
    correctAnswer: 'Weasleys Wizard Wheezes',
},
{
    question: 'Which of these is NOT one of the Unforgivable Curses?',
    answers: [
     'Cruciatus Curse', 
     'Imperius Curse', 
     'Sectumsempra', 
     'Avada Kedavra',
    ],
    correctAnswer: 'Sectumsempra',
},
{
    question: 'Where does Hermione brew her first batch of Polyjuice Potion?',
    answers: [
     'Moaning Myrtle’s Bathroom',
     'The Hogwarts Kitchen',
     'The Room of Requirement',
     'The Gryffindor Common Room',   
         
    ],
    correctAnswer: 'Moaning Myrtle’s Bathroom',  
}
]