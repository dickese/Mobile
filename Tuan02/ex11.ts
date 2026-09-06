// Ex 11: Convert Exercise 1 into async/await.
function delay(message: string, ms: number): Promise<string> {
  return new Promise<string>((resolve) => setTimeout(() => resolve(message), ms));
}

async function run(): Promise<void> {
  const message: string = await delay("Hello Async", 2000);
  console.log(message);
}

run();

export { run };
