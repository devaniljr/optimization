// tests/polymorphic-logic.js

// --- IC Target Functions ---
function getPolymorphicData(obj) {
  // The property access 'obj.data' happens here
  return obj.data;
}
// Base functions needed for the polymorphic call test
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

// --- Pure Test Logic Functions ---
function runPolymorphicPropertyAccessLogic() {
  let sum = 0;
  const shape1 = { data: 1, p1: true };
  const shape2 = { data: 2, p2: 'hello' };
  const shape3 = { data: 3, p3: null, p4: 100 };
  const shapes = [shape1, shape2, shape3]; // 3 shapes

  // Calls getPolymorphicData with different shapes
  for (let i = 0; i < 30; i++) {
    sum += getPolymorphicData(shapes[i % shapes.length]);
  }
  const testObj = { data: 200, p1: false };
  const result1 = getPolymorphicData(testObj);
  const result2 = getPolymorphicData(shape2);
  return result1 === 200 && result2 === 2 && sum > 0;
}

function runPolymorphicFunctionCallLogic() {
  let resultValue = 0;
  const operations = [add, subtract, multiply]; // 3 different target functions
  let pass = true;

  // Calls different functions at the same conceptual call site
  for (let i = 0; i < 30; i++) {
    const func = operations[i % operations.length];
    resultValue += func(i + 5, i + 2); // Call site
  }
  if (add(10,5) !== 15) pass = false;
  if (subtract(10,5) !== 5) pass = false;
  if (multiply(10,5) !== 50) pass = false;
  return pass && resultValue !== 0;
}

// --- Execution for Node.js Profiling ---
if (typeof require !== 'undefined' && require.main === module) {
  // Need path required if running this directly and want the console log below
  const path = require('node:path');
  console.log(`[${path.basename(__filename)}] Running logic...`);
  runPolymorphicPropertyAccessLogic();
  runPolymorphicFunctionCallLogic();
  console.log(`[${path.basename(__filename)}] Finished logic execution.`);
}

// Optional exports
/*
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runPolymorphicPropertyAccessLogic, runPolymorphicFunctionCallLogic };
}
*/