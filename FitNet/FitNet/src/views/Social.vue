<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserData from '../data/users.json';


//sets user data
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

//users array
const users = ref<User[]>([]);

onMounted(() => {
  try {
    // Accessing the users property on UserData
    users.value = UserData.users.map(user => ({
      ...user,
      weeklyCaloriesBurned: getLocalCaloriesBurned(user.email, user.id)
    }));
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
});
</script>


//for loop to display user data
<template>
  <div>
    <div v-for="user in users" :key="user.email" class="user-card">
      <img :src="user.image" alt="User Image" class="user-image">
      <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
      <p>{{ user.email }}</p>
      <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
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
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
