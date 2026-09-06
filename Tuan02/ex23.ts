// Ex 23: Fetch a list of todos and filter out those that are not completed.
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getCompletedTodos(): Promise<Todo[]> {
  const res: Response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const todos: Todo[] = (await res.json()) as Todo[];
  return todos.filter((t: Todo) => t.completed);
}

getCompletedTodos()
  .then((todos: Todo[]) => console.log(todos.slice(0, 5)))
  .catch((err: Error) => console.error(err.message));

export { getCompletedTodos };
export type { Todo };
