<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getSession } from "@/model/session";
import { useRouter } from "vue-router";
import { type Workout, getWeeklyWorkouts } from "@/model/workouts";
import { type User, updateUser, setWeeklyCaloriesBurned } from "@/model/users";

//set user data
const currentUser = getSession().user;
const userID = currentUser?.id;
const todayDayName = new Date().toLocaleString("en-US", { weekday: "long" });
const storedWorkouts = ref([] as Workout[]);
//sets modal for calory goal
const isModalOpen = ref(false);
const calorieGoal = ref(0);
const router = useRouter();
const weeklyCaloriesBurned = ref(0);

onMounted(async () => {
  if (userID) {
    calorieGoal.value = currentUser?.caloriesGoal || 0;
    
    try {
      storedWorkouts.value = await getWeeklyWorkouts(userID);
      storedWorkouts.value.forEach((workout) => {
        //const index = weeklyWorkouts.findIndex((w) => w.day === day);
        if (workout.dayOfWeek === weeklyWorkouts[0].day) {
          weeklyWorkouts[0].caloriesBurned += workout.calories;
        } else if (workout.dayOfWeek === weeklyWorkouts[1].day) {
          weeklyWorkouts[1].caloriesBurned += workout.calories;
        } else if (workout.dayOfWeek === weeklyWorkouts[2].day) {
          weeklyWorkouts[2].caloriesBurned += workout.calories;
        } else if (workout.dayOfWeek === weeklyWorkouts[3].day) {
          weeklyWorkouts[3].caloriesBurned += workout.calories;
        } else if (workout.dayOfWeek === weeklyWorkouts[4].day) {
          weeklyWorkouts[4].caloriesBurned += workout.calories;
        } else if (workout.dayOfWeek === weeklyWorkouts[5].day) {
          weeklyWorkouts[5].caloriesBurned += workout.calories;
        } else if (workout.dayOfWeek === weeklyWorkouts[6].day) {
          weeklyWorkouts[6].caloriesBurned += workout.calories;
        }
      });

      computeWeeklyCaloriesBurned();
      setWeeklyCaloriesBurned(currentUser, weeklyCaloriesBurned.value);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }
});

const computeWeeklyCaloriesBurned = ()  => {
  let i =0;
  const index = weeklyWorkouts.findIndex((w) => w.day === todayDayName);
  console.log(index);
  while(i <= index) {
    weeklyCaloriesBurned.value += weeklyWorkouts[i].caloriesBurned;
    i++;
  }

  console.log(weeklyCaloriesBurned.value);
  
};


//default workouts
const defaultWorkouts = [
  { workout: "Swimming", caloriesBurned: 0 },
  { workout: "Running", caloriesBurned: 0 },
  { workout: "Jogging", caloriesBurned: 0 },
  { workout: "Hiking", caloriesBurned: 0 },
];

//may not use
const weeklyWorkouts = [
  { day: "Sunday", caloriesBurned: 0 },
  { day: "Monday", caloriesBurned: 0 },
  { day: "Tuesday", caloriesBurned: 0 },
  { day: "Wednesday", caloriesBurned: 0 },
  { day: "Thursday", caloriesBurned: 0 },
  { day: "Friday", caloriesBurned: 0 },
  { day: "Saturday", caloriesBurned: 0 },
];


//handler for set goal button
const handleSetGoalClick = () => {
  isModalOpen.value = true;
};

//handler for save goal
const saveGoal = async (user: User, calorieGoal: number) => {
  await updateUser({ ...user, caloriesGoal: calorieGoal });
  isModalOpen.value = false;
};

//handler for share button
const handleShareClick = () => {
  router.push("/Social");
};
</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <p class="title">Weekly Calorie Burn Progress</p>
          <p class="subtitle">{{ weeklyCaloriesBurned }} cal</p>

          <p class="title">Weekly Calorie Burn Goal</p>
          <p class="subtitle">{{ calorieGoal }} cal</p>
          <progress
            class="progress is-link"
            :value="weeklyCaloriesBurned"
            :max="calorieGoal"
          ></progress>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <button class="button is-link" @click="handleSetGoalClick">
              Set Goal
            </button>
          </p>
          <p class="card-footer-item">
            <button class="button is-link" @click="handleShareClick">
              Share
            </button>
          </p>
        </footer>
      </div>
    </div>

    <div v-if="isModalOpen" class="modal is-active">
      <div class="modal-background" @click="isModalOpen = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Set Calorie Goal</p>
          <button
            class="delete"
            aria-label="close"
            @click="isModalOpen = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <input
            type="number"
            v-model="calorieGoal"
            placeholder="Enter your goal in calories"
          />
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="currentUser && saveGoal(currentUser, calorieGoal)"
          >
            Save Goal
          </button>
          <button class="button" @click="isModalOpen = false">Cancel</button>
        </footer>
      </div>
    </div>

    <div class="column is-three-quarters">
      <div class="container">
        <h1 class="title has-text-centered">Weekly Calorie Burn Progress</h1>
        <p class="subtitle has-text-centered">
          {{ weeklyCaloriesBurned }} cal burned since last Sunday
        </p>
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
            v-for="workout in storedWorkouts"
            :key="workout._id"
            class="column is-one-sixth has-text-centered"
          >
            <h2 class="subtitle">{{ workout.name }}</h2>
            <div class="box">{{ workout.calories }} cal</div>
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
  content: "+";
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
