// Ex 08: Promise chain: square 2, then double it, then add 5.
Promise.resolve(2)
  .then((n: number) => n * n) // 4
  .then((n: number) => n * 2) // 8
  .then((n: number) => n + 5) // 13
  .then((result: number) => console.log(result));

export {};
