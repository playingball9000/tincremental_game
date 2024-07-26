import { Coordinates, MapNode } from "./domain/MapNode";
import { Player } from "./domain/Player";
import { aStar } from "./Pathfinding";

export class MapManager {
  private intervalId: ReturnType<typeof setInterval> | undefined;
  grid: MapNode[][];
  ctx: CanvasRenderingContext2D;
  pathCounter = 0;
  cellSize = 25;

  constructor() {
    this.grid = [];
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.ctx = canvas.getContext("2d")!;
  }

  initializeMap() {
    this.grid = [
      [
        new MapNode(0, 0, true),
        new MapNode(1, 0, true),
        new MapNode(2, 0, true),
        new MapNode(3, 0, true),
        new MapNode(4, 0, true),
      ],
      [
        new MapNode(0, 1, true),
        new MapNode(1, 1, false),
        new MapNode(2, 1, false),
        new MapNode(3, 1, false),
        new MapNode(4, 1, true),
      ],
      [
        new MapNode(0, 2, true),
        new MapNode(1, 2, true),
        new MapNode(2, 2, true),
        new MapNode(3, 2, false),
        new MapNode(4, 2, true),
      ],
      [
        new MapNode(0, 3, true),
        new MapNode(1, 3, false),
        new MapNode(2, 3, true),
        new MapNode(3, 3, true),
        new MapNode(4, 3, true),
      ],
      [
        new MapNode(0, 4, true),
        new MapNode(1, 4, true),
        new MapNode(2, 4, true),
        new MapNode(3, 4, true),
        new MapNode(4, 4, true),
      ],
    ];

    this.drawMap(this.grid, this.ctx);
  }

  startTravel(
    start: Coordinates,
    destination: Coordinates,
    // grid: MapNode[][],
    player: Player
  ) {
    this.pathCounter = 0;

    // deep copy for modifying new values
    const path = aStar(
      this.getMapNode(start.x, start.y),
      this.getMapNode(destination.x, destination.y),
      this.grid
    )?.map((node) => ({
      ...node,
    }));
    console.log(path);
    if (path) {
      this.intervalId = setInterval(
        () => this.calculateTravelDistance(path, player),
        1000
      );
    }
  }

  calculateTravelDistance(path: MapNode[], player: Player) {
    console.log("calculateTravelDistance");
    let travelling = player.speed;

    while (travelling > 0 && this.pathCounter < path.length) {
      // while still have travelling left and not at destination
      travelling = travelling - path[this.pathCounter].terrain.units;
      if (travelling < 0) {
        // if units greater than travelling amount, then the negative value will be what's left of the units in that terrain
        path[this.pathCounter].terrain.units = Math.abs(travelling);
      } else if (travelling >= 0 && this.pathCounter < path.length - 1) {
        // if there are travelling units left and more nodes in the path, increment and keep going
        this.pathCounter++;
      }
    }
    // console.log(
    //   travelling,
    //   path[this.pathCounter].terrain.units,
    //   this.pathCounter
    // );

    // update player location to current location on path
    player.location = {
      x: path[this.pathCounter].coordinates.x,
      y: path[this.pathCounter].coordinates.y,
    };
    console.log(player.location);

    this.drawMap(this.grid, this.ctx);
    this.drawPath(path, this.ctx);
    player.drawPlayer(this.ctx);

    if (this.pathCounter + 1 === path.length) {
      if (this.intervalId !== undefined) {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
    }
  }

  drawMap(grid: MapNode[][], ctx: CanvasRenderingContext2D) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        ctx.fillStyle = grid[y][x].walkable ? "white" : "black";
        ctx.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
        ctx.strokeRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  drawPath(path: MapNode[] | null, ctx: CanvasRenderingContext2D) {
    if (path) {
      ctx.fillStyle = "green";
      for (const node of path) {
        ctx.fillRect(
          node.coordinates.x * this.cellSize,
          node.coordinates.y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  getMapNode(x: number, y: number): MapNode {
    if (x < 0 || x >= this.grid[0].length || y < 0 || y >= this.grid.length) {
      throw new Error("Coordinates out of bounds");
    }
    return this.grid[y][x];
  }
}
