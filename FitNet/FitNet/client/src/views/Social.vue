
<script setup lang="ts">
import { usersArray} from '@/model/users';

</script>


//for loop to display user data
<template>
  <div>
    <div v-for="user in usersArray" :key="user.email" class="user-card">
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


}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
