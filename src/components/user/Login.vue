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
          :disabled="loading || isLocked"
          class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-offset-2"
        >
          {{ loading ? "Logging in..." : "Log In" }}
        </button>

        <div v-if="isLocked" class="mt-4 text-red-600 text-center">
          Your account is locked due to too many failed attempts. Please try
          again in
          <span class="font-semibold">{{ remainingTime }}</span> seconds.
        </div>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-lightblue hover:underline">
            Sign Up
          </router-link>
        </p>
      </div>

      <div class="mt-4 text-center">
        <div class="flex items-center justify-center">
          <hr class="w-1/4 border-t border-gray-300" />
          <span class="mx-4 text-sm text-gray-500">Admin Access</span>
          <hr class="w-1/4 border-t border-gray-300" />
        </div>
        <div class="mt-4">
          <router-link
            to="/admin-login"
            class="text-sm text-teal-600 hover:underline hover:text-teal-800"
          >
            Admin Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/authService";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      loading: false, // Loading state for button
      failedAttempts: 0, // Track the number of failed attempts
      isLocked: false, // Lock the account after too many attempts
      lockDuration: 30, // Lock duration in seconds (e.g., 30 seconds)
      remainingTime: 0, // Time left until account unlock
      lockInterval: null, // Timer interval
    };
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";
      this.loading = true; // Start loading state

      if (this.isLocked) {
        this.errorMessage = "Your account is locked. Please try again later.";
        this.loading = false;
        return;
      }

      try {
        await login(this.email, this.password);
        this.$router.push("/dashboard"); // Redirect to the dashboard after successful login
        this.failedAttempts = 0; // Reset failed attempts on successful login
        this.clearLock(); // Clear any existing lock
      } catch (error) {
        this.failedAttempts++;

        if (this.failedAttempts >= 3) {
          this.isLocked = true; // Lock the account
          this.remainingTime = this.lockDuration; // Set remaining time to lock duration
          this.startLockTimer(); // Start the countdown timer
        }

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
    startLockTimer() {
      this.lockInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime <= 0) {
          this.clearLock();
        }
      }, 1000); // Update every second
    },
    clearLock() {
      this.isLocked = false;
      this.failedAttempts = 0; // Reset failed attempts
      clearInterval(this.lockInterval); // Clear the timer interval
      this.remainingTime = 0; // Reset remaining time
    },
  },
  beforeDestroy() {
    clearInterval(this.lockInterval); // Clear interval on component destruction
  },
};
</script>

<style scoped>
/* Optional: Additional styles can be added here */
</style>
