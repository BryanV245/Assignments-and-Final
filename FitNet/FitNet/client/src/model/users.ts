
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
  lifetimeCaloriesBurned?: number;
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
  return api(`/users/delete/${id}`, undefined, 'DELETE'); 
}

//  calculate local calories burned (kept for legacy support) might not use this
export function getLocalCaloriesBurned(email: string, id: number): number {
  const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
  return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
}
