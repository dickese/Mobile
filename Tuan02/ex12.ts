// Ex 12: Async function that calls simulateTask(2000) and logs the result.
function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

async function run(): Promise<void> {
  const result: string = await simulateTask(2000);
  console.log(result);
}

run();

export { simulateTask, run };
