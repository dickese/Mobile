import { simulateTask } from "./5.ts";

async function run2(): Promise<void> {
  const message: string = await simulateTask(2000);
  console.log(message);
}

run2()