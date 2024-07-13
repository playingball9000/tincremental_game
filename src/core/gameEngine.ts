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
    setInterval(() => this.autoIncrement(), 1000); // Increment every second

    setInterval(() => {
      localStorage.setItem("goldMinerSave", JSON.stringify(this));
      console.log("game saved: ", this.score);
    }, 15000);

    // const canvas = document.getElementById("mapCanvas") as HTMLCanvasElement;
    // const ctx = canvas.getContext("2d")!;

    // // Draw plains
    // ctx.fillStyle = "#98FB98"; // Light green color for plains
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // // Draw forests
    // function drawForest(x: number, y: number, width: number, height: number) {
    //   ctx.fillStyle = "#228B22"; // Forest green
    //   ctx.fillRect(x, y, width, height);
    // }
    // drawForest(50, 50, 200, 100);
    // drawForest(600, 400, 150, 150);

    // // Draw mountains
    // function drawMountain(x: number, y: number, size: number) {
    //   ctx.fillStyle = "#A9A9A9"; // Dark gray
    //   ctx.beginPath();
    //   ctx.moveTo(x, y);
    //   ctx.lineTo(x - size / 2, y + size);
    //   ctx.lineTo(x + size / 2, y + size);
    //   ctx.closePath();
    //   ctx.fill();
    // }
    // drawMountain(400, 200, 100);
    // drawMountain(500, 250, 120);
    // drawMountain(450, 150, 80);

    // // Draw rivers
    // function drawRiver(path: string | any[]) {
    //   ctx.strokeStyle = "#1E90FF"; // Dodger blue
    //   ctx.lineWidth = 5;
    //   ctx.beginPath();
    //   for (let i = 0; i < path.length; i++) {
    //     if (i === 0) {
    //       ctx.moveTo(path[i].x, path[i].y);
    //     } else {
    //       ctx.lineTo(path[i].x, path[i].y);
    //     }
    //   }
    //   ctx.stroke();
    // }
    // drawRiver([
    //   { x: 100, y: 0 },
    //   { x: 120, y: 100 },
    //   { x: 200, y: 200 },
    //   { x: 300, y: 300 },
    //   { x: 400, y: 600 },
    // ]);

    // // Draw cities
    // function drawCity(x: number, y: number, name: string) {
    //   ctx.fillStyle = "#FF4500"; // Orange red
    //   ctx.beginPath();
    //   ctx.arc(x, y, 10, 0, 2 * Math.PI);
    //   ctx.fill();
    //   ctx.fillStyle = "black";
    //   ctx.font = "16px Arial";
    //   ctx.fillText(name, x + 15, y + 5);
    // }
    // drawCity(150, 150, "City A");
    // drawCity(600, 100, "City B");
    // drawCity(700, 500, "City C");
  }
}
