import { Coordinates, MapNode } from "../domain/MapNode";
import { Player } from "../domain/Player";
import { screenDrawer } from "./DrawingUtil";
import { aStar } from "./Pathfinding";
import { sendMessageToLog } from "./UiHelper";

export class MapManager {
  private travelIntervalId: ReturnType<typeof setInterval> | undefined;
  grid: MapNode[][];
  ctx: CanvasRenderingContext2D;
  pathCounter = 0;

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

    screenDrawer.drawMap(this.grid);
  }

  startTravel(destination: Coordinates, player: Player) {
    this.pathCounter = 0;

    // deep copy for modifying new values
    const path = aStar(
      this.getMapNode(player.location.x, player.location.y),
      this.getMapNode(destination.x, destination.y),
      this.grid
    )?.map((node) => ({
      ...node,
    }));
    console.log(path);
    if (path) {
      this.travelIntervalId = setInterval(
        () => this.calculateTravelDistance(path, player),
        1000
      );
    }
  }

  calculateTravelDistance(path: MapNode[], player: Player) {
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

    screenDrawer.drawMap(this.grid);
    screenDrawer.drawPath(path);
    screenDrawer.drawPlayer(player.location);

    sendMessageToLog(`You travelled: ${player.speed}`);

    // If the player reaches the destination, then turn off the repeating interval
    if (this.pathCounter + 1 === path.length) {
      if (this.travelIntervalId !== undefined) {
        clearInterval(this.travelIntervalId);
        this.travelIntervalId = undefined;

        screenDrawer.drawMap(this.grid);
        screenDrawer.drawPlayer(player.location);

        sendMessageToLog("You have arrived!");
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

export function selectTravelOption(optionText: string | null) {
  console.log("selectOption");
  // Remove the 'selected' class from all options
  const travelOptions = document.querySelectorAll(".travel-button");
  travelOptions.forEach((option) => {
    option.classList.remove("selected");
    const confirmButton = option.nextElementSibling;
    if (confirmButton && confirmButton.classList.contains("confirm-button")) {
      confirmButton.remove();
    }
  });

  // Add the 'selected' class to the clicked option
  const selectedOption = Array.from(travelOptions).find(
    (option) => option.textContent === optionText
  )!;
  selectedOption.classList.add("selected");
  const confirmButton = document.createElement("div");
  confirmButton.className = "confirm-button";
  confirmButton.textContent = "Confirm";

  confirmButton.onclick = () => confirmTravelSelection(optionText);

  selectedOption.insertAdjacentElement("afterend", confirmButton);

  // Display the selected option
  document.getElementById("selected-travel-button")!.textContent =
    "Selected option: " + optionText;
}

function confirmTravelSelection(optionText: string | null) {
  console.log("travelling to: ", optionText);
  document.getElementById("selected-travel-button")!.textContent =
    "Selected option: " + optionText;
}
