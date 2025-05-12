# Advanced Dice Game

A modern implementation of a Yahtzee-style dice game where players strategically roll five dice to achieve various combinations and maximize their score.

## Overview

Advanced Dice Game is a web-based dice game that challenges players to make strategic decisions across six rounds of play. Players can roll dice up to three times per round, aiming to achieve combinations like three-of-a-kind, four-of-a-kind, full house, and straights.

## Features

* **Six-round gameplay** with strategic decision-making
* **Multiple scoring combinations** including three-of-a-kind, four-of-a-kind, full house, small straight, and large straight
* **Three rolls per round** with option to keep score after each roll
* **Visual dice representation** with clean, modern UI
* **Score history tracking** to monitor your progress
* **Responsive design** that works on desktop and mobile devices
* **Interactive rules modal** to help new players understand the game

## How to Play

1. **Roll the Dice**: Click the "Roll the dice" button to start each round
2. **Select a Score**: Choose one of the available scoring options based on your dice combination
3. **Keep Score**: Click "Keep the above selected score" to record your choice and move to the next round
4. **Strategize**: Decide whether to keep your current score or risk another roll (maximum of three rolls per round)
5. **Complete Six Rounds**: After six rounds, your final score is calculated

## Game Rules

* There are a total of six rounds
* You can only roll the dice three times per round
* To start the game, roll the dice
* Then, choose from one of the selected scores or roll the dice again
* If you choose a selected score, you will move to the next round
* If you decline to choose a selected score, you can roll the dice again (up to two more times)

## Scoring System

* **Three of a kind**: Sum of all five dice
* **Four of a kind**: Sum of all five dice
* **Full house**: Three of a kind and a pair - 25 points
* **Small straight**: Four dice with consecutive values - 30 points
* **Large straight**: All five dice with consecutive values - 40 points

## How to Run

Simply open the index.html file in any modern web browser to play the game.

```
# Clone the repository
git clone https://github.com/QuantumDaveLdn/Dice-game.git

# Navigate to the project directory
cd Dice-game

# Open in your browser
open index.html    # Mac
start index.html   # Windows
```

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla)

## Project Structure

```
├── index.html  # Main HTML structure
├── styles.css  # Modern styling and responsive design
├── script.js   # Game logic and event handling
└── README.md   # This file
```

## Game Mechanics

* **Random Dice Generation**: Each roll generates random values between 1-6
* **Combination Detection**: Automatically detects valid scoring combinations
* **Score Tracking**: Maintains a running total of your score
* **Round Management**: Tracks rounds and rolls remaining
* **End Game Logic**: Alerts the player and resets the game after six rounds

## Future Improvements

* Add sound effects for dice rolling and scoring
* Implement animations for dice rolling
* Create a local multiplayer option
* Add a high score system with local storage
* Include additional scoring categories (e.g., Yahtzee, chance)
* Create a more detailed statistics dashboard
* Add different themes and dice styles
* Implement touch controls for better mobile experience

## Learning Journey

May 12, 2025 - Today I strengthened my algorithmic thinking skills while working on this dice game. I learned how to efficiently track game state, implement pattern detection for dice combinations, and create scoring logic using array methods like reduce() and filter(). The project helped me practice DOM manipulation, event handling, and managing complex conditional logic. I've particularly improved my ability to detect patterns within data structures and translate game rules into working code.

## License

This project is open source and available under the MIT License.
