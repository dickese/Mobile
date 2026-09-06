// Ex 05: simulateTask(time) returns a Promise resolving "Task done" after time ms.
function simulateTask(time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

simulateTask(1000).then((msg: string) => console.log(msg));

export { simulateTask };
