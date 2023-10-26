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
    background: #ffffff;
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















<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserData from '../data/users.json';

type User = {
  id?: number,
  email: string;
  image: string;
  firstName: string;
  lastName: string;
  weeklyCaloriesBurned: number;
};

function getLocalCaloriesBurned(email: string, id: number): number {
  const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
  return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
}

// Users array
const users = ref<User[]>([]);

onMounted(() => {
  try {
    users.value = UserData.users.map(user => ({
      ...user,
      weeklyCaloriesBurned: getLocalCaloriesBurned(user.email, user.id)
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
});

const deleteUser = (email: string) => {
  users.value = users.value.filter(user => user.email !== email);
}
</script>



//for loop to display user data
<template>
  <div>
    <div v-for="user in users" :key="user.email" class="user-card">
      <img :src="user.image" alt="User Image" class="user-image">
      <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
      <p>{{ user.email }}</p>
      <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
      <button @click="deleteUser(user.email)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #e1e1e1;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
 -->
