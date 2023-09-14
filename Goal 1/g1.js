// Define the API URL
const API = "https://opentdb.com/api.php";

// Specify the parameters for the API request
const amount = 1; // Number of questions to fetch
const difficulty = "easy"; // Difficulty level
const category = 9; // Category ID for General Knowledge Questions
const type = "boolean"; // Type of question (true/false)

// Construct the URL for the API request
const apiURL = `${API}?amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`;

// Make the API request
fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Extract the question and correct answer from the response
    const question = data.results[0].question;
    const correctAnswer = data.results[0].correct_answer;

    // Print the question and correct answer to the console
    console.log("Question:", question);
    console.log("Correct Answer:", correctAnswer);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
