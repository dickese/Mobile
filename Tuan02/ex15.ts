// Ex 15: Call multiple async functions sequentially using await.
function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`Task done in ${time}ms`), time);
  });
}

async function runSequentially(): Promise<void> {
  const r1: string = await simulateTask(1000);
  console.log(r1);
  const r2: string = await simulateTask(500);
  console.log(r2);
  const r3: string = await simulateTask(1500);
  console.log(r3);
}

runSequentially();

export { runSequentially };
