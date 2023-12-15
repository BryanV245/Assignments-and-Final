<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { User } from "@/model/users";
import { getUsers, deleteUser, updateUser } from "@/model/users";

const usersIN = ref([] as User[]);

const loadUsers = async () => {
  try {
    const data = await getUsers();
    usersIN.value = data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

onMounted(loadUsers);

const handleRemoveUser = async (id: string) => {
  try {
    await deleteUser(id);
    usersIN.value = usersIN.value.filter((user) => user._id !== id);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
const handleMakeAdmin = async (user: User) => {
  try {
    await updateUser({ ...user, role: "admin" });
    usersIN.value = usersIN.value.map((u) =>
      u._id === user._id ? { ...u, role: "admin" } : u
    );
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
</script>

<template>
  <div>
    <div v-for="user in usersIN" :key="user.email" class="user-card">
      <img :src="user.image" alt="User Image" class="user-image" />
      <h2>{{ user.firstName + " " + user.lastName }}</h2>
      <p>{{ user.email }}</p>
      <p>User Role: {{ user.role }}</p>
      <div>
        <button
          v-if="user.role === 'user'"
          @click="() => handleMakeAdmin(user)"
        >
          Make Admin
        </button>
        <button
          v-if="user.role !== 'admin'"
          @click="() => handleRemoveUser(user._id)"
        >
          Delete
        </button>
      </div>
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
