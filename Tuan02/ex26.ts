// Ex 26: Use async/await with setTimeout to simulate a 5-second wait.
function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function run(): Promise<void> {
  console.log("Waiting 5 seconds...");
  await wait(5000);
  console.log("Done waiting!");
}

run();

export { wait, run };
