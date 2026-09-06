function getNumberTen(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

getNumberTen().then((n: number) => console.log(n));
