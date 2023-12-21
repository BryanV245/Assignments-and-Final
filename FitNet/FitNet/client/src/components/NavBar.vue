<script setup lang="ts">
import { ref, computed } from 'vue'; 
import { RouterLink } from 'vue-router';
import LoginBadge from './LoginBadge.vue';
import { getSession } from '@/model/session';

// get the session and assign to a reactive ref
const session = ref(getSession());

// pull user role using a computed , which is also reactive
const userRole = computed(() => session.value?.user?.role);

const isActive = ref(false);
</script>

<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="28" height="28" />
      </a>

      <a role="button" class="navbar-burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/" >My Dashboard</RouterLink>
        <RouterLink class="navbar-item" to="/Social">Social</RouterLink>
        <RouterLink class="navbar-item" to="/Plan">Plan</RouterLink>
        <RouterLink class="navbar-item" to="/MyProfile">My Profile</RouterLink>
        <RouterLink class="navbar-item" to="/Lifetime">Lifetime</RouterLink>
        <RouterLink v-if="userRole === 'admin'" class="navbar-item" to="/Admin">Admin</RouterLink>
        <RouterLink class="navbar-item" to="/Search">Search</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
         
        </div>
        <div class="navbar-item">
          <LoginBadge />
        </div>
      </div>
    </div>
  </nav>
 
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid #00d1b2;
}
</style>