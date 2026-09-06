async function fetchWithRetry(url: string, retries: number): Promise<unknown> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res: Response = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as unknown;
    } catch (err) {
      lastError = err;
      console.log(`Attempt ${attempt} failed: ${(err as Error).message}`);
      if (attempt === retries) throw err;
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw lastError;
}

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3)
  .then((data: unknown) => console.log(data))
  .catch((err: Error) => console.error("All retries failed:", err.message));
