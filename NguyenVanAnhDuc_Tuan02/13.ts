function failAfterOneSecond(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("smt went wrong")), 1000);
  });
}

async function run(): Promise<void> {
  try {
    await failAfterOneSecond();
  } catch (err) {
    console.error((err as Error).message);
  }
}

run();