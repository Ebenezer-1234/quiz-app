console.log("javascript is connected");

//1. Data (Quiz Question) object: key/value
const Questions = [
{
    Question: "Best player of ever?",
    Options: ["Christiano Ronaldo", "Messi", "Farbregas", "Bukayo Saka"],
    answer: 0 //index of your correct answer
},
{
    Question: "who is the famous man in the world?",
    Options: ["Peter Obi", "President Tinubu", "Donald Trup", "Pastor E.A Adeboye"],
    answer: 3 //index of your correct answer
},
{
    Question: "what is the capital of Nigeria?",
    Options: ["Ogun state", "Abia", "FCT Abuja", "Redemption City of God"],
    answer: 2 //index of your correct answer
},
]
//2. State Variables
let currentQuestionIndex = 0;
let score = 0;

//3. DOM elements
const quizbody = document.getElementById("quiz-body");
const resultscreen = document.getElementById("result-screen");
const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

//4. Functions
function loadQuestions () {
    const currentQ = Questions[currentQuestionIndex];
     
    //update progres
    progressText.textContent =`Questions ${currentQuestionIndex + 1} of ${questions.lenght}`
    progressFill.style.width =`${((currentQuestionIndex + 1) / questions.lenght) = 100}%` // 1 /3 * 100
    
    //Render Title
    questionTitle.textContent = currentQ.Question;

    //clear the previous option buttons
    optionsContainer.innerHTML ="";

    //render option button dynamically
    currentQ.Options.forEach((OptionText, index) =>{
        const button = document.createElement("button");
        button.textContent = OptionText;
        button.addEventListener("click", () => selectoption(index, button));
        optionsContainer.appendChild(button); 
    })

}

function selectOption(selectedIndex, selectedBtn) {
    const currentQ = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    //  disables all buttons once an options is picked
    buttons.forEach(btn => btn.disable = true);

    //check answer
    if (selectedIndex === currentQ.answer) {
        selectedBtn.classlist.add("coreect");
        score++;
    } else {
        selectedBtn.classlist.add("incorrect");
        // show correct answer to user
        buttons[currentQ.answer].classList.add("correct");
    }
    // delay before going to the next question
    setTimeout(() => {
        currentQuestionIndex++
        if(currentQuestionIndex < questions.lenght){
            loadQuestions();
        } else {
            showResults();
        } 
    }, 1200)
}
function showResult() {
    quizbody.classList.add("hidden");
    resultscreen.classList.remove("hidden");
    scoreText.textContent = `You score ${score} out of ${questions.lenght}!`;
}

const restartQuiz =() => {
    currentQuestionIndex = 0;
    score =0;
    resultscreen.classList.add("hidden");
    quizbody.classList.remove("hidden");
    loadQuestions();
}


//5. Event listener
restartBtn.addEventListener('click'. restartQuiz);

// initial load
loadQuestions()