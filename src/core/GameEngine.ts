import { MapManager } from "./MapManager";
import { aStar } from "./Pathfinding";
import { MapNode } from "./domain/MapNode";
import { Player } from "./domain/Player";

export class GameEngine {
  // Properties to keep track of game state
  private score: number;
  private clickValue: number;
  private autoIncrementValue: number;
  private player: Player = new Player();
  private mapManager: MapManager = new MapManager();

  // Constructor to initialize the game state
  constructor() {
    this.score = 0;
    this.clickValue = 2;
    this.autoIncrementValue = 0;
  }

  // Method to handle manual clicking
  click() {
    console.log("click1");
    this.score += this.clickValue;
    this.updateScoreDisplay();
  }

  click2() {
    console.log("click2");
    this.score += this.clickValue;
    this.autoIncrementValue += 1;
    // this.updateScoreDisplay();
  }

  // Method to handle automatic score increment
  autoIncrement() {
    console.log("autoIncrement");
    this.score += this.autoIncrementValue;
    this.updateScoreDisplay();

    let distance = this.player.speed;

    while (distance > 0) {}
  }

  // Method to update the score display in the HTML
  updateScoreDisplay() {
    const scoreDisplay = document.getElementById("score");
    if (scoreDisplay) {
      scoreDisplay.innerText = `Score: ${this.score}`;
    }
  }

  // Method to initialize the game
  init() {
    console.log("initialize");
    let storage = localStorage.getItem("goldMinerSave");
    if (storage) {
      let savegame = JSON.parse(storage);
      this.score = savegame.score;
      console.log("loaded: ", this.score);
      this.updateScoreDisplay();
    }

    // Set up event listener for manual clicking
    const clickButton = document.getElementById("clickButton");
    const clickButton2 = document.getElementById("clickButton2");
    if (clickButton) {
      clickButton.addEventListener("click", () => this.click());
    }

    if (clickButton2) {
      clickButton2.addEventListener("click", () => this.click2());
      console.log("clickButton2");
    }
    // Start automatic score increment
    // setInterval(() => this.autoIncrement(), 1000); // Increment every second

    // setInterval(() => {
    //   localStorage.setItem("goldMinerSave", JSON.stringify(this));
    //   console.log("game saved: ", this.score);
    // }, 15000);

    const myDiv = document.getElementById("player-inventory")!;

    // Update the text content of the div
    myDiv.textContent = `x/${this.player.inventorySpace}`;

    this.mapManager.initializeMap();
    this.mapManager.startTravel(
      new MapNode(0, 0, true),
      new MapNode(4, 4, true),
      this.player
    );
  }
}
