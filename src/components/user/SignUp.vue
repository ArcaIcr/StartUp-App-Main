<template>
  <div
    class="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-gray-300"
  >
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-darkblue">Sign Up</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            required
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            required
          />
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Confirm your password"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            required
          />
        </div>

        <div class="mb-4">
          <label class="flex items-center">
            <input
              type="checkbox"
              v-model="isAdmin"
              class="form-checkbox h-4 w-4 text-teal-600"
            />
            <span class="ml-2 text-sm text-gray-700">Register as Admin</span>
          </label>
        </div>

        <div v-if="isAdmin" class="mb-4">
          <label for="adminCode" class="block text-sm font-medium text-gray-700"
            >Admin Registration Code</label
          >
          <input
            type="password"
            id="adminCode"
            v-model="adminCode"
            placeholder="Enter admin registration code"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            required
          />
        </div>

        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 p-2 rounded-lg mb-4"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"; // Assuming Vuex is used to handle registration

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      adminCode: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    async handleSubmit() {
      this.errorMessage = "";

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      if (this.isAdmin && this.adminCode !== "ADMIN123") { 
        this.errorMessage = "Invalid admin registration code";
        return;
      }

      try {
        const registrationResult = await this.register({
          username: this.username,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin,
        });
        
        // Route based on the collection name or isAdmin flag
        this.$router.push(registrationResult.collectionName === 'admins' ? "/admin" : "/assessment"); 
      } catch (error) {
        console.error("Registration error:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Additional styles can be added here */
</style>
