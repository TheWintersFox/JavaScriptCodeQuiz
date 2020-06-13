//HTML elements
const startButton = document.getElementById('startBtn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const h1TextElement = document.getElementById('H1');



let shuffledQuestions; //Random Shuffling of questions

let logScore = " ";
let highscore = [];
let username = " ";
let user = [];
let scoreArray = localStorage.getItem('highscore');
if (scoreArray) {
    scoreArray = JSON.parse(scoreArray);
    else {
        scoreArray = [];
    }
}


let secondsLeft = 75; //Starting time
let currentQuestionIndex = 0; // Starting index at 0
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
}, {
    question: 'How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?',
    answers: [
        'He transfigures into a shark',
        'He kisses a mermaid',
        'He eats gillyweed',
        'He performs a bubble-head charm',
    ],
    correctAnswer: 'He eats gillyweed'
}, {
    question: 'What is the name of Fred and George’s joke shop?',
    answers: [
        'Weasley Joke Emporium',
        'Weasleys Wizard Wheezes',
        'Fred & Georges Wonder Emporium',
        'Zonkos Joke Shop'
    ],
    correctAnswer: 'Weasleys Wizard Wheezes',
}, {
    question: 'Which of these is NOT one of the Unforgivable Curses?',
    answers: [
        'Cruciatus Curse',
        'Imperius Curse',
        'Sectumsempra',
        'Avada Kedavra',
    ],
    correctAnswer: 'Sectumsempra',
}, {
    question: 'Where does Hermione brew her first batch of Polyjuice Potion?',
    answers: [
        'Moaning Myrtle’s Bathroom',
        'The Hogwarts Kitchen',
        'The Room of Requirement',
        'The Gryffindor Common Room',

    ],
    correctAnswer: 'Moaning Myrtle’s Bathroom',
}, ];


//START BUTTON
startButton.addEventListener('click', function(event) {
    //   currentQuestionIndex++;
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

//STOP TIMER Function
function stopTimer() {
    clearInterval(logScore);
    timer.timerContent = '';
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
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

}


// Show question w/ a create element for each question
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        // if (answer.correct) {
        //     button.dataset.correct = answer.correct
        // }
        //  button.onclick = setStatusClass;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

// if (shuffledQuestions === questions.length) {
//     endQuizPlaceHolder();
// }
// showQuestion();
//}

//Selection function
function selectAnswer(e) {
    const selectedButton = e.target.innerText;
    console.log(selectedButton);

    checkAnswer(selectedButton);
    // add 1 to the current selection to rotate to the next question
    currentQuestionIndex++;
    // verify the current question that we're on 
    setTimeout(function() {
        if (shuffledQuestions.length > currentQuestionIndex) {
            displayNextQuestion();
        } else {
            startButton.classList.remove('hide');
        }
    }, 1000);
}

//set class to correct dependent on question boolean if not correct, then false
//This section also loops to the CS hue values for button backgrounds to reveal correct answer or wrong answers
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        //Grab current time and subtract 10 to reinsert

        let currenttime = parseInt(timer.textContent)
        secondsLeft = currenttime - 10
        element.classList.add('wrong')
    }

}

