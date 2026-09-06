// Ex 30: async/await + Promise.allSettled() to handle multiple API calls.
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodoById(id: number): Promise<Todo> {
  const res: Response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} for id ${id}`);
  return (await res.json()) as Todo;
}

async function run(): Promise<void> {
  const urls: number[] = [1, 2, 999999]; // last one may still resolve; use an invalid URL too
  const results: PromiseSettledResult<Todo>[] = await Promise.allSettled(
    urls.map((id: number) => getTodoById(id))
  );
  for (const r of results) {
    if (r.status === "fulfilled") console.log("Success:", r.value);
    else console.log("Failed:", (r.reason as Error).message);
  }
  // Also demonstrate a guaranteed failure:
  const mixed: PromiseSettledResult<Response>[] = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/todos/1"),
    fetch("https://invalid-url-xyz.test/todos/1"),
  ]);
  for (const r of mixed) {
    console.log(r.status === "fulfilled" ? `HTTP ${r.value.status}` : `Failed: ${(r.reason as Error).message}`);
  }
}

run().catch((err: Error) => console.error(err.message));

export { getTodoById };
export type { Todo };
