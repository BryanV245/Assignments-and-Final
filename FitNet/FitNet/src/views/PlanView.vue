<script setup lang="ts">
import { ref } from 'vue';

const exerciseName = ref('');
const exerciseDuration = ref('');
const exerciseCalories = ref('');
const exerciseDate = ref('');  
const showModal = ref(false);

const defaultWorkouts = [
  { name: "Running", duration: "30 minutes", calories: "300" }
];

const customWorkouts = ref<string[]>([]);

const addExercise = () => {
  customWorkouts.value.push(`${exerciseDate.value} - ${exerciseName.value} - ${exerciseDuration.value} - ${exerciseCalories.value} calories`);
  exerciseName.value = '';
  exerciseDuration.value = '';
  exerciseCalories.value = '';
  exerciseDate.value = '';  
  showModal.value = false;
};
</script>

<template>
  <div class="container">
    <h1>Workout Planner</h1>

    <ul class="workout-list">

      <li v-for="workout in defaultWorkouts" :key="workout.name">{{ workout.name }} - {{ workout.duration }} - {{ workout.calories }} calories</li>

      <li v-for="workout in customWorkouts" :key="workout">{{ workout }}</li>
    </ul>
    
    <button class="button is-primary" @click="showModal = true">Add Workout</button>


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
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
}

.workout-list {
  list-style-type: none;
  padding-left: 0;
}

.workout-list li {
  padding: 10px;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  margin-top: 10px;
}
</style>
