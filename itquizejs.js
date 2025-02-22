const questions = [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0 },
    { question: "What is the brain of the computer?", options: ["RAM", "CPU", "Hard Drive"], answer: 1 },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style System"], answer: 0 },
    { question: "Which programming language is used for web interactivity?", options: ["Python", "Java", "JavaScript"], answer: 2 },
    { question: "Which protocol is used for secure data transfer over the internet?", options: ["HTTP", "FTP", "HTTPS"], answer: 2 },
    { question: "Which of the following is NOT an operating system?", options: ["Windows", "Linux", "Java"], answer: 2 },
    { question: "What does the acronym 'IP' stand for in networking?", options: ["Internet Protocol", "Internal Protocol", "Internet Program"], answer: 0 },
    { question: "Which of these is a type of database management system?", options: ["MySQL", "Notepad", "Photoshop"], answer: 0 },
    { question: "What does 'HTTP' stand for in a web address?", options: ["HyperText Transfer Protocol", "HomeText Transfer Protocol", "Hyper Transfer Protocol"], answer: 0 },
    { question: "In programming, what does 'API' stand for?", options: ["Application Programming Interface", "Automated Process Information", "Accessible Programming Interface"], answer: 0 }
];

let participantName = "";
let currentQuestion = 0;
let score = 0;
let totalParticipants = 0;
let scoreDistribution = { "10": 0, "9": 0, "8": 0, "7": 0, "6": 0, "5 or less": 0 };

function startQuiz() {
    const nameInput = document.getElementById("participantName").value.trim();
    if (!nameInput) {
        alert("Please enter your name to start!");
        return;
    }
    participantName = nameInput;
    document.getElementById("registration").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    const quiz = questions[currentQuestion];
    document.getElementById("question").innerText = quiz.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    quiz.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, selectedBtn) {
    const correctIndex = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option-btn");
    
    allOptions.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctIndex) {
            btn.classList.add("correct");
        }
        if (index === selectedIndex && selectedIndex !== correctIndex) {
            btn.classList.add("wrong");
        }
    });
    
    if (selectedIndex === correctIndex) {
        score++;
    }
    document.getElementById("nextBtn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById("nextBtn").classList.add("hidden");
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("resultText").innerText = `Thank you, ${participantName}! You scored ${score} out of ${questions.length}.`;
    
    totalParticipants++;
    if (score >= 10) scoreDistribution["10"]++;
    else if (score >= 9) scoreDistribution["9"]++;
    else if (score >= 8) scoreDistribution["8"]++;
    else if (score >= 7) scoreDistribution["7"]++;
    else if (score >= 6) scoreDistribution["6"]++;
    else scoreDistribution["5 or less"]++;
    
    generatePieChart();
}

function generatePieChart() {
    const ctx = document.getElementById("scoreChart").getContext("2d");
    
    if (window.myChart) {
        window.myChart.destroy();
    }
    
    let dataValues = Object.values(scoreDistribution).map(count => (count / totalParticipants) * 100);
    
    window.myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["10/10", "9/10", "8/10", "7/10", "6/10", "5 or less"],
            datasets: [{
                data: dataValues,
                backgroundColor: ["green", "lightgreen", "yellowgreen", "yellow", "orange", "red"],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}

function retakeQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("registration").classList.remove("hidden");
    document.getElementById("participantName").value = "";
}

