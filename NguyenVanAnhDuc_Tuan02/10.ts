const task: Promise<string> = new Promise<string>((resolve, reject) => {
  const ok: boolean = Math.random() > 0.5;
  setTimeout(() => (ok ? resolve("thành công") : reject(new Error("lỗi"))), 1000);
});

task
  .then((msg: string) => console.log(msg))
  .catch((err: Error) => console.error(err.message))
  .finally(() => console.log("xong "));

export { task };