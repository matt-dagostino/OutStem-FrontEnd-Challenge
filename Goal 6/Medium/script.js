const apiUrl = 'https://opentdb.com/api.php';
const category = 9; // General Knowledge
const difficulty = 'medium';
const type = 'multiple';

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const questionCounter = document.getElementById('question-counter');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const notificationButton = document.getElementById('notification-button');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');
const labelA = document.getElementById('label-a');
const labelB = document.getElementById('label-b');
const labelC = document.getElementById('label-c');
const labelD = document.getElementById('label-d');


// Fetch questions from the API
function fetchQuestions() {
    const url = `${apiUrl}?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            questions = data.results;
            showQuestion(currentQuestionIndex);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        notification.style.display = 'none';
}

// Display a question to the user
function showQuestion(index) {
    const question = questions[index];
    questionContainer.textContent = question.question;
    optionA.value = question.incorrect_answers[0];
    optionB.value = question.incorrect_answers[1];
    optionC.value = question.incorrect_answers[2];
    optionD.value = question.correct_answer;

    // Set option labels
    labelA.textContent = question.incorrect_answers[0];
    labelB.textContent = question.incorrect_answers[1];
    labelC.textContent = question.incorrect_answers[2];
    labelD.textContent = question.correct_answer;

    // Clear previous selections
    optionA.checked = false;
    optionB.checked = false;
    optionC.checked = false;
    optionD.checked = false;

    // Update the question counter
    currentQuestionSpan.textContent = index + 1;
    totalQuestionsSpan.textContent = questions.length;
}

// Display a notification message
function showNotification(message) {
    notificationMessage.textContent = message;
    notification.style.display = 'block';
}

// Close the notification
notificationButton.addEventListener('click', () => {
    notification.style.display = 'none';
});

// Handle next button click
nextButton.addEventListener('click', () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (optionA.checked || optionB.checked || optionC.checked || optionD.checked) {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked').value;

        // Check if the selected answer is correct
        if (selectedAnswer === currentQuestion.correct_answer) {
            score++;
            showNotification('Correct! You earned a point.');
        } else {
            const correctAnswer = currentQuestion.correct_answer;
            showNotification(`Incorrect. The correct answer was "${correctAnswer}".`);
            score = 0; // Restart the score
            currentQuestionIndex = -1; // Restart the quiz at question 1
        }

        // Move to the next question
        currentQuestionIndex++;

        // Check if there are more questions
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showNotification(`Quiz finished! Your score: ${score}/${questions.length}`);
            currentQuestionIndex = 0; // Restart the game
            score = 0;
            fetchQuestions(); // Fetch new questions
        }
    } else {
        alert('Please select an answer before moving to the next question.');
    }
});

// Initialize the quiz
fetchQuestions();
