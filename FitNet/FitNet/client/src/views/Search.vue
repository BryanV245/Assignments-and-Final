<script setup lang="ts">
import { ref, watch } from 'vue';
import { type User, searchUsers } from '@/model/users';

const searchQuery = ref('');
const searchedUsers = ref([] as User[]);

watch(searchQuery, async (newQuery) => {
  if (newQuery) {
    try {
      const results = await searchUsers(newQuery);
      searchedUsers.value = results;
    } catch (error) {
      console.error('Error searching users:', error);
    }
  } else {
    searchedUsers.value = [];
  }
});

const highlightMatch = (text: string, query: string) => {
  const highlightedText = text.replace(new RegExp(query, 'gi'), match => {
    return `<span class="highlight">${match}</span>`;
  });
  return highlightedText;
};
</script>

<template>
  <div class="search-container">
    <input type="text" v-model="searchQuery" placeholder="Search users..." class="search-bar">
    
    <div v-if="searchedUsers.length" class="dropdown">
      <div v-for="user in searchedUsers" :key="user.email" class="dropdown-item">
        <img :src="user.image" alt="User Image" class="user-image">
        <div class="user-info">
          <h2 v-html="highlightMatch(user.firstName + ' ' + user.lastName, searchQuery)"></h2>
          <p>{{ user.email }}</p>
          <p>Weekly Calories Burned: {{ user.weeklyCaloriesBurned }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.dropdown {
  position: absolute;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 1000; /* Ensure it's above other content */
}

.dropdown-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #f8f8f8;
}

.user-info {
  margin-left: 10px;
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.highlight {
  background-color: yellow;
}
.user-card {
  border: 1px solid #e1e1e1a1;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  background-color: #333;
  box-shadow: 0 0 15px rgba(0, 127, 255, 0.6);
  justify-content: space-between;
  transition: all 0.3s ease; /* Smooth transition for hover effect */
}

.user-card:hover {
  background-color: #444; /* Slightly lighter than the normal background */
  box-shadow: 0 0 20px rgba(0, 127, 255, 0.8); /* More prominent shadow */
  transform: translateY(-5px); /* Slight lift effect */
}

.user-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.search-container {
    position: relative; 
    width: 100%; 
  }
  
  .search-bar {
    width: 100%; 
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .dropdown {
    position: absolute;
    top: 100%; 
    left: 0;
    width: 100%; 
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
    border-radius: 4px;
    z-index: 1000;
  }

  
</style>
