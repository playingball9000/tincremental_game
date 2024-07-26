import { Coordinates } from "./MapNode";

export class Player {
  // Properties to keep track of game state
  inventorySpace: number;
  speed: number;
  location: Coordinates;

  width = 25;
  height = 25;

  // Constructor to initialize the game state
  constructor() {
    this.inventorySpace = 10;
    this.speed = 50;
    this.location = { x: 0, y: 0 };
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    const px = this.location.x * 25;
    const py = this.location.y * 25;
    console.log("drwa play", px, py, this.width / 2, this.height);
    // Draw the body
    ctx.fillStyle = "brown";
    ctx.fillRect(px, py, this.width / 2, this.height);

    ctx.stroke();
  }
}
