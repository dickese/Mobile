interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodo(): Promise<void> {
  const res: Response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: Todo = (await res.json()) as Todo;
  console.log(data);
}

getTodo().catch((err: Error) => console.error(err.message));

export { getTodo };
export type { Todo };