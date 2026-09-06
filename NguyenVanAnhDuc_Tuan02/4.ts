const randomPromise: Promise<number> = new Promise<number>((resolve, reject) => {
  const n: number = Math.random();
  if(n > 0.5) resolve(n)
  reject( new Error("random number < 0.5"))
});

randomPromise
  .then((n: number) => console.log("random number : ", n))
  .catch((err: Error) => console.error("err:", err.message));
