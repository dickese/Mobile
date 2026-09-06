async function tripleAfter1s(n: number): Promise<number> {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  return n * 3;
}

tripleAfter1s(5).then((result: number) => console.log(result));