//This will check the selected choice then display correct or incorrect below the answers area.
function checkAnswer(response) {
    console.log(response);
    if (response !== questions[currentQuestionIndex]) {
        console.log("WRONG");
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
        console.log("CORRECT");
        checkAnswerDisplay.textContent = "Correct";
        checkAnswerDisplay.style.textAlign = "center";
        checkAnswerDisplay.style.backgroundColor = "green";
        checkAnswerDisplay.style.color = "white";

        answerCheck.appendChild(checkAnswerDisplay);
    }
}
//Remove the status from the button after selection for the new questions

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// EndQUIZ WIP
function endQuiz() {
    //Function stops timer once time is logged as the score.
    stopTimer();

    /* Hide quiz instructions and start button as well as the questions and answers 
    - including the incorrect or correct display at the buttom of the page*/
    startDisplay.style.display = "none";
    qa.style.display = "none";
    answerCheck.style.display = "none";

    //HIGHSCORE LOCAL VARIABLES
    /*Description: Variables needed in order to collect and store highscores. Creates Initial Input Display.*/
    const highscoreInputHeader = document.createElement("h1");
    const highscoreInputHeaderText = document.createTextNode("Highscores");
    let score = secondsLeft; //Score calculated by determining the amount of time left when the quiz ends.
    const scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = "Your final score is " + score + ".";
    const initialsInputLabel = document.createElement("LABEL");
    initialsInputLabel.textContent = "Enter initials: ";
    initialsInputLabel.className += "mr-1"
    const initialsInput = document.createElement("INPUT");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("value", "SLH");
    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.className += "btn btn-primary ml-1";

    //SUBMIT HIGHSCORE
    /*Description: Upon clicking the submit button, the username and score is saved 
    to the localStorage and displayed under Highscores (which can also be accessed by pressing the
    'View Highscores' button shown below). */
    submitButton.onclick = function(event) {
        event.preventDefault;
        //Prompt for initials to collect username for localStorage
        let userName = initialsInput.value;
        console.log(userName);
        //STORE SCORE
        function storeHighscore() {
            //localStorage.getItem('highscore')
            // if the above is a value (scoreArray) push new object ie. { user: userName, score: score }
            scoreArray.push({ user: userName, score: score });
            localStorage.setItem('highscore', JSON.stringify(scoreArray))
                // scoreArray = [{ user: userName, score: score },  { user: userName, score: score }]
        }
        //STORE USER
        // function storeUser() {
        //   localStorage.setItem("user", JSON.stringify(userName));
        // }
        //LOGGED FUNCTION 
        /*Description: The username and score are stored IF the current score 
        is higher than the previously stored highscore*/
        // if (score > JSON.parse(localStorage.getItem("highscore"))) {
        storeHighscore();
        // }
        //Function creates input area
        highscoresDisplay();
    };

    //Displays Highscore Input Area in HTML
    highscoreInputHeader.appendChild(highscoreInputHeaderText);
    highscoreContent.appendChild(highscoreInputHeader);
    highscoreContent.appendChild(scoreDisplay);
    highscoreContent.appendChild(initialsInputLabel);
    highscoreContent.appendChild(initialsInput);
    highscoreContent.appendChild(submitButton);

}

//VIEW HIGHSCORE BUTTON
const highscoreButton = document.getElementById("highscorebtn");
highscoreButton.onclick = function(event) {
    event.preventDefault;
    answerCheck.style.display = "none";
    stopTimer();
    highscoresDisplay();
};

//HIGHSCORE DISPLAY FUNCTION
/*Inputs are displayed after inputs are collected. Intials and highscore displayed. Score displayed is equivalent to 
the seconds left on the timer when the quiz ends. */
function highscoresDisplay() {
    /* Hide quiz instructions and start button as well as the questions and answers 
   and the Highscore input diplay page*/
    startDisplay.style.display = "none";
    qa.style.display = "none";
    highscoreContent.style.display = "none";
    //Creates "Highscore" Header and collects data for localStorage
    const highscoreHeader = document.createElement("h1");
    const highscoreHeaderText = document.createTextNode("Highscores");
    const highscoreList = document.createElement("div");
    highscoreHeader.appendChild(highscoreHeaderText);
    highscoreDisplay.appendChild(highscoreHeader);
    for (let i = 0; i < scoreArray.length; i++) {
        let highscoreLatest = document.createElement("p");
        let highscoreLatestText = document.createTextNode(
            scoreArray[i].user +
            " - " +
            scoreArray[i].score
        );
        highscoreLatest.appendChild(highscoreLatestText);
        highscoreList.appendChild(highscoreLatest);
    };
    highscoreDisplay.appendChild(highscoreList);
    //GO BACK BUTTON
    const goBackButton = document.createElement("button");
    goBackButton.innerHTML = "Go Back";
    goBackButton.className += "btn btn-primary mr-3";
    goBackButton.onclick = function(event) {
        event.preventDefault;
        window.location.reload();
    };

    //CLEAR BUTTON
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear Highscore";
    clearButton.className += "btn btn-primary";
    clearButton.onclick = function(event) {
        event.preventDefault;
        window.localStorage.clear();
        highscoreList.innerHTML = '';

    };

    //Displays highscore information
    highscoreDisplay.appendChild(goBackButton);
    highscoreDisplay.appendChild(clearButton);

    //Disable View Highscore Button
    highscoreButton.disabled = true;
}