const want_next = document.querySelector('#want_next');
const counter = document.querySelector('#counter');
const curr_ques = document.querySelector('#curr_ques');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const checkBtn = document.querySelector('.btn-success');
const exitBtn = document.querySelector('.btn-danger');
const viewBtn = document.querySelector('.btn-warning');
const ans_result = document.getElementById('ans_result');
const current_result = document.getElementById('current_result');

const options = [option1, option2, option3, option4];

let q_no = -1;
let correct_ans = 0;
let incorrect_ans_co = 0;
let not_attempted = 0;
let selectedOption = null;

const questions = [];
const correct_answers = [];
const incorrect_ans = [];

function giveRandom() {
  return Math.floor(Math.random() * 4);
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const req = new XMLHttpRequest();
req.onload = function () {
  const obj = JSON.parse(this.responseText);
  for (let i = 0; i < 50; i++) {
    questions.push(decodeHTML(obj.results[i].question));
    correct_answers.push(decodeHTML(obj.results[i].correct_answer));
    const wrong = obj.results[i].incorrect_answers.map(ans => decodeHTML(ans));
    incorrect_ans.push(wrong);
  }
  showNext();
};
req.onerror = function () {
  curr_ques.textContent = "❌ Failed to load questions.";
};
req.open("GET", "https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple");
req.send();

function showNext() {
  selectedOption = null;
  document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
  q_no++;

  if (q_no >= questions.length) {
    curr_ques.textContent = "🎉 Quiz Completed!";
    counter.textContent = "";
    ans_result.innerHTML = `<strong>Final Score:</strong> ${correct_ans} / ${questions.length}`;
    ans_result.style.color = "#00ffaa";
    document.querySelector('.options').style.display = "none";
    want_next.disabled = true;
    checkBtn.disabled = true;
    return;
  }

  counter.textContent = `Question ${q_no + 1}`;
  curr_ques.textContent = questions[q_no];

  const correct = correct_answers[q_no];
  const incorrect = incorrect_ans[q_no];
  let tempOptions = [...incorrect];
  const randomIndex = giveRandom();
  tempOptions.splice(randomIndex, 0, correct);

  for (let i = 0; i < 4; i++) {
    options[i].textContent = tempOptions[i];
  }

  ans_result.textContent = "";
}

window.selectOption = function (el) {
  document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  selectedOption = el.textContent;
};

checkBtn.addEventListener('click', function () {
  if (!selectedOption) {
    ans_result.textContent = "⚠️ Please select an option.";
    ans_result.style.color = "#ffc107";
    return;
  }

  if (selectedOption === correct_answers[q_no]) {
    correct_ans++;
    ans_result.textContent = "✅ Correct!";
    ans_result.style.color = "#00ffae";
  } else {
    incorrect_ans_co++;
    ans_result.textContent = `❌ Wrong! Correct: ${correct_answers[q_no]}`;
    ans_result.style.color = "#ff4b5c";
  }

  updateLiveScore();
});

want_next.addEventListener('click', function () {
  if (!selectedOption) {
    not_attempted++;
  }
  showNext();
});

exitBtn.addEventListener('click', function () {
  // Attempt to close window, fallback to redirect
  window.close();
  window.location.href = "https://www.google.com";
});

viewBtn.addEventListener('click', function () {
  const total_attempted = correct_ans + incorrect_ans_co;
  current_result.innerHTML = `
    ✅ Correct: ${correct_ans}<br>
    ❌ Incorrect: ${incorrect_ans_co}<br>
    ❓ Not Attempted: ${not_attempted}<br>
    🔢 Total Attempted: ${total_attempted}<br>
    📄 Total Questions Seen: ${q_no + 1}
  `;
});

function updateLiveScore() {
  const total_attempted = correct_ans + incorrect_ans_co;
  current_result.innerHTML = `
    ✅ Correct: ${correct_ans} |
    ❌ Incorrect: ${incorrect_ans_co} |
    ❓ Not Attempted: ${not_attempted}
  `;
}