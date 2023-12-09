import { api } from "./session";

export interface Workout {
  _id: string;
  userId: string;
  name: string;
  duration: string;
  calories: number;
  date: string;
  exercisseId: string;
};

export const defaultWorkout: Workout = {
  _id: '',
  userId: '',
  name: '',
  duration: '',
  calories: 0,
  date: '',
  exercisseId: '',
};

export async function addWorkout(workout: Workout): Promise<Workout[]> {
  return api("/workouts/add", workout);
}

export async function getWorkouts(id: number): Promise<Workout[]> {
    const response = await api(`/workouts/user/${id}`);
    return response.data;
}

export async function deleteWorkout(id: string): Promise<void> {
  return api(`/workouts/delete/${id}`, undefined, "DELETE");
}

export async function deleteAllWorkouts(id: number): Promise<void> {
    return api(`/workouts/deleteAll/user/${id}`, undefined, "DELETE");
}
