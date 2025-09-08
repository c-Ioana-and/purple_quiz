// DOM elements

// Screen
const startScreen = document.getElementById("start_screen")
const quizScreen = document.getElementById("quiz_screen")
const resultScreen = document.getElementById("result_screen")

// Start screen data
const startBtn = document.getElementById("start-btn")

// Quiz data
const score = document.getElementById("score")
const finalScore = document.getElementById("final-score")
const maxScore = document.getElementById("max-score")
const totalQuestions = document.getElementById("total-questions")
const questionElement = document.getElementById("question")
const currentQuestionNr = document.getElementById("current-question")
const answersContainer = document.getElementById("answers-container")
const progressBar = document.getElementById("progress")

// Results data
const resultMessage = document.getElementById("results-message")
const restartBtn = document.getElementById("restart-btn")

// Quiz questions
const questions = [
    {
        question: "What is the minimum age to get a driving license?",
        answers: [
            { text: "16 years", correct: false },
            { text: "18 years", correct: true },
            { text: "21 years", correct: false },
            { text: "25 years", correct: false },
        ],
    },
    {
        question: "What does a red traffic light mean?",
        answers: [
            { text: "Stop", correct: true },
            { text: "Go", correct: false },
            { text: "Caution", correct: false },
            { text: "Speed up", correct: false },
        ],
    },
    {
        question: "What is the purpose of a seatbelt?",
        answers: [
            { text: "To keep you warm", correct: false },
            { text: "To protect you in case of an accident", correct: true },
            { text: "To make you look cool", correct: false },
            { text: "To help you drive faster", correct: false },
        ],
    },
    {
        question: "What should you do when you see a stop sign?",
        answers: [
            { text: "Slow down", correct: false },
            { text: "Stop completely", correct: true },
            { text: "Speed up", correct: false },
            { text: "Honk your horn", correct: false },
        ],
    },
]

let currentQuestionIndex = 0
let currentScore = 0
let answersDisabled = false


// Update total questions 
totalQuestions.textContent = questions.length
maxScore.textContent = questions.length

// event listeners
startBtn.addEventListener("click", startQuiz)
restartBtn.addEventListener("click", restartQuiz)

function startQuiz() {
    console.log("Quiz started")
    currentQuestionIndex = 0
    currentScore = 0

    startScreen.classList.remove("active")
    quizScreen.classList.add("active")
    
    score.textContent = currentScore
    showQuestions()
}

function showQuestions() {
    answersDisabled = false
    const currentQuestion = questions[currentQuestionIndex]
    questionElement.textContent = currentQuestion.question
    answersContainer.innerHTML = ""

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.classList.add("answer-btn")
        button.textContent = answer.text
        button.dataset.correct = answer.correct
        button.addEventListener("click", selectAnswer)
        answersContainer.appendChild(button)
    })

    // Update progress bar
    const progressPercent = (currentQuestionIndex / questions.length) * 100
    progressBar.style.width = `${progressPercent}%`

    // Upgrade current question index
    currentQuestionNr.textContent = currentQuestionIndex + 1
}

function selectAnswer(e) {
    if (answersDisabled) return

    answersDisabled = true

    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        else if (button === selectedButton) {
            button.classList.add("incorrect")
        }
    })

    if (isCorrect) {
        currentScore++
        score.textContent = currentScore
    }

    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++

            showQuestions()
        } else {
            showResult()
        }
    }, 1000)
}

function showResult() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")
    finalScore.textContent = currentScore
    
    resultMessage.textContent = currentScore >= questions.length / 2 ? "Congratulations! You passed the quiz." : "Better luck next time!"
}

function restartQuiz() {
    resultScreen.classList.remove("active")
    startQuiz()
}




