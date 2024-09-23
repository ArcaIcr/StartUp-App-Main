<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">User Profile</h2>
    <div>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Add more user details as needed -->
    </div>
    <router-link
      to="/settings"
      class="text-blue-500 hover:underline mt-4 inline-block"
      >Edit Profile</router-link
    >
    <button
      @click="logout"
      class="mt-4 bg-red-500 text-white py-2 px-4 rounded"
    >
      Log Out
    </button>
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
    logout() {
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
