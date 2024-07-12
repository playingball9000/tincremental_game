import { GameEngine } from "./core/gameEngine";

  // Instantiate the game
  const game = new GameEngine();
  
  // Initialize the game when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    game.init();
  });
  