import { api } from "./session";

export interface Workout {
  _id?: string;
  userId: number;
  name: string;
  duration: string;
  calories: number;
  date: string;
  workoutId: string;
  complete?: boolean;
  dayOfWeek?: string;
};

//ignore this
export const defaultWorkout: Workout = {
  _id: '',
  userId: 0,  
  name: '',
  duration: '',
  calories: 0,
  date: '',
  workoutId: '',
  complete: false,
};
//function to add a workout
export async function addWorkout(workout: Workout): Promise<Workout[]> {
  return api("/workouts/add", workout);
}

// Function to get workouts by user ID
export async function getWorkouts(id: number): Promise<Workout[]> {
    return api(`/workouts/user/${id}`);
}

// Function to delete a workout
export async function deleteWorkout(id: string): Promise<void> {
  return api(`/workouts/delete/workout/${id}`, undefined, "DELETE");
}

// Function to delete a all workout for user:userId
export async function deleteAllWorkouts(id: number): Promise<void> {
    return api(`/workouts/deleteAll/user/${id}`, undefined, "DELETE");
}

// Function to update a workout
export async function updateWorkout(workout: Workout): Promise<Workout[]> {
  return api(`/workouts/update/workout/${workout._id}`, workout, "PUT");
}

// Function to get all workouts from in the past week from database
export async function getWeeklyWorkouts(id: number): Promise<Workout[]> {
  return api(`/workouts/user/weekly/${id}`);
}

