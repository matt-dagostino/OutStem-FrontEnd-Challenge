const apiUrl = 'https://opentdb.com/api.php';
const category = 9; // General Knowledge
const difficulty = 'easy';
const type = 'boolean';

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

const questionContainer = document.getElementById('question-container');
const trueOption = document.getElementById('true-option');
const falseOption = document.getElementById('false-option');
const nextButton = document.getElementById('next-button');
const questionCounter = document.getElementById('question-counter');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const notificationButton = document.getElementById('notification-button');


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
    trueOption.checked = false;
    falseOption.checked = false;

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

    // Check if an answer is selected
    if (trueOption.checked || falseOption.checked) {
        const selectedAnswer = trueOption.checked ? 'True' : 'False';

        // Check if the selected answer is correct
        if (selectedAnswer === currentQuestion.correct_answer) {
            score++;
            showNotification('Correct! You earned a point.');
        } else {
            const correctAnswer = currentQuestion.correct_answer;
            showNotification(`Incorrect. The correct answer was ${correctAnswer}. You now have to restart the quiz :(`);
            score = 0; // Restart the score
            currentQuestionIndex = -1; // Restart Quiz
        }
        // Move to the next question
        currentQuestionIndex++;

        // Check if there are more questions
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showNotification('Quiz finished! Your score: ${score}/${questions.length}');
            currentQuestionIndex = 0; // Restart the game
            score = 0;
            fetchQuestions(); // Fetch new questions
        }
    } else {
        showNotification('Please select an answer before moving to the next question.');
    }
});

// Initialize the quiz
fetchQuestions();
