<template>
  <div
    class="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-gray-300"
  >
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-darkblue">Log In</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            aria-label="Email"
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
            aria-label="Password"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            required
          />
        </div>

        <div class="text-right mb-4">
          <router-link
            to="/forgot-password"
            class="text-sm text-lightblue hover:underline"
          >
            Forgot Password?
          </router-link>
        </div>

        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 p-2 rounded-lg mb-4"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-offset-2"
        >
          {{ loading ? "Logging in..." : "Log In" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/authService"; // Assuming this handles authentication

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false, // Loading state for button
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";
      this.loading = true; // Start loading state

      try {
        await login(this.email, this.password);
        this.$router.push("/dashboard"); // Redirect to the dashboard after successful login
      } catch (error) {
        if (error.code === "auth/invalid-email") {
          this.errorMessage = "Please enter a valid email address.";
        } else if (error.code === "auth/wrong-password") {
          this.errorMessage = "Incorrect password. Please try again.";
        } else {
          this.errorMessage =
            error.message || "Login failed. Please try again.";
        }
      } finally {
        this.loading = false; // Stop loading state
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Additional styles can be added here */
</style>
