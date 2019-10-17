const level0 = []
for (let index = 0; index < 1000; index++) {
  const block = {
    "entityId": 3,
    "x": 16 * index,
    "y": 176
  }

  level0.push(block)
}
console.log(JSON.stringify(level0));
