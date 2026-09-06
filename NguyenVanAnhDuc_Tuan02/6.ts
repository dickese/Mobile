function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

Promise.all([simulateTask(1000), simulateTask(2000), simulateTask(500)]).then(
  (results: string[]) => console.log(results)
);
