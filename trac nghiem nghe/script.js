const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "Bạn thích làm việc độc lập hay trong môi trường nhóm?",
    answers: [
      { text: "Độc lập", correct: true },
      { text: "Môi trường nhóm", correct: false },
    ],
  },
  {
    question: "Bạn thích tìm hiểu và áp dụng công nghệ mới?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn có khả năng sáng tạo và thích thử nghiệm ý tưởng mới?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn có khả năng giao tiếp và thuyết phục người khác dễ dàng?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn thích làm việc với số liệu, dữ liệu và phân tích chúng?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn thích làm việc với các dự án có tính kỹ thuật cao và cần sự chính xác?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn thích xây dựng và hoàn thiện sản phẩm từ ý tưởng ban đầu đến sản phẩm cuối cùng?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn có khả năng tổ chức và quản lý thời gian tốt?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn thích nắm bắt xu hướng thị trường và tìm cách tiếp cận khách hàng?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
  {
    question: "Bạn thích làm việc ngoài trời và có khả năng làm việc với các công cụ và vật liệu xây dựng?",
    answers: [
      { text: "Có", correct: true },
      { text: "Không", correct: false },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function evaluateScore(scoreA, scoreB) {
  let feedback = "<p> Cảm ơn bạn đã hoàn thành bài trắc nghiệm! Dưới đây là kết quả của bạn </p>";

  if (scoreA >= 7) {
    feedback += "Bạn có thể phù hợp với ngành IT.\n"; //Nếu bạn đã chọn từ 7 câu 'a'
  } else if (scoreB >= 4 && scoreA <= 6) {
    feedback += "Bạn có thể phù hợp với ngành kinh tế.\n"; //Nếu bạn đã chọn từ 4 'b' đến 6 câu 'a'
  } else if (scoreB >= 6 && scoreB <= 4) {
    feedback += "Bạn có thể phù hợp với ngành cơ khí.\n"; //Nếu bạn đã chọn từ 4 'a' đến 6 câu 'b'
  } else if (scoreB >= 7) {
    feedback += "Bạn có thể phù hợp với ngành xây dựng.\n"; //Nếu bạn đã chọn từ 7 câu 'b'
  } else {
    feedback += "Bạn có thể phù hợp với ngành ngôn ngữ anh.\n"; //Trường hợp còn lại
  }

  resultDiv.innerHTML = feedback;
}



function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  evaluateScore(score);
}
