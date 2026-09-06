interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

interface PostResult extends PostPayload {
  id: number;
}

async function postData(): Promise<PostResult> {
  const res: Response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "foo", body: "bar", userId: 1 } as PostPayload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as PostResult;
}

postData()
  .then((data: PostResult) => console.log(data))
  .catch((err: Error) => console.error(err.message));

export { postData };
export type { PostPayload, PostResult };