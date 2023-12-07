<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getSession } from '@/model/session';
import { useRouter } from 'vue-router';
import { watch } from 'vue';



//set user data
const currentUser = getSession().user; 
const userID = ref(currentUser?.id ? currentUser.id : 'default');
const userWorkoutKey = `customWorkouts_${userID.value}`;
const todayDayName = new Date().toLocaleString('en-US', { weekday: 'long' });
const userCalorieGoalKey = `calorieGoal_${userID.value}`;
const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${userID.value}`;

//decision for wheter display default or custom workouts
const displayedWorkouts = computed(() => {
  return currentUser ? customWorkouts.value : defaultWorkouts;
});

//default workouts
const defaultWorkouts = [
  { workout: 'Swimming', caloriesBurned: 0 },
  { workout: 'Running', caloriesBurned: 0 },
  { workout: 'Jogging', caloriesBurned: 0 },
  { workout: 'Hiking', caloriesBurned: 0 }
];

//may not use
const weeklyWorkouts = [
  { day: 'Sunday', caloriesBurned: 0 },
  { day: 'Monday', caloriesBurned: 0 },
  { day: 'Tuesday', caloriesBurned: 0 },
  { day: 'Wednesday', caloriesBurned: 0 },
  { day: 'Thursday', caloriesBurned: 0 },
  { day: 'Friday', caloriesBurned: 0 },
  { day: 'Saturday', caloriesBurned: 0 }
];


//custom workouts array
const customWorkouts = ref<Array<{workout: string, caloriesBurned: number, date: Date}>>([]);

//local storage access for array
onMounted(() => {
  const storedWorkouts = JSON.parse(localStorage.getItem(userWorkoutKey) || '[]');
  customWorkouts.value = storedWorkouts.map((workoutStr: string) => {
    const parts = workoutStr.split(' - ');
    return {
      workout: parts[1],
      caloriesBurned: parseInt(parts[3].split(' ')[0], 10),
      date: new Date(parts[0])
    };
  });
  loadWeeklyCalories();
});

//saved calory goal
onMounted(() => {
    const savedGoal = localStorage.getItem(userCalorieGoalKey);
    if (savedGoal) {
        calorieGoal.value = parseInt(savedGoal, 10);
    }
});


//sets current day
const today = new Date();
const lastSunday = new Date(today);
lastSunday.setDate(today.getDate() - today.getDay());


//chooses days with recorded activity within the last week to show 
const weeklyCustomWorkouts = computed(() => {
  return customWorkouts.value.filter(workout => workout.date >= lastSunday && workout.date <= today);
});

//loads weekly calories
const loadWeeklyCalories = () => {
  weeklyWorkouts.forEach(weekday => {
    const totalCalories = weeklyCustomWorkouts.value.filter(workout => {
      return workout.date.toLocaleString('en-US', { weekday: 'long' }) === weekday.day;
    }).reduce((total, workout) => total + workout.caloriesBurned, 0);
    weekday.caloriesBurned = totalCalories;
  });
};

const weeklyCaloriesBurned = computed(() => {
  return weeklyCustomWorkouts.value.reduce((acc, curr) => acc + curr.caloriesBurned, 0);
});


watch(weeklyCaloriesBurned, (newValue) => {
  localStorage.setItem(weeklyCaloriesBurnedKey, newValue.toString());
});


//sets modal for calory goal
const isModalOpen = ref(false);
const calorieGoal = ref(0); 
const router = useRouter();

//handler for set goal button
const handleSetGoalClick = () => {
    isModalOpen.value = true;
};

//handler for save goal
const saveGoal = () => {
    localStorage.setItem( userCalorieGoalKey, calorieGoal.value.toString());
    isModalOpen.value = false; 
};


//handler for share button
const handleShareClick = () => {
    router.push('/Social');
}

</script>


<template>

  <main class="columns is-multiline is-centered">
    <div class="column is-one-quarter">
      <div class="card">
          <div class="card-content">
              <p class="title">
                  Weekly Calorie Burn Progress
              </p>
              <p class="subtitle">
                  {{weeklyCaloriesBurned}} cal
              </p>
  
              <p class="title">
                  Weekly Calorie Burn Goal
              </p>
              <p class="subtitle">
                  {{ calorieGoal }} cal
              </p>
              <progress class="progress is-link" :value="weeklyCaloriesBurned" :max="calorieGoal"></progress>
            </div>
          <footer class="card-footer">
            <p class="card-footer-item">
                <button class="button is-link" @click="handleSetGoalClick">Set Goal</button>
            </p>
            <p class="card-footer-item">
                <button class="button is-link" @click="handleShareClick">Share</button>
            </p>
        </footer>
      </div>
  </div>

  <div v-if="isModalOpen" class="modal is-active">
    <div class="modal-background" @click="isModalOpen = false"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Set Calorie Goal</p>
            <button class="delete" aria-label="close" @click="isModalOpen = false"></button>
        </header>
        <section class="modal-card-body">
            <input type="number" v-model="calorieGoal" placeholder="Enter your goal in calories">
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" @click="saveGoal">Save Goal</button>
            <button class="button" @click="isModalOpen = false">Cancel</button>
        </footer>
    </div>
</div>
  


    <div class="column is-three-quarters">
      <div class="container">
        <h1 class="title has-text-centered">Weekly Calorie Burn Progress</h1>
        <p class="subtitle has-text-centered">{{ weeklyCaloriesBurned }} cal burned since last Sunday</p> 
        <div class="columns is-multiline">
          <div 
          v-for="workout in weeklyWorkouts" 
          :key="workout.day" 
          class="column is-one-sixth has-text-centered"
          :class="{ 'current-day': workout.day === todayDayName }"
        >
          <h2 class="subtitle">{{ workout.day }}</h2>
          <div class="box">{{ workout.caloriesBurned }} cal</div>
          </div>
        </div>
      </div>
    </div>

<div class="column is-three-quarters">
  <div class="container2">
    <h1 class="title has-text-centered">Recent Workouts</h1>
    <div class="columns is-multiline">
      <div 
        v-for="workout in displayedWorkouts" 
        :key="workout.workout" 
        class="column is-one-sixth has-text-centered"
        >

        <h2 class="subtitle">{{ workout.workout }}</h2>
        <div class="box">{{ workout.caloriesBurned }} cal</div>
      </div>
    </div>
  </div>
</div>


  </main>
</template>

<style scoped>




.current-day {
  box-shadow: 0px 0px 10px 2px red;
}

.workout-card {
  background: transparent;
  border: none;
  width: 100%;
  text-align: center;
  position: relative; 
  cursor: pointer;
  transition: transform 0.2s; 
}

.workout-card:hover {
  transform: scale(1.05); 
}

.workout-card::after {
  content: '+'; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  opacity: 0; 
  transition: opacity 0.2s; 
}

.workout-card:hover::after {
  opacity: 1; 
}
</style>