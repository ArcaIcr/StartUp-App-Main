<template>
  <div
    class="flex justify-center items-center h-screen bg-gradient-to-r from-teal-200 to-teal-300"
  >
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-teal-700">Admin Login</h2>
      <form @submit.prevent="handleAdminLogin">
        <div class="mb-4">
          <label for="adminEmail" class="block text-sm font-medium text-gray-700"
            >Admin Email</label
          >
          <input
            type="email"
            id="adminEmail"
            v-model="email"
            placeholder="Enter admin email"
            aria-label="Admin Email"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>

        <div class="mb-4">
          <label for="adminPassword" class="block text-sm font-medium text-gray-700"
            >Admin Password</label
          >
          <input
            type="password"
            id="adminPassword"
            v-model="password"
            placeholder="Enter admin password"
            aria-label="Admin Password"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
          class="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Admin Login
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/login"
          class="text-sm text-teal-600 hover:underline hover:text-teal-800"
        >
          Back to Regular Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/authService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleAdminLogin() {
      this.errorMessage = "";
      console.log("Starting admin login process...");

      try {
        console.log("Attempting to authenticate user:", this.email);
        const userCredential = await login(this.email, this.password);
        console.log("Login response:", userCredential);

        // The login function now returns the merged user data with Firestore data
        if (!userCredential) {
          console.error("Authentication failed: No user data returned");
          this.errorMessage = "Authentication failed. Please check your credentials.";
          return;
        }

        console.log("User authenticated successfully, checking admin status...");
        
        // Explicitly check if the user is in the admins collection
        if (userCredential.collectionName !== 'admins') {
          console.error("User is not an admin");
          await this.logout();
          this.errorMessage = "Access denied. Admin privileges required.";
          return;
        }

        // Successful admin login - route to admin dashboard
        console.log("Attempting to navigate to admin dashboard");
        
        // Use absolute path to ensure correct routing for admin
        this.$router.push("/admin");
        console.log("Navigation to admin dashboard completed");
      } catch (error) {
        console.error("Admin login navigation error:", error);
        
        // More specific error handling
        if (error.message.includes('User document not found')) {
          this.errorMessage = "No admin account found. Please contact support.";
        } else if (error.message.includes('invalid-credential')) {
          this.errorMessage = "Invalid email or password. Please try again.";
        } else {
          this.errorMessage = error.message || "Login failed. Please try again.";
        }
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Additional styles for admin login */
</style>
