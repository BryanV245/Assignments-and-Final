<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getSession } from "@/model/session";

const user = getSession().user;


//sets user data
const exerciseName = ref('');
const exerciseDuration = ref('');
const exerciseCalories = ref('');
const exerciseDate = ref('');  
const showModal = ref(false);

//shows defoult woukouts
const defaultWorkouts = [
  { name: "Running", duration: "30 minutes", calories: "300" }
];

//woukout array
const customWorkouts = ref<string[]>([]);

//gets user data
const currentUser = getSession().user; 
const userID = ref(currentUser?.id? currentUser.id : 'default');
const userWorkoutKey = `customWorkouts_${userID.value}`;


onMounted(() => {
  const storedWorkouts = JSON.parse(localStorage.getItem(userWorkoutKey) || '[]');
  customWorkouts.value = storedWorkouts;
});


//adds excersise to array
const addExercise = () => {
  customWorkouts.value.push(`${exerciseDate.value} - ${exerciseName.value} - ${exerciseDuration.value} - ${exerciseCalories.value} calories`);
  localStorage.setItem(userWorkoutKey, JSON.stringify(customWorkouts.value));
  exerciseName.value = '';
  exerciseDuration.value = '';
  exerciseCalories.value = '';
  exerciseDate.value = '';  
  showModal.value = false;
};


//delete exercise
const deleteExercise = (index: number) => {
  customWorkouts.value.splice(index, 1);
  localStorage.setItem(userWorkoutKey, JSON.stringify(customWorkouts.value));
};
</script>




<template>
  <div class="container3">
    <h1>Workout Planner</h1>

    <ul class="workout-list">
      <li v-for="workout in defaultWorkouts" :key="workout.name">
        {{ workout.name }} - {{ workout.duration }} - {{ workout.calories }} calories
      </li>
      <li v-for="(workout, index) in customWorkouts" :key="workout">
        {{ workout }}
        
        <button class="delete-button" @click="deleteExercise(index)">Delete</button>
      </li>
    </ul>

    <div class="add-workout">
      <button class="button is-link" @click="showModal = true">Add Workout</button>
    </div>


    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="showModal = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Workout</p>
          <button class="delete" aria-label="close" @click="showModal = false"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Exercise</label>
            <div class="control">
              <input v-model="exerciseName" type="text" class="input" placeholder="Enter exercise name" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Duration</label>
            <div class="control">
              <input v-model="exerciseDuration" type="text" class="input" placeholder="E.g., 30 minutes" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Calories Burned</label>
            <div class="control">
              <input v-model="exerciseCalories" type="text" class="input" placeholder="E.g., 300" required>
            </div>
          </div>

          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input v-model="exerciseDate" type="date" class="input" required>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addExercise">Save changes</button>
          <button class="button" @click="showModal = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>
<style scoped>
body, html {
  background-color: #444;
  height: 100vh;
  margin: 0;
  font-family: 'Arial', sans-serif;
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

.modal-card-head, .modal-card-foot {
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

</style>
