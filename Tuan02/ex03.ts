// Ex 03: Function that rejects with "Something went wrong" after 1 second.
function failAfterOneSecond(): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

failAfterOneSecond().catch((err: Error) => console.error(err.message));

export { failAfterOneSecond };
