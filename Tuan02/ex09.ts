// Ex 09: Promise that reads an array after 1 second and filters even numbers.
const numbers: number[] = [1, 2, 3, 4, 5, 6];

const evenPromise: Promise<number[]> = new Promise<number[]>((resolve) => {
  setTimeout(() => resolve(numbers.filter((n: number) => n % 2 === 0)), 1000);
});

evenPromise.then((evens: number[]) => console.log(evens));

export { evenPromise };
