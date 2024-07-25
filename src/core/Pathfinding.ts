import { MapNode } from "./domain/MapNode";

function heuristic(a: MapNode, b: MapNode): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(node: MapNode, grid: MapNode[][]): MapNode[] {
  const neighbors: MapNode[] = [];
  const directions = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0], // Up, Right, Down, Left
  ];

  for (const [dx, dy] of directions) {
    const x = node.x + dx;
    const y = node.y + dy;

    if (
      x >= 0 &&
      x < grid[0].length &&
      y >= 0 &&
      y < grid.length &&
      grid[y][x].walkable
    ) {
      neighbors.push(grid[y][x]);
    }
  }

  return neighbors;
}

export function aStar(
  start: MapNode,
  goal: MapNode,
  grid: MapNode[][]
): MapNode[] | null {
  const openList: MapNode[] = [];
  const closedList: Set<string> = new Set();

  openList.push(start);

  while (openList.length > 0) {
    let lowestIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    const currentNode = openList[lowestIndex];

    if (currentNode.x === goal.x && currentNode.y === goal.y) {
      const path: MapNode[] = [];
      let temp: MapNode | null = currentNode;
      while (temp) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    openList.splice(lowestIndex, 1);
    closedList.add(`${currentNode.x},${currentNode.y}`);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (closedList.has(`${neighbor.x},${neighbor.y}`)) {
        continue;
      }

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (
        !openList.some((node) => node.x === neighbor.x && node.y === neighbor.y)
      ) {
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor, goal);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbor.parent = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  return null; // No path found
}
