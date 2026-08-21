

// 1. Data (Quiz Questions)
const questions = [
  {
    question: "Best player ever?",
    options: ["Cristiano Ronaldo", "Messi", "Fabregas", "Bukayo Saka"],
    answer: 0 // Index of correct answer
  },
  {
    question: "Who is the most famous man in the world?",
    options: ["Peter Obi", "President Tinubu", "Donald Trump", "Pastor E.A Adeboye"],
    answer: 2
  },
  {
    question: "What is the capital of Nigeria?",
    options: ["Ogun State", "Abia", "FCT Abuja", "Redemption City"],
    answer: 2
  }
];

// 2. State Variables
let currentQuestionIndex = 0;
let score = 0;

// 3. DOM Elements
const quizbody = document.getElementById("quiz-body");
const resultscreen = document.getElementById("result-screen");
const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// 4. Functions
function loadQuestions() {
  const currentQ = questions[currentQuestionIndex];

  // Update progress
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  // Render Title
  questionTitle.textContent = currentQ.question;

  // Clear previous option buttons
  optionsContainer.innerHTML = "";

  // Render option buttons dynamically
  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn"); // Adding class for styling!
    button.textContent = optionText;
    button.addEventListener("click", () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex, selectedBtn) {
  const currentQ = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  // Disable all buttons once an option is picked
  buttons.forEach(btn => btn.disabled = true);

  // Check answer
  if (selectedIndex === currentQ.answer) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
    // Show correct answer to user
    buttons[currentQ.answer].classList.add("correct");
  }

  // Delay before going to next question
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestions();
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  quizbody.classList.add("hidden");
  resultscreen.classList.remove("hidden");
  scoreText.textContent =` You scored ${score} out of ${questions.length}!`;
}

const restartQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  resultscreen.classList.add("hidden");
  quizbody.classList.remove("hidden");
  loadQuestions();
};

// 5. Event Listener
restartBtn.addEventListener('click', restartQuiz);

// Initial Load
loadQuestions(); 