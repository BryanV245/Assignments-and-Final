<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSession } from "@/model/session";
import { type User, updateUser } from "@/model/users";

const user = ref(getSession().user);
const showUpdateModal = ref(false);
const updateMessage = ref('');
const firstName = user.value?.firstName || '';
const lastName = user.value?.lastName || '';
const email = user.value?.email || '';
const age = user.value?.age || 0;
const weight = user.value?.weight || 0;
const caloriesGoal = user.value?.caloriesGoal || 0;

const updateProfile = async () => {
  if (user.value && user.value.id && user.value.firstName && user.value.lastName && user.value.email) {
    try {
      await updateUser(user.value);
      updateMessage.value = 'Profile updated successfully!';
      showUpdateModal.value = true;
    } catch (error) {
      console.error("Error updating profile:", error);
      updateMessage.value = 'Failed to update profile. Please try again.';
      showUpdateModal.value = true;
    }
  } else {
    console.error("User data is not valid");
    updateMessage.value = 'Invalid user data. Please check your input.';
    showUpdateModal.value = true;
  }
};

const closeModal = () => {
  showUpdateModal.value = false;
};

onMounted(() => {
});
</script>

<template>
  <main class="profile-container">
    <div class="card">
      <div class="card-content">
        <p class="title">My Profile</p>
        <div class="field">
          <label class="label">First Name</label>
          <input class="input" type="text" v-model="firstName" placeholder="Enter your first name" />
        </div>
        <div class="field">
          <label class="label">Last Name</label>
          <input class="input" type="text" v-model="lastName" placeholder="Enter your last name" />
        </div>
        <div class="field">
          <label class="label">Email</label>
          <input class="input" type="email" v-model="email" placeholder="Enter your email" />
        </div>
        <div class="field">
          <label class="label">Age</label>
          <input class="input" type="number" v-model="age" placeholder="Enter your age" />
        </div>
        <div class="field">
          <label class="label">Weight (lb)</label>
          <input class="input" type="number" v-model="weight" placeholder="Enter your weight" />
        </div>
        <div class="field">
          <label class="label">Weekly Calorie Goal</label>
          <input class="input" type="number" v-model="caloriesGoal" placeholder="Set your weekly calorie goal" />
        </div>

      </div>
      <footer class="card-footer">
        <button class="button is-link" @click="updateProfile">Update Profile</button>
      </footer>
    </div>
    
    <!-- Modal Popup -->
    <div v-if="showUpdateModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2 class="modal-title">Notification</h2>
        <p class="modal-message">{{ updateMessage }}</p>
        <button class="modal-close-btn" @click="closeModal">Close</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.profile-container {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}

.card {
  box-shadow: 0 0 20px rgba(0, 127, 255, 0.6);
  background-color: #444;
  border-radius: 10px;
  color: #f9f9f9;
}

.field {
  margin-bottom: 1rem;
}

.label {
  color: #f9f9f9;
}

.input {
  background-color: #666;
  color: #f9f9f9;
  border: none;
  padding: 8px;
}

.input::placeholder {
  color: #999;
}

.button {
  background-color: #406e8f;
  color: #f9f9f9;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #305d6e;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-title {
  margin-bottom: 10px;
}

.modal-message {
  margin-bottom: 20px;
}

.modal-close-btn {
  background-color: #406e8f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-close-btn:hover {
  background-color: #305d6e;
}
</style>
