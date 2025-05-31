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
  "What does ABS stand for in a car?",
  "Which company manufactures the Mustang?",
  "What type of fuel do electric vehicles use?",
  "Which country is home to the car manufacturer Toyota?",
  "What is the name of the car part that charges the battery while the engine runs?",
  "What does SUV stand for?",
  "Which car brand has a prancing horse as its logo?",
  "Which company produces the luxury car model 'S-Class'?",
  "What is the typical shape of a Formula 1 car?",
  "What does RPM measure in a car engine?",
  "Which of these is NOT a German car brand?",
  "What kind of engine does a Tesla Model S have?",
  "Which car company owns Lamborghini?",
  "What is the world's best-selling car model?",
  "What does 'MPG' stand for in car specs?",
  "Which car part helps cool the engine?",
  "Which brand produces the Civic?",
  "What is the legal document that proves car ownership?",
  "What is the function of a catalytic converter?",
  "What kind of transmission requires a clutch pedal?",
  "Which car brand uses the slogan 'The Ultimate Driving Machine'?",
  "Which car company makes the Camry?",
  "What does 4WD stand for?",
  "What’s the purpose of a muffler?",
  "What car brand makes the Corvette?",
  "What does ECU stand for in a car?",
  "Which fuel is best for high-compression engines?",
  "Which of the following is a type of hybrid vehicle?",
  "What does the “check engine” light usually indicate?",
  "What is hydroplaning?",
  "Which tire brand is known for the 'Michelin Man' mascot?",
  "Which part connects the wheels to the car’s suspension?",
  "What is the term for the number of cylinders in an engine?",
  "Which country makes the brand Hyundai?",
  "What is a speed limiter in a car?",
  "Which company produces the luxury brand Lexus?",
  "Which car part stores electrical energy?",
  "Which system controls steering effort in modern cars?",
  "Which brand makes the popular SUV model 'CR-V'?",
  "What does the 'P' on an automatic gear shift stand for?",
  "Which is a common sign of brake failure?",
  "Which sensor measures oxygen levels in the exhaust?",
  "What is torque measured in?",
  "What does AWD stand for?",
  "Which brand's logo consists of four interlocked rings?",
  "What’s the main use of engine oil?",
  "Which of these is a car body style?",
  "Which is a fuel-saving driving habit?",
  "Which safety feature inflates during a crash?",
  "Which part allows you to change gears in a manual car?"
];
const correct_answers = [
  "Anti-lock Braking System",
  "Ford",
  "Electricity",
  "Japan",
  "Alternator",
  "Sport Utility Vehicle",
  "Ferrari",
  "Mercedes-Benz",
  "Open-wheel, low-profile",
  "Revolutions Per Minute",
  "Volvo",
  "Electric Motor",
  "Volkswagen",
  "Toyota Corolla",
  "Miles Per Gallon",
  "Radiator",
  "Honda",
  "Vehicle Title",
  "Reduces emissions",
  "Manual Transmission",
  "BMW",
  "Toyota",
  "Four-Wheel Drive",
  "Reduce engine noise",
  "Chevrolet",
  "Engine Control Unit",
  "Premium gasoline",
  "Toyota Prius",
  "A problem with engine systems",
  "Sliding on wet roads",
  "Michelin",
  "Axle",
  "Engine configuration",
  "South Korea",
  "Limits top speed",
  "Toyota",
  "Battery",
  "Power Steering",
  "Honda",
  "Park",
  "Spongy brake pedal",
  "Oxygen Sensor",
  "Newton-meters",
  "All-Wheel Drive",
  "Audi",
  "Lubricate engine parts",
  "Coupe",
  "Smooth acceleration",
  "Airbags",
  "Clutch"
];
const incorrect_ans = [
  ["Auto Brake System", "Anti-Burst System", "Automatic Balance Suspension"],
  ["Chevrolet", "Nissan", "Toyota"],
  ["Petrol", "Diesel", "CNG"],
  ["Germany", "South Korea", "China"],
  ["Radiator", "Battery", "Compressor"],
  ["Standard Utility Van", "Super Utility Vehicle", "Speed Utility Van"],
  ["Porsche", "Lamborghini", "Bugatti"],
  ["BMW", "Lexus", "Audi"],
  ["Boxy SUV", "Hatchback", "Sedan"],
  ["Rotations Per Mile", "Resistance Per Motion", "Revolutions Per Movement"],
  ["Audi", "BMW", "Mercedes-Benz"],
  ["V8 Engine", "Hybrid Engine", "Turbocharged Engine"],
  ["Ferrari", "Ford", "Peugeot"],
  ["Volkswagen Beetle", "Honda Accord", "Ford F-150"],
  ["Miles per Gear", "Motor Power Grade", "Maximum Petrol Gallons"],
  ["Battery", "Fuel Injector", "Gearbox"],
  ["Toyota", "Mazda", "Suzuki"],
  ["License Plate", "Driver’s License", "Insurance Card"],
  ["Increase horsepower", "Filter oil", "Cool the exhaust"],
  ["Automatic Transmission", "CVT", "Tiptronic"],
  ["Mercedes", "Toyota", "Audi"],
  ["Nissan", "Mazda", "Ford"],
  ["Four-Wheel Drift", "Fuel-Wise Drive", "Full-Width Differential"],
  ["Cool the engine", "Filter oil", "Increase speed"],
  ["Ford", "Dodge", "Tesla"],
  ["Electronic Control Unit", "Engine Circuit Unit", "Electric Charging Unit"],
  ["Regular gasoline", "Diesel", "Kerosene"],
  ["Tesla Model S", "Nissan Leaf", "Chevy Bolt"],
  ["Low fuel warning", "Oil change needed", "Low tire pressure"],
  ["Driving in snow", "Turning sharply", "Drifting"],
  ["Pirelli", "Bridgestone", "Goodyear"],
  ["Suspension Spring", "Shock Absorber", "Driveshaft"],
  ["Horsepower", "Camshaft size", "Displacement"],
  ["Japan", "Germany", "India"],
  ["Increases fuel economy", "Increases horsepower", "Monitors battery"],
  ["Mazda", "Nissan", "Hyundai"],
  ["Alternator", "Capacitor", "Ignition Coil"],
  ["Alternator", "Suspension", "Fuel Injection"],
  ["Toyota", "Mazda", "Ford"],
  ["Parking", "Pedal", "Power"],
  ["ABS warning light", "High engine noise", "Tire squeal"],
  ["Temperature Sensor", "Fuel Sensor", "Speed Sensor"],
  ["Horsepower", "RPM", "PSI"],
  ["All-Wheel Drift", "Axle Wheel Drive", "Automatic Wheel Drive"],
  ["Volkswagen", "BMW", "Peugeot"],
  ["Cool down the tires", "Charge the battery", "Power the radio"],
  ["Chassis", "Cabin", "Transmission"],
  ["Sudden braking", "Aggressive turns", "Rapid acceleration"],
  ["Seatbelt", "Shock absorber", "Cruise control"],
  ["Brake", "Gear lever", "Accelerator"]
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