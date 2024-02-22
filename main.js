"use strict";
// Define a class for the game
class IncrementalGame {
    // Constructor to initialize the game state
    constructor() {
        this.score = 0;
        this.clickValue = 1;
        this.autoIncrementValue = 0;
    }
    // Method to handle manual clicking
    click() {
        this.score += this.clickValue;
        this.updateScoreDisplay();
    }
    // Method to handle automatic score increment
    autoIncrement() {
        this.score += this.autoIncrementValue;
        this.updateScoreDisplay();
    }
    // Method to update the score display in the HTML
    updateScoreDisplay() {
        const scoreDisplay = document.getElementById('score');
        if (scoreDisplay) {
            scoreDisplay.innerText = `Score: ${this.score}`;
        }
    }
    // Method to initialize the game
    init() {
        // Set up event listener for manual clicking
        const clickButton = document.getElementById('clickButton');
        if (clickButton) {
            clickButton.addEventListener('click', () => this.click());
        }
        // Start automatic score increment
        setInterval(() => this.autoIncrement(), 1000); // Increment every second
    }
}
// Instantiate the game
const game = new IncrementalGame();
// Initialize the game when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    game.init();
});
