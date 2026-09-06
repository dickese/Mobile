// Ex 10: Use .finally() to log "Done" when a Promise finishes.
const task: Promise<string> = new Promise<string>((resolve, reject) => {
  const ok: boolean = Math.random() > 0.5;
  setTimeout(() => (ok ? resolve("Success!") : reject(new Error("Failed!"))), 1000);
});

task
  .then((msg: string) => console.log(msg))
  .catch((err: Error) => console.error(err.message))
  .finally(() => console.log("Done"));

export { task };
