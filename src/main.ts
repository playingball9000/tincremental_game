import { GameEngine } from "./core/GameEngine";
import { addTravelButtonsListeners } from "./core/TravelEventListeners";

// Instantiate the game
const game = new GameEngine();

// Initialize the game when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  addTravelButtonsListeners();
  game.init();
});
