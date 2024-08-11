import { Coordinates } from "./MapNode";

export interface Location {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
}

interface NPC {
  id: number;
  name: string;
  dialogue: string[];
}

export class City implements Location {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
  npcs: NPC[];

  constructor(
    id: number,
    name: string,
    description: string,
    coordinates: Coordinates,
    npcs: NPC[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.coordinates = coordinates;
    this.npcs = npcs;
  }
}

export class Home implements Location {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
  npcs: NPC[];

  constructor(
    id: number,
    name: string,
    description: string,
    coordinates: Coordinates,
    npcs: NPC[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.coordinates = coordinates;
    this.npcs = npcs;
  }
}
