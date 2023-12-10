


<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getSession } from "@/model/session";
import {
  getWorkouts,
  addWorkout,
  deleteWorkout,
  type Workout,
} from "@/model/workouts";

// Assuming getSession().user has a defined TypeScript type
const user = getSession().user;
const userID = user?.id;

const workoutName = ref<string>("");
const workoutDuration = ref<string>("");
const workoutCalories = ref<string>("");
const workoutDate = ref<string>("");
const workoutId = ref<string>("");
const workoutCompleted = ref<boolean>(false);
const showModal = ref<boolean>(false);
const customWorkouts = ref<Workout[]>([]);

const loadWorkouts = async () => {
  if (userID) {
    try {
      const data = await getWorkouts(userID);
      console.log("Workouts:", data);
      customWorkouts.value = data;
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  }
};

const currentMonth = ref<number>(new Date().getMonth());
const currentYear = ref<number>(new Date().getFullYear());
const selectedDay = ref<number | null>(null);

const daysInMonth = computed<number[]>(() => {
  const days: number[] = [];
  const date = new Date(currentYear.value, currentMonth.value, 1);

  while (date.getMonth() === currentMonth.value) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
});

const currentMonthName = computed<string>(() => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[currentMonth.value];
});

const changeMonth = (delta: number): void => {
  let newMonth = currentMonth.value + delta;
  let newYear = currentYear.value;

  if (newMonth < 0) {
    newMonth = 11;
    newYear--;
  } else if (newMonth > 11) {
    newMonth = 0;
    newYear++;
  }

  currentMonth.value = newMonth;
  currentYear.value = newYear;
};

const selectDay = (day: number): void => {
  selectedDay.value = day;
};

const isWorkoutComplete = (day: number): boolean | null => {
  const workout = customWorkouts.value.find((workout) => {
    const workoutDateObj = new Date(workout.date);
    return (
      day === workoutDateObj.getDate() &&
      currentMonth.value === workoutDateObj.getMonth() &&
      currentYear.value === workoutDateObj.getFullYear()
    );
  });

  return workout && workout.complete !== undefined ? workout.complete : null; 
};

const dayClass = (day: number): string => {
  const today = new Date();
  if (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  ) {
    return "current-day"; // Style for the current day
  }

  const completeStatus = isWorkoutComplete(day);
  if (completeStatus === true) {
    return "workout-complete"; // Style for completed workouts
  } else if (completeStatus === false) {
    return "workout-incomplete"; // Style for incomplete workouts
  }

  return ""; // No additional style for days without workouts
};


const getWorkoutDetails = (day: number) => {
  return customWorkouts.value.filter((workout) => {
    const workoutDateObj = new Date(workout.date);
    //console.log(workout);
    return (
      day === workoutDateObj.getDate() &&
      currentMonth.value === workoutDateObj.getMonth() &&
      currentYear.value === workoutDateObj.getFullYear()
    );
  });

};

// Add a ref for tracking the hovered day
const hoveredDay = ref<number | null>(null);
onMounted(loadWorkouts);
</script>

<template>
  <div class="calendar-container">
    <!-- Calendar Header: Month Navigation and Display -->
    <div class="calendar-header">
      <button @click="changeMonth(-1)">← Previous</button>
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button @click="changeMonth(1)">Next →</button>
    </div>
    <div v-if="hoveredDay" class="workout-details">
      <div v-for="workout in getWorkoutDetails(hoveredDay)" :key="workout._id">
        <p>{{ workout.name }} - {{ workout.duration }} - {{ workout.calories }} calories</p>
      </div>
    </div>

    <!-- Calendar Grid: Displaying Days of the Month -->
    <div class="calendar-grid">
      <div
        v-for="(day, index) in daysInMonth"
        :key="index"
        class="calendar-day"
        :class="dayClass(day)"
        @click="selectDay(day)"
        @mouseover="hoveredDay = day"
        @mouseout="hoveredDay = null"
      >
        {{ day }}
        <!-- Optional: Displaying Additional Info on Each Day -->
        <span v-if="isWorkoutComplete(day) === true">✓</span>
        <span v-else-if="isWorkoutComplete(day) === false">✗</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.calendar-container {
  max-width: 600px; /* Increase the maximum width */
  margin: 2rem auto;
  background-color: #444;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  color: #f9f9f9;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px; /* Increase padding for larger header */
  background-color: #305d6e;
  font-weight: bold;
  font-size: 1.2em; /* Increase font size for better visibility */
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  padding: 20px; /* Increase padding for larger day cells */
  background-color: #666;
  transition: background-color 0.3s ease;
  position: relative;
  cursor: pointer;
  font-size: 1.1em; /* Increase font size inside day cells */
}

.calendar-day:hover {
  background-color: #777; /* Slightly lighter on hover */
}

.calendar-day.current-day {
  border: 2px solid #406e8f; /* Highlight current day with a different blue */
}

.calendar-day.workout-complete::after,
.calendar-day.workout-incomplete::after {
  content: "";
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.calendar-day.workout-complete::after {
  background-color: green; /* Green for completed workouts */
}

.calendar-day.workout-incomplete::after {
  background-color: red; /* Red for incomplete workouts */
}

.button {
  background-color: #406e8f; /* Button color matching header */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #305d6e; /* Darker shade on hover */
}

.workout-details {
  position: absolute;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10; /* Ensure it appears above other elements */
}
</style>