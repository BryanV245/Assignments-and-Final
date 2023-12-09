  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { User } from '@/model/users';
  import { getUsers, deleteUser } from '@/model/users';

  const usersIN = ref([] as User[])

  const loadUsers = async () => {
  try {
    const data = await getUsers();
    usersIN.value = data; // Ensure this matches the structure of your getUsers response
  } catch (error) {
    console.error('Error fetching users:', error);
    // Handle error appropriately
  }
};

onMounted(loadUsers);

const handleRemoveUser = async (id: string) => {
  try {
    await deleteUser(id);
    usersIN.value = usersIN.value.filter(user => user._id !== id); // Remove the user from the local state
  } catch (error) {
    console.error('Error deleting user:', error);
    // Handle errors (e.g., show a notification to the user)
  }
};

  </script>

  <template>
    <div>
      <div v-for="user in usersIN" :key="user.email" class="user-card">
        <img :src="user.image" alt="User Image" class="user-image">
        <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
        <p>{{ user.email }}</p>
        <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
        <button @click="() => handleRemoveUser(user._id)">Delete</button>
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





  <!-- <script setup lang="ts">
  import { ref } from 'vue';
  import { usersArray, deleteUser } from '@/model/users';
  import type { User } from '@/model/users';


  const usersIN = ref<User[]>(usersArray);

  const handleRemoveUser = async (id: number) => {
    await deleteUser(id);
    usersIN.value = usersArray 
  };


  </script>


  <template>
    <div>
      <div v-for="user in usersIN" :key="user.email" class="user-card">
        <img :src="user.image" alt="User Image" class="user-image">
        <h2>{{ user.firstName + ' ' + user.lastName }}</h2>
        <p>{{ user.email }}</p>
        <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
        <button @click="handleRemoveUser(user.id)">Delete</button>
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
  </style> -->
