// Ex 04: Use .then() and .catch() to handle a Promise returning a random number.
const randomPromise: Promise<number> = new Promise<number>((resolve, reject) => {
  const n: number = Math.random();
  if (n >= 0) resolve(n);
  else reject(new Error("Failed to generate number"));
});

randomPromise
  .then((n: number) => console.log("Random number:", n))
  .catch((err: Error) => console.error("Error:", err.message));

export { randomPromise };
