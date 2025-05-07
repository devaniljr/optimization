// test-logic.js

// --- IC Target Functions (Pure Logic) ---
function getMonomorphicValue(obj) { return obj.value; }
function getPolymorphicData(obj) { return obj.data; }
function getMegamorphicItem(obj) { return obj.item; }
function monomorphicCallTarget(a, b) { return a + b; }
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

// --- Pure Test Logic Functions ---
// These functions will be called by Node.js (when this file is run directly)
// and also by scripts.js (in the browser, which will then handle DOM updates).
// They should return a simple status or result that the browser script can use.

function runMonomorphicPropertyAccessLogic() {
    let sum = 0;
    const objA = { type: 'mono', value: 10, id: 1 };
    const objB = { type: 'mono', value: 20, id: 2 };
    const objC = { type: 'mono', value: 30, id: 3 };

    for (let i = 0; i < 20; i++) {
        sum += getMonomorphicValue(objA);
        sum += getMonomorphicValue(objB);
        sum += getMonomorphicValue(objC);
    }
    const testObj = { type: 'mono', value: 100, id: 100 };
    const result = getMonomorphicValue(testObj);
    // console.log(`MonomorphicPropertyAccess Logic: sum=${sum}, result=${result}`); // Optional debug
    return result === 100 && sum > 0;
}

function runPolymorphicPropertyAccessLogic() {
    let sum = 0;
    const shape1 = { data: 1, p1: true };
    const shape2 = { data: 2, p2: 'hello' };
    const shape3 = { data: 3, p3: null, p4: 100 };
    const shapes = [shape1, shape2, shape3];

    for (let i = 0; i < 30; i++) {
        sum += getPolymorphicData(shapes[i % shapes.length]);
    }
    const testObj = { data: 200, p1: false };
    // console.log(`PolymorphicPropertyAccess Logic: sum=${sum}`); // Optional debug
    return getPolymorphicData(testObj) === 200 && getPolymorphicData(shape2) === 2 && sum > 0;
}

function runMegamorphicPropertyAccessLogic() {
    let sum = 0;
    const shapes = [
        { item: 1, a: 1 }, { item: 2, b: 1 }, { item: 3, c: 1 },
        { item: 4, d: 1 }, { item: 5, e: 1 }, { item: 6, f: 1 }
    ];
    for (let i = 0; i < 60; i++) {
        sum += getMegamorphicItem(shapes[i % shapes.length]);
    }
    const testObj = { item: 300, z: 99 };
    // console.log(`MegamorphicPropertyAccess Logic: sum=${sum}`); // Optional debug
    return getMegamorphicItem(testObj) === 300 && getMegamorphicItem(shapes[0]) === 1 && sum > 0;
}

function runMonomorphicFunctionCallLogic() {
    let sum = 0;
    for (let i = 0; i < 20; i++) {
        sum += monomorphicCallTarget(i, i + 1);
    }
    // console.log(`MonomorphicFunctionCall Logic: sum=${sum}`); // Optional debug
    return monomorphicCallTarget(10, 20) === 30 && sum > 0;
}

function runPolymorphicFunctionCallLogic() {
    let resultValue = 0;
    const operations = [add, subtract, multiply];
    let pass = true;
    for (let i = 0; i < 30; i++) {
        const func = operations[i % operations.length];
        resultValue += func(i + 5, i + 2);
    }
    if (add(10,5) !== 15) pass = false;
    if (subtract(10,5) !== 5) pass = false;
    if (multiply(10,5) !== 50) pass = false;
    // console.log(`PolymorphicFunctionCall Logic: resultValue=${resultValue}`); // Optional debug
    return pass && resultValue !== 0;
}

function runSimpleAdditionLogic() {
    const result = 5 + 7;
    const expected = 12;
    return result === expected;
}

// This block makes the file runnable by Node.js for profiling
// It won't be executed when this file is included via <script> in HTML if not called explicitly.
console.log("[test-logic.js] Running pure logic functions for Node.js V8 profiling...");
runSimpleAdditionLogic();
runMonomorphicPropertyAccessLogic();
runMonomorphicFunctionCallLogic();
runPolymorphicPropertyAccessLogic();
runPolymorphicFunctionCallLogic();
runMegamorphicPropertyAccessLogic();
console.log("[test-logic.js] Pure logic function execution finished.");
