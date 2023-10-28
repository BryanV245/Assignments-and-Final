
import data from "../data/users.json";

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "admin" | "user",
  token?: string,
  image?: string,
  age?: number,
  weight?: number,
  weeklyCaloriesBurned?: number
}

export let usersArray = getUsersWithCalories();


export function addUser(user: User): User {
  usersArray.push(user);
  return user;
}

export function getUsersWithCalories(): User[] {
  return data.users.map(user => ({
    ...user,
    role: user.id <= 5 ? 'admin' : 'user',
    weeklyCaloriesBurned: getLocalCaloriesBurned(user.email, user.id)
  }));
}

export function getUsers(): User[] {
  return data.users.map( x => ({ ...x, role: x.id <= 5 ? 'admin' : 'user' }) ) 
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find( x => x.email === email );
}

export function getUserById(id: number): User | undefined {
  return getUsers().find( x => x.id === id );
}


export function getLocalCaloriesBurned(email: string, id: number): number {
  const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
  return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
}


export function deleteUser(id: number): User[] {
  usersArray = usersArray.filter(x => x.id !== id);
  return usersArray;
}

export const removeUser = async (id: number): Promise<void> => {
  await deleteUser(id);
};
