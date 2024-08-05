import { MapNode } from "../domain/MapNode";

function heuristic(a: MapNode, b: MapNode): number {
  return (
    Math.abs(a.coordinates.x - b.coordinates.x) +
    Math.abs(a.coordinates.y - b.coordinates.y)
  );
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
    const x = node.coordinates.x + dx;
    const y = node.coordinates.y + dy;

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

    if (
      currentNode.coordinates.x === goal.coordinates.x &&
      currentNode.coordinates.y === goal.coordinates.y
    ) {
      const path: MapNode[] = [];
      let temp: MapNode | null = currentNode;
      while (temp) {
        path.push(temp);
        temp = temp.parent;
      }
      return path.reverse();
    }

    openList.splice(lowestIndex, 1);
    closedList.add(`${currentNode.coordinates.x},${currentNode.coordinates.y}`);

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (
        closedList.has(`${neighbor.coordinates.x},${neighbor.coordinates.y}`)
      ) {
        continue;
      }

      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;

      if (
        !openList.some(
          (node) =>
            node.coordinates.x === neighbor.coordinates.x &&
            node.coordinates.y === neighbor.coordinates.y
        )
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
