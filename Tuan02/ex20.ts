// Ex 20: Timeout — if API call takes more than 2 seconds, throw an error.
interface User {
  id: number;
  name: string;
}

function fetchUserSlow(id: number, delayMs: number): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), delayMs);
  });
}

async function fetchUserWithTimeout(id: number, delayMs: number): Promise<User> {
  const timeout: Promise<never> = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Request timed out after 2 seconds")), 2000);
  });
  return Promise.race([fetchUserSlow(id, delayMs), timeout]);
}

async function run(): Promise<void> {
  try {
    console.log(await fetchUserWithTimeout(1, 1000)); // succeeds
    console.log(await fetchUserWithTimeout(2, 3000)); // throws timeout
  } catch (err) {
    console.error((err as Error).message);
  }
}

run();

export { fetchUserWithTimeout };
export type { User };
