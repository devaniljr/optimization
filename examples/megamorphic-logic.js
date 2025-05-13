function printX(obj) {
  console.log(obj.x);
}

for (let i = 0; i < 10000; i++) {
  printX({ x: i });
}

printX({ x: 1, a: 1 });
printX({ x: 1, b: 1 });
printX({ x: 1, c: 1 });
printX({ x: 1, d: 1 });
printX({ x: 1, e: 1 });
printX({ x: 1, f: 1 });
printX({ x: 1, g: 1 });
printX({ x: 1, h: 1 });
