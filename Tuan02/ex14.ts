// Ex 14: Async function takes a number, waits 1 second, returns number x 3.
async function tripleAfterOneSecond(n: number): Promise<number> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  return n * 3;
}

tripleAfterOneSecond(5).then((result: number) => console.log(result));

export { tripleAfterOneSecond };
