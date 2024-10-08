import { MapManager } from "./MapManager";
import { Player } from "../domain/Player";
import { ScreenDrawer } from "./DrawingUtil";
import { City, Home } from "../domain/Location";
import { generateTravelButtonsDiv } from "./UiHelper";

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
    console.log("initialize game");
    const screenDrawer = new ScreenDrawer();

    const home = new Home(1, "Home", "Your Home", { x: 0, y: 0 }, []);
    const town = new City(2, "Town", "Small town", { x: 2, y: 3 }, []);
    const city = new City(3, "City", "Bustling city", { x: 4, y: 4 }, []);

    this.mapManager.locations = [home, town, city];
    generateTravelButtonsDiv(this.mapManager.locations, "column1");

    let storage = localStorage.getItem("goldMinerSave");
    if (storage) {
      let savegame = JSON.parse(storage);
      this.score = savegame.score;
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
    }

    const myDiv = document.getElementById("player-inventory")!;

    // Update the text content of the div
    myDiv.textContent = `x/${this.player.inventorySpace}`;

    this.mapManager.initializeMap();
    this.mapManager.startTravel({ x: 4, y: 4 }, this.player);
  }
}
