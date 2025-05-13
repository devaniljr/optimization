/*
 * Description: A simple React app to demonstrate de-optimization
 *
 * Shape |       μs  | Slowdown
 * -----------------------------
 *     1 |  8.10 μs  | 1.0  *
 *     2 |  9.71 μs  | 1.2  ***
 *     3 | 12.59 μs  | 1.5  ******
 *     4 | 12.90 μs  | 1.6  *******
 *     5 | 32.20 μs  | 3.9  ******************************
 *  many | 55.90 μs  | 6.9  ************************************************************
 *
 * INSTRUCTIONS
 * - Deoptigate was tested with node v12.16.1 
 *   (I had issues getting it to run on latest version of node)
 * - install deoptigate: npm install -g deoptigate
 * - run deoptigate: deoptigate deoptigate-example.js 
 */

const vehicleCount = 10_000;   // Number of vehicles to create
const iterations = 10;         // Number of times to run the test
const timeIterations = 10_000; // Number of times to run the test function between measurements.

const vehicles = [];
const vehicleTypes = [
  // each factory creates a vehicle with a different shape.
  // Comment out the shapes you don't want to test to see difference in performance.
  () => ({ type: "bicycle", wheels: 2, roadBike: false }),
  () => ({ type: "tricycle", wheels: 2, toy: true }),
  () => ({ type: "motorcycle", wheels: 2, sidecar: false }),
  () => ({ type: "car", wheels: 4, coupe: false }),
  // () => ({ type: "semi", wheels: 18, trailer: true }),
  // () => ({ type: "random", wheels: 0, ["" + Math.random()]: true }),
];

// Create a bunch of vehicles
for (let i = 0; i < vehicleCount; i++) {
  const vehicleType = vehicleTypes[i % vehicleTypes.length];
  vehicles.push(vehicleType());
}

function averageNumberOfWheels() {
  let totalWheels = 0;
  for (let i = 0; i < vehicles.length; i++) {
    // Vehicle can have anywhere from 1 to thousands of shapes depending
    // on which vehicle types were created.
    const vehicle = vehicles[i];
    // `vehicle.wheels` is a the problematic access if too many shapes are created.
    // Number of shapes will determine the performance of the code.
    totalWheels += vehicle.wheels;
  }
  return totalWheels / vehicles.length;
}

(function measurePerformance(fn) {
  let bestTime = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < iterations; i++) {
    const start = new Date().getTime();
    for (let j = 0; j < timeIterations; j++) {
      fn(); // 1
    }
    const end = new Date().getTime() - start;
    bestTime = Math.min(bestTime, end / timeIterations);
  }
  console.log("Best time:", (bestTime * 1000).toFixed(2), "μs");
})(averageNumberOfWheels);