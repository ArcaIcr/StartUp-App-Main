<template>
  <div
    class="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-gray-300"
  >
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-darkblue">
        Forgot Password
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
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

        <!-- Success Message -->
        <div
          v-if="message"
          class="bg-green-100 border border-green-400 text-green-700 p-2 rounded-lg mb-4"
        >
          {{ message }} Please check your inbox and follow the instructions.
        </div>

        <!-- Error Message -->
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
          {{ loading ? "Sending..." : "Send Reset Link" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { sendPasswordResetEmail } from "@/authService"; // Assuming this handles sending reset email

export default {
  data() {
    return {
      email: "",
      message: "",
      errorMessage: "",
      loading: false, // Loading state for button
    };
  },
  methods: {
    async handleSubmit() {
      this.message = "";
      this.errorMessage = "";
      this.loading = true; // Start loading state

      try {
        await sendPasswordResetEmail(this.email);
        this.message = "A reset link has been sent to your email."; // Success message
      } catch (error) {
        this.errorMessage =
          error.message || "Failed to send reset link. Please try again.";
      } finally {
        this.loading = false; // Stop loading state
      }
    },
  },
};
</script>
