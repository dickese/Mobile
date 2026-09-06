// Ex 29: queueProcess() processes tasks sequentially in a queue.
function createTask(id: number, time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`Task ${id} done in ${time}ms`), time);
  });
}

async function queueProcess(): Promise<void> {
  const queue: Array<() => Promise<string>> = [
    () => createTask(1, 1000),
    () => createTask(2, 500),
    () => createTask(3, 1500),
  ];
  for (const task of queue) {
    const result: string = await task();
    console.log(result);
  }
}

queueProcess().catch((err: Error) => console.error(err.message));

export { queueProcess };
