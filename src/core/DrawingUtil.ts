import { CELL_SIZE } from "../constants/Constants";
import { Coordinates, MapNode } from "../domain/MapNode";

export class ScreenDrawer {
  ctx: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d")!;

    // eventBus.subscribe(GameEvent.PLAYER_MOVED, this.drawPlayer.bind(this));
    // eventBus.subscribe(GameEvent.MAP_UPDATED, this.drawMap.bind(this));
  }

  drawPlayer(coordinates: Coordinates): void {
    console.log(
      `Drawing player at position (${coordinates.x}, ${coordinates.y})`
    );
    const px = coordinates.x * CELL_SIZE;
    const py = coordinates.y * CELL_SIZE;
    console.log("draw play", px, py, CELL_SIZE / 2, CELL_SIZE);
    // Draw the body
    this.ctx.fillStyle = "brown";
    this.ctx.fillRect(px, py, CELL_SIZE / 2, CELL_SIZE);

    this.ctx.stroke();
  }

  drawMap(data: any): void {
    console.log("Drawing map with data", data);
    const grid = data as MapNode[][];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        this.ctx.fillStyle = grid[y][x].walkable ? "white" : "black";
        this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        this.ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  drawPath(path: MapNode[] | null) {
    if (path) {
      this.ctx.fillStyle = "green";
      for (const node of path) {
        this.ctx.fillRect(
          node.coordinates.x * CELL_SIZE,
          node.coordinates.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }
  }
}

export const screenDrawer = new ScreenDrawer();
