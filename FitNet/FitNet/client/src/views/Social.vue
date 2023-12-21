<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type User, getUsers, searchUsers  } from '@/model/users';

const usersIN = ref([] as User[]);
const searchQuery = ref('');
const searchedUsers = ref([] as User[]);

const loadUsers = async () => {
  try {
    const data = await getUsers();
    usersIN.value = data; 
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const filteredUsers = computed(() => {
  return usersIN.value.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// const filteredUsers = computed() => {
//   return await searchUsers(searchQuery.value);
// }



onMounted(loadUsers);

</script>

<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search users..." class="search-bar">

    <div v-for="user in filteredUsers" :key="user.email" class="user-card">
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

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
