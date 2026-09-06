function failAfter1s(): Promise<void> {
  return new Promise<void>((_, reject) => {
    setTimeout(() => reject(new Error("smt went wrong")), 1000);
  });
}

failAfter1s().catch((err: Error) => console.error(err.message));

export {failAfter1s}