<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserByEmail, deleteUser,getUsers } from '@/model/users';


// Local storage access
function getLocalCaloriesBurned(email: string, id: number): number {
  const weeklyCaloriesBurnedKey = `weeklyCaloriesBurned_${id}`;
  return parseInt(localStorage.getItem(weeklyCaloriesBurnedKey) || '0', 10);
}

// Users array
let usersArray = getUsers().map(user => ({
  ...user,
  weeklyCaloriesBurned: getLocalCaloriesBurned(user.email, user.id)
}));


const removeUser = async (id: number) => {
  await deleteUser(id);
  usersArray = usersArray.filter(user => user.id !== id);
};


</script>

<template>
  <div>
    <div v-for="user in usersArray" :key="user.email" class="user-card">
      <img :src="user.image" alt="User Image" class="user-image">
      <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
      <p>{{ user.email }}</p>
      <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
      <button @click="removeUser(user.id)">Delete</button>
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