import { Coordinates } from "./MapNode";

export interface Location {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinates;
}
