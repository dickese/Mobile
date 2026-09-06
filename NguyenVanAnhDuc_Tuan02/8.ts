Promise.resolve(2)
  .then((n: number) => n * n) // 4
  .then((n: number) => n * 2) // 8
  .then((n: number) => n + 5) // 13
  .then((result: number) => console.log(result));
