function printX(obj) {
  console.log(obj.x);
}

// Monomorphic
printX({ x: 1 });
printX({ x: 2 });
printX({ x: 3 });

// Megamorphic
printX({ x: 4, y: 0 }); 
printX({ x: 5, z: true });
printX({ x: 6, q: "hi" });
printX(Object.create({ x: 7 }));
printX([8]);
printX({ get x() { return 9; }});
