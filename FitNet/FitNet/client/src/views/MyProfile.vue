  <script setup lang="ts">
  import { getSession } from '@/model/session';


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
    border: 1px solid #e1e1e1a1;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 127, 255, 0.6);
    padding: 20px;
    text-align: center;
    background-color: #333;
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
