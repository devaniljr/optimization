// tests/monomorphic-logic.js

// --- IC Target Functions ---
function getMonomorphicValue(obj) { return obj.value; }
function monomorphicCallTarget(a, b) { return a + b; }

// --- Pure Test Logic Functions ---
function runSimpleAdditionLogic() {
    const result = 5 + 7;
    const expected = 12;
    return result === expected;
}
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
    return result === 100 && sum > 0;
}
function runMonomorphicFunctionCallLogic() {
    let sum = 0;
    for (let i = 0; i < 20; i++) {
        sum += monomorphicCallTarget(i, i + 1);
    }
    const result = monomorphicCallTarget(10, 20);
    return result === 30 && sum > 0;
}

// --- Execution for Node.js Profiling ---
if (typeof require !== 'undefined' && require.main === module) {
    const path = require('node:path'); // <<<=== ADICIONAR ESTA LINHA
    console.log(`[${path.basename(__filename)}] Running logic...`);
    runSimpleAdditionLogic();
    runMonomorphicPropertyAccessLogic();
    runMonomorphicFunctionCallLogic();
    console.log(`[${path.basename(__filename)}] Finished logic execution.`);
}