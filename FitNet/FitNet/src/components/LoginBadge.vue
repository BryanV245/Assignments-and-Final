<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSession, useLogin } from '@/model/session';

interface User {
  email: string;
  password: string;
}

const session = getSession();
const { login, logout } = useLogin();
const router = useRouter();

const users: User[] = [
  { email: 'atuny0@sohu.com', password: '9uQFF1Lh' },
  { email: 'rshawe2@51.la', password: 'OWsTbMUgFc' },
  { email: 'yraigatt3@nature.com', password: 'sRQxjPfdS' },
  { email: 'kmeus4@upenn.edu', password: 'aUTdmmmbH' },
  { email: 'dpettegre6@columbia.edu', password: 'YVmhktgYVS' },

];

const showDropdown = ref(false);
const newEmail = ref('');
const newPassword = ref('');

const loginUser = async (user: User) => {
  console.log("Attempting to login with user:", user);
  try {
    await login(user.email, user.password);
    console.log("Login successful!");
    showDropdown.value = false;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};



const navigateToLoginPage = () => {
  router.push('/login'); 
};

const doLogout = () => {
  logout();
  showDropdown.value = false;
};
</script>

<template>
  <div class="has-text-right" v-if="session.user">
    Welcome, {{ session.user.firstName }} {{ session.user.lastName }} <br>
    <small>
      {{ session.user.email }}
      <a class="button is-small is-light is-warning" @click.prevent="doLogout">
        <span class="icon">
          <i class="fas fa-sign-out-alt"></i>
        </span>
      </a>
    </small>
  </div>
  <div v-else>
    <div class="dropdown" v-bind:class="{ 'is-active': showDropdown }" 
         @mouseenter="showDropdown = true" 
         @mouseleave="showDropdown = false">
      <div class="dropdown-trigger">
        <a class="button is-light" @click="navigateToLoginPage">
          Log in
        </a>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a 
            v-for="user in users" 
            :key="user.email" 
            href="#" 
            class="dropdown-item"
            @click.prevent="loginUser(user)"
          >
            {{ user.email }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


