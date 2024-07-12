export class GameEngine {
  // Properties to keep track of game state
  private score: number;
  private clickValue: number;
  private autoIncrementValue: number;

  // Constructor to initialize the game state
  constructor() {
    this.score = 0;
    this.clickValue = 2;
    this.autoIncrementValue = 0;
  }

  // Method to handle manual clicking
  click() {
    console.log("click1")
    this.score += this.clickValue;
    this.updateScoreDisplay();
  }

  click2() {
    console.log("click2")
    this.score += this.clickValue;
    // this.autoIncrementValue += 1;
    this.updateScoreDisplay();
  }

  // Method to handle automatic score increment
  autoIncrement() {
    console.log("autoIncrement")
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
    console.log("initialize")
    // Set up event listener for manual clicking
    const clickButton = document.getElementById('clickButton');
    const clickButton2 = document.getElementById('clickButton2');
    if (clickButton) {
      clickButton.addEventListener('click', () => this.click());
    }

    if (clickButton2){
      clickButton2.addEventListener('click', () => this.click2());

    }
    // Start automatic score increment
    setInterval(() => this.autoIncrement(), 1000); // Increment every second
  }
}