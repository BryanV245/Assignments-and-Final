<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSession, useLogin } from '@/model/session';

const session = getSession();
const router = useRouter();



document.addEventListener("DOMContentLoaded", function() {
    const workouts = [
        { day: 'Monday', caloriesBurned: 500 },
        { day: 'Tuesday', caloriesBurned: 450 },
        { day: 'Wednesday', caloriesBurned: 600 },
        { day: 'Thursday', caloriesBurned: 520 },
        { day: 'Friday', caloriesBurned: 490 },
        { day: 'Saturday', caloriesBurned: 700 },
        { day: 'Sunday', caloriesBurned: 480 },
    ];

    const workoutStatsDiv = document.getElementById('workout-stats');

    if (!workoutStatsDiv) {
        console.error("Element with ID 'workout-stats' not found!");
        return;
    }
    workouts.forEach(workout => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column is-one-sixth has-text-centered';
        
        const dayHeader = document.createElement('h2');
        dayHeader.className = 'subtitle';
        dayHeader.textContent = workout.day;
        
        const calorieDiv = document.createElement('div');
        calorieDiv.className = 'box';
        calorieDiv.textContent = `${workout.caloriesBurned} cal`;

        columnDiv.appendChild(dayHeader);
        columnDiv.appendChild(calorieDiv);
        workoutStatsDiv.appendChild(columnDiv);
    });
});



document.addEventListener("DOMContentLoaded", function() {

const loadWorkouts = async () => {

    try {
        const response = await fetch('/path-to-your-json.json'); // replace with your actual path
        const data = await response.json();

                  interface Exercise {
              [key: string]: number;
          }
          const workouts = data.users[0].exercises.map((exercise: Exercise) => ({
              workout: Object.keys(exercise)[0],
              caloriesBurned: Object.values(exercise)[0]
          }));

        const AllTimeStats = document.getElementById('all-time-stats');
        if (!AllTimeStats) {
            console.error("Element with ID 'all-time-stats' not found!");
            return;
          }

              interface Workout {
              workout: string;
              caloriesBurned: number;
            }

            workouts.forEach((workout: Workout) => {
            const columnDiv = document.createElement('div');
            columnDiv.className = 'column is-one-sixth has-text-centered';
            
            const WorkoutHeader = document.createElement('h2');
            WorkoutHeader.className = 'subtitle';
            WorkoutHeader.textContent = workout.workout;
            
            const calorieDiv = document.createElement('div');
            calorieDiv.className = 'box';
            calorieDiv.textContent = `${workout.caloriesBurned} cal`;

            columnDiv.appendChild(WorkoutHeader);
            columnDiv.appendChild(calorieDiv);
            AllTimeStats.appendChild(columnDiv);
        });
    } catch (error) {
        console.error('Failed to fetch workouts:', error);
    }
};

loadWorkouts();
});




// document.addEventListener("DOMContentLoaded", function() {
//     const workouts = [
//         { workout: 'Running', caloriesBurned: 4000 },
//         { workout: 'Swimming', caloriesBurned: 5000 },
//         { workout: 'Rowing', caloriesBurned: 7000 },
//         { workout: 'Boxing', caloriesBurned: 399 },
//         { workout: 'Weight Lifting', caloriesBurned: 490 },
//         { workout: 'Walking', caloriesBurned: 700 },
//         { workout: 'Yoga', caloriesBurned: 480 },
//     ];

//     const AllTimeStats = document.getElementById('all-time-stats');
//     if (!AllTimeStats) {
//         console.error("Element with ID 'workout-stats' not found!");
//         return;
//     }

//     workouts.forEach(workout => {
//         const columnDiv = document.createElement('div');
//         columnDiv.className = 'column is-one-sixth has-text-centered';
        
//         const  WorkoutHeader = document.createElement('h2');
//         WorkoutHeader.className = 'subtitle';
//         WorkoutHeader.textContent = workout.workout;
        

//         const calorieDiv = document.createElement('div');
//         calorieDiv.className = 'box';
//         calorieDiv.textContent = `${workout.caloriesBurned} cal`;

//         columnDiv.appendChild(WorkoutHeader);
//         columnDiv.appendChild(calorieDiv);
//         AllTimeStats.appendChild(columnDiv);
//     });
// });


</script>

<template>
  <main class="columns is-multiline is-centered">
    <div class = "column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <p class="title">
            Weekly Calorie Burn Progress
          </p>
          <p class="subtitle">
            3500 cal
          </p>

          <p class="title">
            Weekly Calorie Burn Goal
          </p>
          <p class="subtitle">
            5000 cal
          </p>
          <progress class="progress is-link" value="70" max="100">70%</progress>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>
              View Details
            </span>
          </p>
          <p class="card-footer-item">
            <span>
              Share
            </span>
          </p>
        </footer>
      </div>
    </div>


    <div class = "column is-three-quarters">
      <div class = "card">
        <title> Weelly Calorie Burn Progress</title>
        <section class="section">
        <div class="container">
            <h1 class="title has-text-centered">Weekly Calorie Burn Progress</h1>
            <div id="workout-stats" class="columns is-multiline"></div>
        </div>
        </section>
        <div class = "card">
          <title> All Time stats</title>
          <section class="section">
          <div class="container">
              <h1 class="title has-text-centered">All Time stats</h1>
              <div id="all-time-stats" class="columns is-multiline"></div>
          </div>
          </section>
    </div>
    </div>
    </div>

    
  </main>


</template>
