<script setup lang="ts">
import { ref } from 'vue';

interface User {
  email: string;
  password: string;
}

const email = ref('');
const password = ref('');
const users: User[] = [];

const doLogin = () => {

};

const doSignUp = () => {
  users.push({ email: email.value, password: password.value });


  email.value = '';
  password.value = '';
};
</script>

<template>
  <div class="hero-body">
    <div class="column is-half is-offset-one-quarter">
      <div class="box">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input v-model="email" class="input" type="email" placeholder="Email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="password" class="input" type="password" placeholder="Password" />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <button @click="doLogin" class="button is-success">Login</button>
          </p>
          <p class="control">
            <button @click="doSignUp" class="button is-light">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
