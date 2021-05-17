$(".flipper").click(function() { //function to flip cards in lesson 1
    $(this).toggleClass("flip");
    return false;
});

$(".glow").click(function() { //causes correct cards to glow on click 
    $(this).addClass("cardglow");
    return false;
});

$(".reject").click(function() { //causes incorrect cards to darken on click
    $(this).addClass("cardreject");
    return false;
});


$(document).ready(function() { //adds functinoality for hovering animations in lesson 3
    $("#flopAnimate").hover(
        function() {
            $(this).attr("src", "../../static/lesson3animations/flop.gif");
        },
        function() {
            $(this).attr("src", "../../static/lesson3animations/flop.jpg");
        });
    $("#turnAnimate").hover(
        function() {
            $(this).attr("src", "../../static/lesson3animations/turn.gif");
        },
        function() {
            $(this).attr("src", "../../static/lesson3animations/turn.jpg");
        });
    $("#riverAnimate").hover(
        function() {
            $(this).attr("src", "../../static/lesson3animations/river.gif");
        },
        function() {
            $(this).attr("src", "../../static/lesson3animations/river.jpg");
        });
});

function openPage(pageName, elmnt, color) { // Function to swap between tabs in the lesson pages
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontenttoclear, tablinksdecolour;
    tabcontenttoclear = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontenttoclear.length; i++) {
        tabcontenttoclear[i].style.display = "none";
    }

    // Remove the background color of the tablinks
    tablinksdecolour = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinksdecolour.length; i++) {
        tablinksdecolour[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("myForm").setAttribute("action", "");

function showResults() {
    // gather answer containers from the quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    var numCorrect = 0;
    QuizQuestions.forEach((currentQuestion, questionNumber) => {
        // find the answer chosen by the user
        const answerContainer = answerContainers[questionNumber];
        const answerfinder = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(answerfinder) || {}).value;
        if (userAnswer === currentQuestion.correctAnswer) {
            // if the answer is correct add to the number of correct answers
            numCorrect++;

        }
    });
    let resultperc = (numCorrect / QuizQuestions.length) * 100;
    // show number of correct answers out of total number
    if (resultperc < 50.0) { //show in red box if fail
        resultsContainer.innerHTML = `<div class="card card2" style="background-color: red;"><div class=card-body>${numCorrect} out of ${QuizQuestions.length} | ${resultperc}</div></div>`;
    } else if (resultperc >= 50.0 && resultperc != 100) { //show in green box if pass but not 100%
        resultsContainer.innerHTML = `<div class="card card2" style="background-color: green;"><div class=card-body>${numCorrect} out of ${QuizQuestions.length} | ${resultperc}</div></div>`;
    } else if (resultperc == 100) { //show in gold box if 100%
        resultsContainer.innerHTML = `<div class="card card2" style="background-color: gold;"><div class=card-body>${numCorrect} out of ${QuizQuestions.length} | ${resultperc}</div></div>`;
    }
    document.getElementById("finalscore").innerHTML = `<input id="score" name="score" type="hidden" value=${resultperc}>`; //Sends the result to a hidden field in the html so it can be accessed by the form for the database
    document.getElementById("submit-continue").style.visibility = "visible"; //makes continue button visible
    submitButton.style.display = "none"; //removes the mark button, allows no reattempts when wrong answer is revealed
}


function buildQuiz() {

    const output = []; //output stores the html to be inserted into the page
    document.getElementById("submit").style.visibility = "visible"; //submit button becomes visible

    output.push(`<div class="card-deck">`);

    QuizQuestions.forEach( //for every question, input all the html into the page
        (currentQuestion, questionNumber) => {

            const answers = []; //stores answer options
            output.push(
                `<div class="card">
                        <div class="card-body">
                            <div class="card-title">Question ${questionNumber + 1}</div>
                            <div class="card-text">
                                <div class="question">${currentQuestion.question}</div>`); //pushes a card for each question
            let letter = "";
            for (letter in currentQuestion.answers) { //for each answer, enter a radio button

                // ...add an HTML radio button
                answers.push(
                    `<ul class="list-group">
                        <li class="list-group-item"> 
                        <input type="radio" name="question${questionNumber}" value="${letter}"> ${letter} : ${currentQuestion.answers[letter]}
                        </li>
                    </ul>`
                );
            }
            output.push(`<div class="answers">${answers.join('')}</div></div></div></div>`);
        }
    );

    output.push(`</div>`);
    quizContainer.innerHTML = output.join(''); //output the html code to the page
}

function beginQuiz1() { //sets the questions to be the questions for quiz 1
    QuizQuestions = Quiz1Qs;
    startQuiz1.style.display = "none"; //removes start button
    buildQuiz();
}

function beginQuiz2() { //sets the questions to be the questions for quiz 2
    QuizQuestions = Quiz2Qs;
    startQuiz2.style.display = "none";
    buildQuiz();
}

function beginQuiz3() { //sets the questions to be the questions for quiz 3
    QuizQuestions = Quiz3Qs;
    startQuiz3.style.display = "none";
    buildQuiz();
}
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const startQuiz1 = document.getElementById("Quiz1");
const startQuiz2 = document.getElementById("Quiz2");
const startQuiz3 = document.getElementById("Quiz3");
let QuizQuestions = "";
const Quiz1Qs = [ //stores the questions for each lesson
    { question: "Which card has the highest value in the suit?", answers: { a: "Ace!", b: "Queen", c: "Draw Four" }, correctAnswer: "a" },
    { question: "Which of the three is a real suit?", answers: { a: "Spades", b: "Red", c: "Blue" }, correctAnswer: "a" },
    { question: "Which of these four is a real suit?", answers: { a: "Triangles", b: "Reverse", c: "Diamonds", d: "Spells" }, correctAnswer: "c" },
    { question: "Which is a valid card?", answers: { a: "Joker", b: "Jack", c: "Jill", d: "Jester" }, correctAnswer: "b" }
];
const Quiz2Qs = [
    { question: "A flush is four of the same card", answers: { a: "No", b: "Yes", c: "Trick Question!" }, correctAnswer: "a" },
    { question: "A Straight is five cards in consecutive rank order", answers: { a: "Correct", b: "No", c: "Wrong that's a penta pair" }, correctAnswer: "a" }
];
const Quiz3Qs = [
    { question: "What is a fold?", answers: { a: "Betting all your chips", b: "Forfeiting cards out of your hand", c: "Betting half the community pot" }, correctAnswer: "b" },
    { question: "Wnat is a raise?", answers: { a: "the player does not bet further as they have already put in an amount that satisfies the current bet.", b: "Betting all your chips", c: "Increasing the minimum bet size with a bet" }, correctAnswer: "c" }
];

submitButton.addEventListener('click', showResults); //mark and show results for all the questions

if (startQuiz1) { //ensures the lesson page actually contains the right begin quiz button before starting the 
    startQuiz1.addEventListener('click', beginQuiz1);
}
if (startQuiz2) {
    startQuiz2.addEventListener('click', beginQuiz2);
}
if (startQuiz3) {
    startQuiz3.addEventListener('click', beginQuiz3);
}