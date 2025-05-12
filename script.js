// JavaScript for Advanced Dice Game

// DOM Element Selections =================================
// Get all dice elements on the page
const listOfAllDice = document.querySelectorAll(".die");
// Get all radio input options for scoring
const scoreInputs = document.querySelectorAll("#score-options input");
// Get spans that will show the scores for each option
const scoreSpans = document.querySelectorAll("#score-options span");
// Get elements to display game stats
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
// Get button elements
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

// Game State Variables ==================================
// Array to store current dice values
let diceValuesArr = [];
// Flag to track if rules modal is showing
let isModalShowing = false;
// Variables to track game progress
let score = 0;      // Total score across all rounds
let round = 1;      // Current game round (1-6)
let rolls = 0;      // Number of rolls in current round (max 3)

// Game Functions =======================================

// Function to roll all dice and update UI
const rollDice = () => {
  // Clear previous dice values
  diceValuesArr = [];
  
  // Generate 5 random dice values (1-6)
  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };
  
  // Update the dice display with new values
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

// Function to update the round and rolls display
const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

// Function to enable a score option and set its value
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

// Function to add score and update history
const updateScore = (selectedValue, achieved) => {
  // Add the selected score to total
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;
  
  // Add to score history list
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

// Function to detect three or four of a kind
const getHighestDuplicates = (arr) => {
  // Object to count occurrences of each dice value
  const counts = {};
  
  // Count occurrences of each number
  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }
  
  // Find highest count of duplicates
  let highestCount = 0;
  
  for (const num of arr) {
    const count = counts[num];
    // Check for three of a kind
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    // Check for four of a kind
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }
  
  // Calculate sum of all dice for scoring
  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);
  
  // Enable score options if conditions met
  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }
  
  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }
  
  // Always enable "None" option
  updateRadioOption(5, 0);
};

// Function to detect a full house (3 of a kind + pair)
const detectFullHouse = (arr) => {
  // Count occurrences of each dice value
  const counts = {};
  
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  
  // Check if we have both a three of a kind and a pair
  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);
  
  // Enable full house option if conditions met
  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }
  
  // Always enable "None" option
  updateRadioOption(5, 0);
};

// Function to check for small and large straights
const checkForStraights = (arr) => {
  // Sort and get unique values to check for sequences
  const sortedNumbersArr = arr.sort((a, b) => a - b);
  const uniqueNumbersArr = [...new Set(sortedNumbersArr)];
  const uniqueNumbersStr = uniqueNumbersArr.join("");
  
  // Possible straight combinations
  const smallStraightsArr = ["1234", "2345", "3456"];
  const largeStraightsArr = ["12345", "23456"];
  
  // Check for small straight (4 consecutive values)
  if (smallStraightsArr.some(straight => uniqueNumbersStr.includes(straight))) {
    updateRadioOption(3, 30);
  }
  
  // Check for large straight (5 consecutive values)
  if (largeStraightsArr.includes(uniqueNumbersStr)) {
    updateRadioOption(4, 40);
  }
  
  // Always enable "None" option
  updateRadioOption(5, 0);
};

// Function to reset all radio options
const resetRadioOptions = () => {
  // Disable and uncheck all inputs
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  
  // Clear all score spans
  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

// Function to reset the entire game
const resetGame = () => {
  // Reset all game state variables
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;
  
  // Reset dice display
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
  
  // Reset score display and history
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";
  
  // Reset round and rolls display
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
  
  // Reset radio options
  resetRadioOptions();
};

// Event Listeners ======================================

// Roll dice button event
rollDiceBtn.addEventListener("click", () => {
  // Check if max rolls reached
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    // Increment rolls and continue game
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    
    // Check for scoring combinations
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
    
  }
});

// Rules button toggle event
rulesBtn.addEventListener("click", () => {
  // Toggle modal state
  isModalShowing = !isModalShowing;
  
  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

// Keep score button event
keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;
  
  // Find which option is selected
  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }
  
  // If an option is selected, proceed to next round
  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    
    // Check if game is over (after 6 rounds)
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    // Notify user if no option selected
    alert("Please select an option or roll the dice");
  }
});