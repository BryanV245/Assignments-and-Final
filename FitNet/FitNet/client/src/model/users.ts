
import { api } from "./session";

export interface User {
  _id?: string;  
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
  caloriesGoal?: number;
}

export const defaultUser: User = {
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
  return api(`/users/update/user/${user._id}`, user, "PUT"); // Explicitly specifying the PUT method
}

// Function to delete a user by ID
export async function deleteUser(id: string): Promise<void> {
  return api(`/users/delete/${id}`, undefined, 'DELETE'); 
}

// set weekly calories burned
export async function  setWeeklyCaloriesBurned(user: User, weeklyCaloriesBurned: number): Promise<void> {
    await updateUser({...user, weeklyCaloriesBurned: weeklyCaloriesBurned});
}

//search function
// Function to search for users
//FINAL EXAM CODE 
export async function searchUsers(search: string): Promise<User[]> {
  try {
    const encodedSearch = encodeURIComponent(search);
    const response = await api(`/users/searchUser/${encodedSearch}`);
    return response;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error; 
  }
}
