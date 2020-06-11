//HTML elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const h1TextElement = document.getElementById('H1')

//Random Shuffling of questions
let shuffledQuestions, currentQuestionIndex


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

// Show question w/ a create element for each question
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}


// Selection function
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    // add 1 to the current selection to rotate to the next question
    currentQuestionIndex++
    // verify the current question that we're on 
   setTimeout(function () {
        if (shuffledQuestions.length > currentQuestionIndex) {
            displayNextQuestion()
        } else {
            startButton.innertext = "Restart"
            startButton.classList.remove('hide')
        }
  }, 1000)
}

// set class to correct dependent on question boolean if not correct, then false
// This section also loops to the CS hue values for background as well as button backgrounds to reveal correct answer or wrong answers
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }

}

// Remove the status from the button after selection for the new questions
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


// TIMER FOR THE QUIZ

var timer = document.querySelector("#time");

let secondsLeft = 75;

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
