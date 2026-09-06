import { fetchUser, type User } from "./18.ts";

async function fetchUsers(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map((id: number) => fetchUser(id)));
}

fetchUsers([1, 2, 3]).then((users: User[]) => console.log(users));