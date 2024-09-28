<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-darkblue">
        Reset Password
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label
            for="newPassword"
            class="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            placeholder="Enter your new password"
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
          Reset Password
        </button>
      </form>

      <div v-if="successMessage" class="mt-4 text-green-500 text-center">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  confirmPasswordReset,
  getAuth,
  verifyPasswordResetCode,
} from "firebase/auth";

export default {
  data() {
    return {
      newPassword: "",
      errorMessage: "",
      successMessage: "",
      code: "https://startup-compass.firebaseapp.com/reset-password?oobCode={oobCode}", // To store the oobCode from the URL
    };
  },
  created() {
    // Extract the oobCode (one-time password reset code) from the URL
    this.code = this.$route.query.oobCode;

    if (!this.code) {
      this.errorMessage = "Invalid password reset link.";
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.newPassword) {
        this.errorMessage = "Please enter a new password.";
        return;
      }

      const auth = getAuth();

      try {
        // Verify the password reset code
        await verifyPasswordResetCode(auth, this.code);

        // Confirm the new password
        await confirmPasswordReset(auth, this.code, this.newPassword);

        // Display success message
        this.successMessage = "Password has been reset successfully!";
        this.errorMessage = "";

        // Optionally, redirect to login page
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } catch (error) {
        this.errorMessage =
          error.message || "Failed to reset password. Please try again.";
        this.successMessage = "";
      }
    },
  },
};
</script>

<style scoped>
/* Add any specific styling here if needed */
</style>
