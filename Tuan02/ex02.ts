// Ex 02: Function returning a Promise resolving with number 10 after 1 second.
function getNumberTen(): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

getNumberTen().then((n: number) => console.log(n));

export { getNumberTen };
