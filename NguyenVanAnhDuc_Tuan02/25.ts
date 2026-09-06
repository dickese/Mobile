function downloadFile(fileName: string): Promise<string> {
  return new Promise<string>((resolve) => {
    console.log(`Downloading ${fileName}...`);
    setTimeout(() => resolve(`${fileName} downloaded`), 3000);
  });
}

downloadFile("file.zip").then((msg: string) => console.log(msg));
