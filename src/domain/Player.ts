import { Coordinates } from "./MapNode";

export class Player {
  // Properties to keep track of game state
  inventorySpace: number;
  speed: number;
  location: Coordinates;

  // Constructor to initialize the game state
  constructor() {
    this.inventorySpace = 10;
    this.speed = 50;
    this.location = { x: 0, y: 0 };
  }
}
