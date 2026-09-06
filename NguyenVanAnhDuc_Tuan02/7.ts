function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`Resolved after ${time}ms`), time);
  });
}

Promise.race([simulateTask(1000), simulateTask(2000), simulateTask(500)]).then(
  (winner: string) => console.log("First resolved:", winner)
);
