
import { api } from "./session";

export interface User {
  _id: string;  
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
  token?: string;
  image?: string;
  age?: number;
  weight?: number;
  weeklyCaloriesBurned?: number;
}

export const defaultUser: User = {
  _id: '',
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'user',
};

// export function getUsersWithCalories(): User[] {
//   return data.users.map(user => ({
//     ...user,
//     role: user.id <= 5 ? 'admin' : 'user',
//     weeklyCaloriesBurned: getLocalCaloriesBurned(user.email, user.id)
//   }));
// }


// Function to get all users from the server
export async function getUsers(): Promise<User[]> {
  return api('/users');
}

// Function to add a new user
export async function addUser(user: User): Promise<User[]> {
  return api('/users', user); // Assuming POST is used for adding a new user
}

// Function to update a user
export async function updateUser(user: User): Promise<User[]> {
  return api(`/users/update/${user._id}`); // Explicitly specifying the PUT method
}

// Function to delete a user by ID
export async function deleteUser(id: string): Promise<void> {
  return api(`/users/delete/${id}`, undefined, 'DELETE'); // Explicitly specifying the DELETE method
}

// Example function to calculate local calories burned (kept for legacy support)
export function getLocalCaloriesBurned(email: string, id: number): number {
  const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
  return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
}

// ... any other user-related functions ...















// import data from "../data/users.json";
// import * as myFetch from "./myFetch";

// export interface User {
//   id: number,
//   firstName: string,
//   lastName: string,
//   email: string,
//   password: string,
//   role: "admin" | "user",
//   token?: string,
//   image?: string,
//   age?: number,
//   weight?: number,
//   weeklyCaloriesBurned?: number
// }

// export const defaultUser: User = {
//   id: 0,
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   role: 'user',
// };


// export let usersArray = getUsersWithCalories();


// export function addUser(user: User): User {
//   usersArray.push(user);
//   return user;
// }

// export function getUsersWithCalories(): User[] {
//   return data.users.map(user => ({
//     ...user,
//     role: user.id <= 5 ? 'admin' : 'user',
//     weeklyCaloriesBurned: getLocalCaloriesBurned(user.email, user.id)
//   }));
// }

// export function getUsers(): User[] {
//   return data.users.map( x => ({ ...x, role: x.id <= 5 ? 'admin' : 'user' }) ) 
// }

// export function getUserByEmail(email: string): User | undefined {
//   return getUsers().find( x => x.email === email );
// }

// export function getUserById(id: number): User | undefined {
//   return getUsers().find( x => x.id === id );
// }


// export function getLocalCaloriesBurned(email: string, id: number): number {
//   const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
//   return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
// }


// export function deleteUser(id: number): User[] {
//   usersArray = usersArray.filter(x => x.id !== id);
//   return usersArray;
// }

// export const removeUser = async (id: number): Promise<void> => {
//   await deleteUser(id);
// };
