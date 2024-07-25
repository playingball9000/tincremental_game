export class Player {
  // Properties to keep track of game state
  inventorySpace: number;
  speed: number;
  location: [number, number];

  width = 25;
  height = 25;

  // Constructor to initialize the game state
  constructor() {
    this.inventorySpace = 10;
    this.speed = 50;
    this.location = [0, 0];
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    const px = this.location[0] * 25;
    const py = this.location[1] * 25;
    console.log("drwa play", px, py, this.width / 2, this.height);
    // Draw the body
    ctx.fillStyle = "brown";
    ctx.fillRect(px, py, this.width / 2, this.height);

    ctx.stroke();
  }
}
