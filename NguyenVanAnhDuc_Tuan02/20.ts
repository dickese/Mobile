import { type User } from "./18.ts";

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
    console.log(await fetchUserWithTimeout(1, 1000)); // thành công
    console.log(await fetchUserWithTimeout(2, 3000)); // time-out
  } catch (err) {
    console.error((err as Error).message);
  }
}

run();
