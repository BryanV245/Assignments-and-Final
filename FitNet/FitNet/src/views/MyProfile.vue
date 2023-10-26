  <script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
  import { getSession, useLogin } from '@/model/session';
  import UserData from '../data/users.json';

  //sets user data
  interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "admin" | "user",
    token?: string,
    image?: string,
    age?: number,
    weight?: number
  }


  //gets logged in user
  const user = getSession().user!;

  function getLocalCaloriesBurned(id: number): number {
  const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
  return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
}


  </script>



  <template>
    <div class="profile-card">
      <figure class="profile-image">
        <img :src="user.image" alt="User Image">
      </figure>

      <h1 class="profile-name">{{ user.firstName + ' ' + user.lastName }}</h1>

      <ul class="profile-details">
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li><strong>Age:</strong> {{ user.age }}</li>
        <li><strong>Weight:</strong> {{ user.weight }} lb</li>
        <li><strong>Weekly Calories Burned:</strong> {{ getLocalCaloriesBurned(user.id) || 'Data not available' }}</li>
      </ul>
    </div>
  </template>

  <style scoped>

  
  .profile-card {
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 20px;
    text-align: center;
  }

  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto 20px;
    overflow: hidden;
  }

  .profile-image img {
    width: 100%;
    height: auto;
  }

  .profile-name {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .profile-details {
    list-style: none;
    padding: 0;
  }

  .profile-details li {
    font-size: 18px;
    margin-bottom: 8px;
  }
  </style>
