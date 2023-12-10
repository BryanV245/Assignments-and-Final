import { api } from "./session";

export interface Workout {
  _id?: string;
  userId: number;
  name: string;
  duration: string;
  calories: number;
  date: string;
  workoutId: string;
};

export const defaultWorkout: Workout = {
  _id: '',
  userId: 0,  
  name: '',
  duration: '',
  calories: 0,
  date: '',
  workoutId: '',
};
export async function addWorkout(workout: Workout): Promise<Workout[]> {
  return api("/workouts/add", workout);
}

export async function getWorkouts(id: number): Promise<Workout[]> {
    //const response = await api(`/workouts/user/${id}`);
    //return response.data;
    return api(`/workouts/user/${id}`);
}

export async function deleteWorkout(id: string): Promise<void> {
  //console.log("deleteWorkout", id);
  return api(`/workouts/delete/workout/${id}`, undefined, "DELETE");
}

export async function deleteAllWorkouts(id: number): Promise<void> {
    return api(`/workouts/deleteAll/user/${id}`, undefined, "DELETE");
}