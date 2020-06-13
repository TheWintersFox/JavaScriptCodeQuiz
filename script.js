//HTML elements
const startButton = document.getElementById('startBtn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const h1TextElement = document.getElementById('H1')


//Random Shuffling of questions
let shuffledQuestions;
let secondsLeft = 75;
let currentQuestionIndex = 0;
let checkAnswerDisplay = document.createElement('p');


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
},
];


//START BUTTON
startButton.addEventListener('click', function (event) {
    //   currentQuestionIndex++;
    event.preventDefault();

    //Hide Start Display
    startQuizz.style.display = "none";

    //Start Timer
    startTimer();

    //Start Questions
    startGame();

    //Allow next Question after initial choice
    // displayNextQuestion()

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
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    h1TextElement.innerText = "";
    displayNextQuestion()

}

function displayNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}


// Show question w/ a create element for each question
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer
        button.classList.add('btn')
        // if (answer.correct) {
        //     button.dataset.correct = answer.correct
        // }
        //  button.onclick = setStatusClass;
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}


//This will check the selected choice then display correct or incorrect below the answers area.
function checkAnswer(response) {
    console.log(response)
    if (response !== questions[currentQuestionIndex].correctAnswer) {
        console.log("WRONG")
        checkAnswerDisplay.textContent = "Incorrect";
        checkAnswerDisplay.style.textAlign = "center";
        checkAnswerDisplay.style.backgroundColor = "red";
        checkAnswerDisplay.style.color = "white";
        answerCheck.appendChild(checkAnswerDisplay);
        secondsLeft = secondsLeft - 10; //Time deduction
        console.log(secondsLeft); //Test
        timer.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            endQuiz();
        }
    } else {
        console.log("CORRECT")
        checkAnswerDisplay.textContent = "Correct";
        checkAnswerDisplay.style.textAlign = "center";
        checkAnswerDisplay.style.backgroundColor = "green";
        checkAnswerDisplay.style.color = "white";
        answerCheck.appendChild(checkAnswerDisplay);
    }



    // if (shuffledQuestions === questions.length) {
    //     endQuizPlaceHolder();
    // }
    // showQuestion();
}


//Selection function
function selectAnswer(e) {
    const selectedButton = e.target.innerText
    console.log(selectedButton)

    checkAnswer(selectedButton)
    // add 1 to the current selection to rotate to the next question
    currentQuestionIndex++
    // verify the current question that we're on 
    setTimeout(function () {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            displayNextQuestion()
        } else {
            startButton.innertext = "Restart"
            startButton.classList.remove('hide')
        }
    }, 1000)
}

//set class to correct dependent on question boolean if not correct, then false
//This section also loops to the CS hue values for button backgrounds to reveal correct answer or wrong answers
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        //Grab current time and subtract 10 to reinsert

        let currenttime = parseInt(timer.textContent)
        secondsLeft = currenttime - 10
        element.classList.add('wrong')
    }

}

//Remove the status from the button after selection for the new questions

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


// EndQUIZ WIP
function endQuizPlaceHolder() {
    alert("Game Over");
}