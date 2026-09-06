// Ex 01: Create a Promise that returns "Hello Async" after 2 seconds.
const helloAsync: Promise<string> = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Hello Async"), 2000);
});

helloAsync.then((message: string) => console.log(message));

export { helloAsync };
