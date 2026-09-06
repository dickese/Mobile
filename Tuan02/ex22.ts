// Ex 22: Call the API multiple times and log the results.
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodoById(id: number): Promise<Todo> {
  const res: Response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as Todo;
}

async function run(): Promise<void> {
  for (const id of [1, 2, 3]) {
    const todo: Todo = await getTodoById(id);
    console.log(todo);
  }
}

run().catch((err: Error) => console.error(err.message));

export { getTodoById };
export type { Todo };
