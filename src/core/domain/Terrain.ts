export class Terrain {
  name: string;
  //   difficulty: number; // A numerical value representing how difficult the terrain is to traverse
  //   isSlippery: boolean; // Indicates if the terrain is slippery
  //   isSteep: boolean; // Indicates if the terrain is steep
  //   isRough: boolean; // Indicates if the terrain is rough
  //   weatherEffect: string; // Describes the effect of weather on the terrain (e.g., rain, snow)
  //   visibility: number; // A numerical value representing how visible the terrain is (e.g., fog)
  units: number; // Length of the terrain that the player needs to traverse

  constructor(
    name: string,
    // difficulty: number,
    // isSlippery: boolean,
    // isSteep: boolean,
    // isRough: boolean,
    // weatherEffect: string,
    // visibility: number,
    units: number
  ) {
    this.name = name;
    // this.difficulty = difficulty;
    // this.isSlippery = isSlippery;
    // this.isSteep = isSteep;
    // this.isRough = isRough;
    // this.weatherEffect = weatherEffect;
    // this.visibility = visibility;
    this.units = units;
  }

  //   getTravelTime(baseSpeed: number): number {
  //     // Calculate travel time based on base speed and terrain modifiers
  //     let speedModifier = 1;

  //     if (this.isSlippery) speedModifier *= 0.7;
  //     if (this.isSteep) speedModifier *= 0.5;
  //     if (this.isRough) speedModifier *= 0.8;

  //     // Weather effect can further reduce visibility and affect speed
  //     if (this.weatherEffect === "rain") speedModifier *= 0.9;
  //     else if (this.weatherEffect === "snow") speedModifier *= 0.8;

  //     // Visibility can affect the speed as well
  //     speedModifier *= this.visibility / 100;

  //     // Calculate the effective speed
  //     let effectiveSpeed = baseSpeed * speedModifier;

  //     // Calculate and return travel time
  //     return this.units / effectiveSpeed;
  //   }
}

// // Example usage:
// const rockyTerrain = new Terrain(
//   "Rocky Terrain",
//   5,
//   false,
//   true,
//   true,
//   "rain",
//   80,
//   1000
// );
// console.log(
//   `Travel time over ${rockyTerrain.name}: ${rockyTerrain.getTravelTime(
//     10
//   )} units`
// );
