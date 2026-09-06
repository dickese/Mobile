// Ex 19: fetchUsers(ids) calls fetchUser for each ID.
interface User {
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 1000);
  });
}

async function fetchUsers(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map((id: number) => fetchUser(id)));
}

fetchUsers([1, 2, 3]).then((users: User[]) => console.log(users));

export { fetchUser, fetchUsers };
export type { User };
