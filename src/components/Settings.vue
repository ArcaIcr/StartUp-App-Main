<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Settings</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700"
          >Username</label
        >
        <input
          type="text"
          id="username"
          v-model="user.username"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="user.email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
      },
    };
  },
  mounted() {
    // Fetch user data from your auth provider or database
    const user = auth.currentUser;
    if (user) {
      this.user.username = user.displayName || "Guest"; // Adjust based on your user data
      this.user.email = user.email;
    }
  },
  methods: {
    async handleSubmit() {
      // Implement logic to update user details in your auth provider or database
      // Example: Update displayName and email
      const user = auth.currentUser;
      try {
        await user.updateProfile({
          displayName: this.user.username,
        });
        // Add logic to update email if necessary
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
