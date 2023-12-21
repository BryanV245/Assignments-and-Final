<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getSession } from "@/model/session";
import { getWorkouts, type Workout } from "@/model/workouts";

const user = getSession().user;
const userID = user?.id;
const hoveredDay = ref<number | null>(null);
const customWorkouts = ref<Workout[]>([]);
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

// Get the name of the current month
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

// Change the month and year
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

// Select a day on the calendar
const selectDay = (day: number): void => {
  selectedDay.value = day;
};

// Check if a workout is complete for a specific day
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

// Style the calendar days based on the workout completion status
//red for incomplete, green for completed
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

  return "";
};

// Get the workouts for a specific day for the hover effect
const getWorkoutDetails = (day: number) => {
  return customWorkouts.value.filter((workout) => {
    const workoutDateObj = new Date(workout.date);
    return (
      day === workoutDateObj.getDate() &&
      currentMonth.value === workoutDateObj.getMonth() &&
      currentYear.value === workoutDateObj.getFullYear()
    );
  });
};

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
        <p>
          {{ workout.name }} - {{ workout.duration }} -
          {{ workout.calories }} calories
        </p>
      </div>
    </div>

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

        <span v-if="isWorkoutComplete(day) === true">✓</span>
        <span v-else-if="isWorkoutComplete(day) === false">✗</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.calendar-container {
  max-width: 800px;
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
  padding: 20px;
  background-color: #305d6e;
  font-weight: bold;
  font-size: 1.4em;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.calendar-day {
  padding: 25px;
  background-color: #666;
  transition: background-color 0.3s ease;
  position: relative;
  cursor: pointer;
  font-size: 1.2em;
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
