import { Terrain } from "./Terrain";

export class MapNode {
  x: number;
  y: number;
  walkable: boolean;
  g: number;
  h: number;
  f: number;
  parent: MapNode | null;
  terrain: Terrain;

  constructor(
    x: number,
    y: number,
    walkable: boolean,
    g: number = 0,
    h: number = 0,
    parent: MapNode | null = null,
    terrain?: Terrain
  ) {
    this.x = x;
    this.y = y;
    this.walkable = walkable;
    this.g = g;
    this.h = h;
    this.f = g + h;
    this.parent = parent;
    this.terrain = terrain ?? new Terrain("Grass", 90);
  }
}
