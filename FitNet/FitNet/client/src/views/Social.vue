<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { type User, getUsers } from '@/model/users';

const usersIN = ref([] as User[]);


//loads users from the database
const loadUsers = async () => {
  try {
    const data = await getUsers();
    usersIN.value = data; 
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

onMounted(loadUsers);

</script>

<template>
  <div>
    <!-- <-- iterate throught retrieved users and show on screen -->
    <div v-for="user in usersIN" :key="user.email" class="user-card">
      <img :src="user.image" alt="User Image" class="user-image">
      <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
      <p>{{ user.email }}</p>
      <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  border: 1px solid #e1e1e1a1;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  background-color: #333;
  box-shadow: 0 0 15px rgba(0, 127, 255, 0.6);
  justify-content: space-between;

}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
