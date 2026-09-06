// Ex 28: batchProcess() processes 5 async tasks at once (Promise.all).
function createTask(id: number, time: number): Promise<string> {
  return new Promise<string>((resolve) => {
    setTimeout(() => resolve(`Task ${id} done in ${time}ms`), time);
  });
}

async function batchProcess(): Promise<void> {
  const results: string[] = await Promise.all([
    createTask(1, 1000),
    createTask(2, 500),
    createTask(3, 1500),
    createTask(4, 800),
    createTask(5, 1200),
  ]);
  console.log(results);
}

batchProcess().catch((err: Error) => console.error(err.message));

export { batchProcess };
