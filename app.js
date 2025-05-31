const next_ques = document.querySelector('#next');
const ques = document.querySelector('#question');
const option1 = document.querySelector('#o1');
const option2 = document.querySelector('#o2');
const option3 = document.querySelector('#o3');
const option4 = document.querySelector('#o4');
const check_ans = document.querySelector('#check');
const options = [option1, option2, option3, option4];
const statuss = document.querySelector('#status');
const questionCounter = document.querySelector('#question-counter');
const exitBtn = document.querySelector('#exit');
const resultSection = document.querySelector('#result-section');
const scoreText = document.querySelector('#score');
const percentageText = document.querySelector('#percentage');
const restartBtn = document.querySelector('#restart');

let correct_ans = 0;
let incorrect_ans = 0;
let not_attempted = 0;

function giveRandom() {
  return Math.floor(Math.random() * 4);
}

let now_ques = -1;
let questions = [];
let correct_idx = -1;
let user_ans = null;
let quizEnded = false;

// Attach one-time click listeners to all options
options.forEach((opt, index) => {
  opt.addEventListener('click', function () {
    if (quizEnded) return; // no selection after quiz end
    // Remove highlights from all
    options.forEach(o => o.classList.remove('bg-info', 'text-white'));
    // Highlight selected
    this.classList.add('bg-info', 'text-white');
    user_ans = index;
  });
});

// Check answer button click
check_ans.addEventListener('click', function () {
  if (quizEnded) return;
  if (user_ans === null) {
    statuss.textContent = "⚠️ Please select an option!";
    statuss.classList.add("text-danger");
    statuss.classList.remove("text-success");
    return;
  }

  // Disable options after checking
  options.forEach(o => o.style.pointerEvents = 'none');

  if (user_ans === correct_idx) {
    correct_ans++;
    statuss.textContent = "✅ Correct Answer!";
    statuss.classList.add("text-success");
    statuss.classList.remove("text-danger");
  } else {
    incorrect_ans++;
    statuss.textContent = "❌ Incorrect Answer!";
    statuss.classList.add("text-danger");
    statuss.classList.remove("text-success");
    // Highlight correct answer in green
    options[correct_idx].classList.add('bg-success', 'text-white');
  }
});

// Next question button click
next_ques.addEventListener('click', function () {
  if (quizEnded) return;

  statuss.textContent = "";
  statuss.classList.remove("text-danger", "text-success");

  // If user did not answer the previous question and tried to go next, count as not attempted
  if (user_ans === null && now_ques >= 0) {
    not_attempted++;
  }

  now_ques++;
  if (now_ques >= questions.length) {
    showResults();
    return;
  }

  user_ans = null;
  const q = questions[now_ques];
  ques.innerHTML = decodeHtml(q.question);

  const idx = giveRandom();
  correct_idx = idx;

  let curr = 0;
  for (let j = 0; j < 4; j++) {
    if (j === idx) {
      options[j].querySelector('strong').textContent = decodeHtml(q.correct_answer);
    } else {
      options[j].querySelector('strong').textContent = decodeHtml(q.incorrect_answers[curr++]);
    }
    options[j].classList.remove('bg-info', 'text-white', 'bg-success');
    options[j].style.pointerEvents = 'auto';
  }

  updateQuestionCounter();
});

// Exit button click
exitBtn.addEventListener('click', function () {
  if (confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
    location.reload();
  }
});

// Restart button click on result screen
restartBtn.addEventListener('click', () => {
  // Reset all stats and restart quiz
  correct_ans = 0;
  incorrect_ans = 0;
  not_attempted = 0;
  now_ques = -1;
  quizEnded = false;

  // Hide results section and show quiz card
  resultSection.style.display = 'none';
  document.querySelector('.quiz-card').style.display = 'block';

  // Reset UI for first question
  statuss.textContent = "";
  statuss.classList.remove("text-danger", "text-success");
  options.forEach(o => {
    o.classList.remove('bg-info', 'text-white', 'bg-success');
    o.style.pointerEvents = 'auto';
  });
  user_ans = null;

  next_ques.click();
});

// Update question counter text
function updateQuestionCounter() {
  questionCounter.textContent = `Question ${now_ques + 1} of ${questions.length}`;
}

// Show results with pie chart
function showResults() {
  quizEnded = true;

  // Hide quiz card and show results section
  document.querySelector('.quiz-card').style.display = 'none';
  resultSection.style.display = 'block';

  const total = questions.length;
  const percentage = ((correct_ans / total) * 100).toFixed(2);

  scoreText.textContent = `Correct: ${correct_ans} | Incorrect: ${incorrect_ans} | Not Attempted: ${not_attempted}`;
  percentageText.textContent = `Your Score: ${percentage}%`;

  // Render chart
  const ctx = document.getElementById('resultChart').getContext('2d');

  // Clear previous chart if any
  if(window.resultChartInstance) {
    window.resultChartInstance.destroy();
  }

  window.resultChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Incorrect', 'Not Attempted'],
      datasets: [{
        data: [correct_ans, incorrect_ans, not_attempted],
        backgroundColor: ['#198754', '#dc3545', '#ffc107'],
        borderColor: '#fff',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 16 }
          }
        },
        tooltip: {
          callbacks: {
            label: context => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percent = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percent}%)`;
            }
          }
        }
      }
    }
  });
}

// Decode HTML entities from API responses
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Fetch questions and initialize quiz
const req = new XMLHttpRequest();
req.onload = function () {
  const res = JSON.parse(this.responseText);
  questions = res.results;

  // Initialize question counter and load first question
  updateQuestionCounter();
  next_ques.click();
};

req.onerror = function () {
  console.log("ERROR fetching data!");
  ques.textContent = "Failed to load questions.";
};

req.open("GET", "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple");
req.send();