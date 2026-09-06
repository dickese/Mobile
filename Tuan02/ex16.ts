// Ex 16: Call multiple async functions in parallel using Promise.all().
function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`Task done in ${time}ms`), time);
  });
}

async function runInParallel(): Promise<void> {
  const results: string[] = await Promise.all([
    simulateTask(1000),
    simulateTask(500),
    simulateTask(1500),
  ]);
  console.log(results);
}

runInParallel();

export { runInParallel };
