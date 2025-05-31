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

// Attach click handlers for options
options.forEach((option, idx) => {
  option.addEventListener("click", () => {
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedOption = option.textContent;
  });
});
const questions = [
  "Who is the main protagonist of 'Naruto'?",
  "In 'Attack on Titan', what is the name of the city where the story begins?",
  "Which anime features a character named Goku?",
  "In 'One Piece', what is the name of Luffy's ship?",
  "Who is the creator of 'Dragon Ball'?",
  "In 'Death Note', what is the Shinigami's name who drops the Death Note?",
  "What is the main goal of the Survey Corps in 'Attack on Titan'?",
  "In 'My Hero Academia', what is the name of Deku's mentor?",
  "Which anime is known for the phrase 'I am gonna be King of the Pirates!'?",
  "In 'Fullmetal Alchemist', what are the two brothers' names?",
  "Which anime features a giant robot called Eva Unit-01?",
  "In 'Tokyo Ghoul', what is Kaneki's ghoul alias?",
  "Who is the captain of the Straw Hat Pirates in 'One Piece'?",
  "What is the signature move of Naruto Uzumaki?",
  "Which anime centers around a notebook that can kill anyone whose name is written in it?",
  "In 'Bleach', what type of being is Ichigo Kurosaki?",
  "What is the profession of Light Yagami in 'Death Note' before he obtains the notebook?",
  "Which anime features a character named Sailor Moon?",
  "In 'Dragon Ball Z', who is Goku's main rival?",
  "What is the name of the sword wielded by Inuyasha?",
  "Which anime is set in a high school where students are trained to kill zombies?",
  "In 'Naruto', what is the name of Naruto's demon fox?",
  "Who is the author of the manga 'One Piece'?",
  "In 'My Hero Academia', what quirk does Shoto Todoroki have?",
  "Which anime features the character Edward Elric?",
  "In 'Attack on Titan', what is the main ability of the Armored Titan?",
  "What is the name of the alchemy principle used in 'Fullmetal Alchemist'?",
  "Which anime's opening theme is 'Guren no Yumiya'?",
  "Who is known as the 'White Fang' in 'Tokyo Ghoul'?",
  "In 'Naruto', which clan is famous for the Sharingan?",
  "Which anime features a competition called the Chunin Exams?",
  "In 'One Piece', what is the treasure that pirates are searching for called?",
  "Which anime follows a group called the Phantom Troupe?",
  "What kind of creature is Totoro in the Studio Ghibli movie?",
  "In 'Sword Art Online', what traps players inside a virtual reality game?",
  "Who is the female lead in 'Death Note' known for her love of sweets?",
  "Which anime features a giant fish-shaped spaceship called the Thousand Sunny?",
  "In 'Dragon Ball', who is Goku's son?",
  "What is the name of the antagonist in the first season of 'My Hero Academia'?",
  "Which anime has a story revolving around alchemists and the Philosopher's Stone?",
  "In 'Naruto', who is Naruto's best friend and rival from the Uchiha clan?",
  "Which anime features a character who uses a sword named Zangetsu?",
  "What is the ability called that allows manipulation of shadows in 'Naruto'?",
  "Which anime centers on a detective named L and a mysterious notebook?",
  "In 'Bleach', what is the name of Ichigo's Zanpakuto?",
  "Who is the main villain in 'Attack on Titan' season 1?",
  "Which anime features a giant robot fighting angels in Tokyo-3?",
  "What is the name of the cat-like mascot in 'Sailor Moon'?",
  "In 'One Piece', who is the swordsman of the Straw Hat crew?"
];
const correct_answers=[
  "Naruto Uzumaki",
  "Shiganshina District",
  "Dragon Ball",
  "Going Merry",
  "Akira Toriyama",
  "Ryuk",
  "To explore outside the walls and fight Titans",
  "All Might",
  "One Piece",
  "Edward and Alphonse Elric",
  "Neon Genesis Evangelion",
  "Eyepatch",
  "Monkey D. Luffy",
  "Rasengan",
  "Death Note",
  "Soul Reaper",
  "High school student",
  "Sailor Moon",
  "Vegeta",
  "Tessaiga",
  "Highschool of the Dead",
  "Kurama",
  "Eiichiro Oda",
  "Half-Cold Half-Hot",
  "Fullmetal Alchemist",
  "Armored Titan can harden his skin",
  "Equivalent Exchange",
  "Attack on Titan",
  "Ken Kaneki",
  "Uchiha Clan",
  "Naruto",
  "One Piece",
  "Hunter x Hunter",
  "Forest Spirit",
  "NerveGear",
  "Misa Amane",
  "Thousand Sunny",
  "Gohan",
  "Tomura Shigaraki",
  "Fullmetal Alchemist",
  "Sasuke Uchiha",
  "Ichigo Kurosaki",
  "Shadow Manipulation",
  "Death Note",
  "Zangetsu",
  "Titan Eren Yeager",
  "Neon Genesis Evangelion",
  "Luna",
  "Roronoa Zoro"
];
const incorrect_ans = [
  ["Sasuke Uchiha", "Kakashi Hatake", "Shikamaru Nara"],
  ["Trost District", "Wall Rose", "Wall Maria"],
  ["One Piece", "Bleach", "Fairy Tail"],
  ["Thousand Sunny", "Red Force", "Moby Dick"],
  ["Masashi Kishimoto", "Eiichiro Oda", "Tite Kubo"],
  ["Rem", "Samael", "Enma"],
  ["To protect the king", "To find treasure", "To become the strongest warrior"],
  ["Bakugo", "Endeavor", "Deku"],
  ["Bleach", "Dragon Ball", "Naruto"],
  ["Roy and Riza", "Edward and Winry", "Alphonse and Roy"],
  ["Gundam", "Mazinger Z", "Voltron"],
  ["Kaneki Ken", "Touka Kirishima", "Hinami Fueguchi"],
  ["Zoro", "Sanji", "Usopp"],
  ["Chidori", "Kamehameha", "Hadouken"],
  ["Code Geass", "Tokyo Ghoul", "Parasyte"],
  ["Ninja", "Soul Reaper", "Human"],
  ["College Student", "Teacher", "Detective"],
  ["Sailor Venus", "Sailor Mars", "Sailor Jupiter"],
  ["Frieza", "Piccolo", "Cell"],
  ["Kusanagi", "Excalibur", "Ryumyaku"],
  ["High School DxD", "Another", "Highschool of the Dead"],
  ["Shisui", "Itachi", "Madara"],
  ["Masashi Kishimoto", "Tite Kubo", "Yoshihiro Togashi"],
  ["Super Strength", "Flight", "Telepathy"],
  ["Naruto", "Bleach", "Tokyo Ghoul"],
  ["Colossal Titan", "Beast Titan", "Female Titan"],
  ["Philosopher's Stone", "Sorcerer's Stone", "Alchemist's Gem"],
  ["Naruto", "Bleach", "One Punch Man"],
  ["Touka Kirishima", "Hinami Fueguchi", "Yomo"],
  ["Hyuga Clan", "Senju Clan", "Akimichi Clan"],
  ["Dragon Ball", "Fairy Tail", "One Punch Man"],
  ["Naruto", "Bleach", "My Hero Academia"],
  ["Totoro", "Catbus", "No-Face"],
  ["A virtual reality virus", "A computer virus", "A magic spell"],
  ["L", "Light Yagami", "Ryuk"],
  ["Going Merry", "Red Force", "Black Pearl"],
  ["Trunks", "Goten", "Piccolo"],
  ["Dabi", "Kurogiri", "Himiko Toga"],
  ["Naruto", "Bleach", "Attack on Titan"],
  ["Sasuke Uchiha", "Kakashi Hatake", "Naruto Uzumaki"],
  ["Rukia Kuchiki", "Orihime Inoue", "Yoruichi Shihouin"],
  ["Chidori", "Amaterasu", "Katon"],
  ["Naruto", "Death Note", "Bleach"],
  ["Zabimaru", "Ryujin Jakka", "Senbonzakura"],
  ["Reiner Braun", "Bertolt Hoover", "Eren Yeager"],
  ["Gundam Wing", "Code Geass", "Neon Genesis Evangelion"],
  ["Artemis", "Diana", "Chibi Moon"],
  ["Sanji", "Usopp", "Franky"]
];
function showNext() {
  selectedOption = null;
  ans_result.textContent = "";
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

  // Gather correct and incorrect options
  const correct = correct_answers[q_no];
  const incorrect = incorrect_ans[q_no];
  const allOptions = [correct, ...incorrect];

  // Shuffle options
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  // Display shuffled options
  for (let i = 0; i < options.length; i++) {
    options[i].textContent = allOptions[i];
  }

  current_result.textContent = "";
}


checkBtn.addEventListener('click', () => {
  if (selectedOption === null) {
    not_attempted++;
    ans_result.textContent = "⚠️ Please select an option!";
    ans_result.style.color = "orange";
    return;
  }

  const correct = correct_answers[q_no];

  if (selectedOption === correct) {
    correct_ans++;
    ans_result.textContent = "✅ Correct!";
    ans_result.style.color = "green";
  } else {
    incorrect_ans_co++;
    ans_result.textContent = `❌ Incorrect! Correct answer is: ${correct}`;
    ans_result.style.color = "red";
  }

  current_result.innerHTML = `✔️ Correct: ${correct_ans} | ❌ Incorrect: ${incorrect_ans_co} | ❓ Not Attempted: ${not_attempted}`;
});

want_next.addEventListener('click', showNext);

// Initial question load
showNext();