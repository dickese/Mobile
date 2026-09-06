function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`Task done in ${time}ms`), time);
  });
}

async function run3(): Promise<void> {
  const tasks: Promise<string>[] = [simulateTask(1000), simulateTask(500), simulateTask(1500)];
  for await (const result of tasks) {
    console.log(result);
  }
}

run3();
