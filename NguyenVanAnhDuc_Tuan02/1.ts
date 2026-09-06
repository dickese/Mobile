const helloAsync: Promise<string> = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Hello Async"), 2000);
});

helloAsync.then((message: string) => console.log(message));

helloAsync