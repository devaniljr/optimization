// scripts.js (Browser-side script)

// --- Utility Functions (displayResult, addInfo - as defined before) ---
function displayResult(testName, passed, description = '', errorMessage = '') {
  const testList = document.getElementById('test-list');
  if (!testList) { console.error("Element with id 'test-list' not found."); return; }
  const listItem = document.createElement('li');
  let statusText = passed ? 'Passed ✅' : 'Failed ❌';
  listItem.innerHTML = `${testName}: ${statusText}`;
  listItem.className = passed ? 'pass' : 'fail';
  if (description) {
      const descElement = document.createElement('div');
      descElement.className = 'test-description';
      descElement.textContent = description;
      listItem.appendChild(descElement);
  }
  if (!passed && errorMessage) {
      const errorDetail = document.createElement('div');
      errorDetail.className = 'error-message';
      errorDetail.textContent = 'Detail: ' + errorMessage;
      listItem.appendChild(errorDetail);
  }
  testList.appendChild(listItem);
}

function addInfo(message) {
  const testList = document.getElementById('test-list');
  if (!testList) { console.error("Element with id 'test-list' not found."); return; }
  const listItem = document.createElement('li');
  listItem.className = 'info';
  listItem.textContent = message;
  testList.appendChild(listItem);
}

// --- Browser Test Definitions (calling logic from test-logic.js) ---
function testSimpleAddition_Browser() {
  const description = "A basic arithmetic operation.";
  const passed = runSimpleAdditionLogic(); // From test-logic.js
  displayResult('Test 1: Simple Addition (5+7=12)', passed, description, passed ? '' : 'Logic returned false');
}

function testMonomorphicPropertyAccess_Browser() {
  const description = "Accesses 'obj.value'. Called repeatedly with objects of the exact same shape.";
  const passed = runMonomorphicPropertyAccessLogic(); // From test-logic.js
  displayResult('Test 2: Monomorphic Property Access (obj.value)', passed, description, passed ? '' : 'Logic returned false');
}

function testPolymorphicPropertyAccess_Browser() {
  const description = "Accesses 'obj.data'. Called with objects of a few different shapes (3 shapes).";
  const passed = runPolymorphicPropertyAccessLogic(); // From test-logic.js
  displayResult('Test 3: Polymorphic Property Access (obj.data - 3 Shapes)', passed, description, passed ? '' : 'Logic returned false');
}

function testMegamorphicPropertyAccess_Browser() {
  const description = "Accesses 'obj.item'. Called with many different object shapes (6 shapes).";
  const passed = runMegamorphicPropertyAccessLogic(); // From test-logic.js
  displayResult('Test 4: Megamorphic Property Access (obj.item - 6+ Shapes)', passed, description, passed ? '' : 'Logic returned false');
}

function testMonomorphicFunctionCall_Browser() {
  const description = "Calls a simple function 'monomorphicCallTarget' always with the same types of arguments.";
  const passed = runMonomorphicFunctionCallLogic(); // From test-logic.js
  displayResult('Test 5: Monomorphic Function Call (same arg types)', passed, description, passed ? '' : 'Logic returned false');
}

function testPolymorphicFunctionCall_Browser() {
  const description = "A call site that invokes one of three different functions.";
  const passed = runPolymorphicFunctionCallLogic(); // From test-logic.js
  displayResult('Test 6: Polymorphic Function Call (different target functions)', passed, description, passed ? '' : 'Logic returned false');
}

// --- Main Browser Execution Logic ---
addInfo("Running browser tests. V8 IC logs for pure logic can be generated separately via Node.js script.");

testSimpleAddition_Browser();
testMonomorphicPropertyAccess_Browser();
testMonomorphicFunctionCall_Browser();
testPolymorphicPropertyAccess_Browser();
testPolymorphicFunctionCall_Browser();
testMegamorphicPropertyAccess_Browser();

addInfo("Browser test execution finished on page.");