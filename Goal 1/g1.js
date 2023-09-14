// Define the API URL
const apiUrl = 'https://opentdb.com/api.php';

// Specify the parameters for the API request
const amount = 1; // Number of questions to fetch (in this case, just 1)
const difficulty = 'easy'; // Difficulty level
const category = 9; // Category ID for General Knowledge
const type = 'boolean'; // Type of question (true/false)

// Construct the URL for the API request
const url = `${apiUrl}?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`;

// Make the API request using the fetch function
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    // Extract the question and correct answer from the response
    const question = data.results[0].question;
    const correctAnswer = data.results[0].correct_answer;

    // Print the question and correct answer to the console
    console.log('Question:', question);
    console.log('Correct Answer:', correctAnswer);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
