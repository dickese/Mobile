// Ex 18: fetchUser(id) simulates an API call (resolves user object after 1 second).
interface User {
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 1000);
  });
}

fetchUser(1).then((user: User) => console.log(user));

export { fetchUser };
export type { User };
