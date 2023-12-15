<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSession } from "@/model/session";
import {
  type Workout,
  getWorkouts,
  addWorkout,
  deleteWorkout,
  updateWorkout,
} from "@/model/workouts";

const user = getSession().user;
const userID = user?.id;

const workoutName = ref("");
const workoutDuration = ref("");
const workoutCalories = ref("");
const workoutDate = ref("");
const workoutId = ref("");
const workoutCompleted = ref(false);
const showModal = ref(false);
const customWorkouts = ref([] as Workout[]);

const loadWorkouts = async () => {
  if (userID) {
    try {
      const data = await getWorkouts(userID);
      customWorkouts.value = data;
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }
};

const getDayOfWeek = (dateStr: string): string => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateStr);
  return days[date.getUTCDay()];
};


const handleAddWorkout = async () => {
  if (!userID) {
    console.error("User ID is missing");
    return;
  }

  const dayOfWeek = getDayOfWeek(workoutDate.value); // Get the day of the week

  const newWorkout = {
    userId: userID,
    name: workoutName.value,
    workoutId: workoutId.value,
    duration: workoutDuration.value,
    calories: parseInt(workoutCalories.value),
    date: workoutDate.value,
    complete: workoutCompleted.value,
    dayOfWeek: dayOfWeek // Save the day of the week
  };

  try {
    await addWorkout(newWorkout);
    await loadWorkouts();
  } catch (error) {
    console.error("Error adding workout:", error);
  }

  resetForm();
};

const handleDeleteWorkout = async (workoutId: string) => {
  try {
    await deleteWorkout(workoutId);
    await loadWorkouts();
  } catch (error) {
    console.error("Error deleting workout:", error);
  }
};


const toggleWorkoutStatus = async (workout: Workout) => {
  try {
    // Only update if the workout is currently incomplete
    if (!workout.complete) {
      // Update the workout with the new completion status
      await updateWorkout({ ...workout, complete: true });
      // Reload the workouts to reflect the change
      await loadWorkouts();
    }
  } catch (error) {
    console.error('Error updating workout:', error);
  }
};

const resetForm = () => {
  workoutName.value = "";
  workoutDuration.value = "";
  workoutCalories.value = "";
  workoutDate.value = "";
  workoutCompleted.value = false;
  showModal.value = false;
};

onMounted(loadWorkouts);
</script>

<template>
  <div class="container3">
    <h1>Workout Planner</h1>
    <ul class="workout-list">
      <li v-for="workout in customWorkouts" :key="workout._id">
        {{ workout.name }} - {{ workout.duration }} - {{ workout.calories }} calories
        <input
          type="checkbox"
          :checked="workout.complete"
          @change="workout._id ? toggleWorkoutStatus(workout) : null"
          :disabled="workout.complete"
          :class="{ 'checkbox-complete': workout.complete }" 
        />
        <button
          class="delete-button"
          @click="() => handleDeleteWorkout(workout._id as string)"
        >
          Delete
        </button>
      </li>
    </ul>

    <div class="add-workout">
      <button class="button is-link" @click="showModal = true">
        Add Workout
      </button>
    </div>

    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Workout</p>
          <button
            class="delete"
            aria-label="close"
            @click="showModal = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <!-- Form inputs -->
          <div class="field">
            <label class="label">Workout</label>
            <div class="control">
              <input
                v-model="workoutName"
                type="text"
                class="input"
                placeholder="Enter workout name"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Duration</label>
            <div class="control">
              <input
                v-model="workoutDuration"
                type="text"
                class="input"
                placeholder="E.g., 30 minutes"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Calories Burned</label>
            <div class="control">
              <input
                v-model="workoutCalories"
                type="text"
                class="input"
                placeholder="E.g., 300"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input v-model="workoutDate" type="date" class="input" required />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="handleAddWorkout">
            Save changes
          </button>
          <button class="button" @click="showModal = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
body,
html {
  background-color: #444;
  height: 100vh;
  margin: 0;
  font-family: "Arial", sans-serif;
}

.container3 {
  max-width: 500px;
  margin: 2rem auto;
  padding: 15px;
  box-shadow: 0 0 20px rgba(0, 127, 255, 0.6);
  background-color: #444;
  border-radius: 10px;
  color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}

h1 {
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.8rem;
  color: #f9f9f9;
}

.workout-list {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  max-height: 50vh;
}

.workout-list li {
  padding: 10px;
  border: 1px solid #555;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 0 8px rgba(0, 127, 255, 0.6);
}

.add-workout {
  margin-top: 15px;
  text-align: center;
}

.button {
  background-color: #406e8f;
  color: #f9f9f9;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #305d6e;
}

.modal-card {
  background-color: #333;
  color: #f9f9f9;
  box-shadow: 0 0 18px rgba(0, 127, 255, 0.6);
  border-radius: 6px;
}

.modal-card-head,
.modal-card-foot {
  background-color: #444;
  border: none;
  padding: 10px;
}

.modal-card-body {
  padding: 15px;
}

.input {
  background-color: #444;
  color: #f9f9f9;
  border: none;
  padding: 8px;
}

.input::placeholder {
  color: #999;
}

.delete-button {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-left: 10px; /* Add some space between the workout details and button */
}

.delete-button:hover {
  background-color: #e74c3c;
  transform: scale(1.05); /* Slightly enlarge button on hover */
}

.delete-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(192, 57, 43, 0.5); /* Add focus style for accessibility */
}

.checkbox-complete:checked {
  accent-color: blue; /* Style for completed workouts */
}

.checkbox-complete:disabled {
  cursor: not-allowed; /* Change cursor to indicate disabled state */
  accent-color: blue; /* Keep the blue color even in disabled state */
}
</style>
