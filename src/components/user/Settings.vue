<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <button @click="goBack" class="mb-4 text-blue-500 hover:underline">
      ← Back
    </button>
    <h2 class="text-2xl font-bold mb-4">Settings</h2>

    <form @submit.prevent="handleSubmit">
      <!-- Profile Picture Upload -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Profile Picture</label
        >
        <div class="mt-2 flex items-center">
          <img
            :src="user.profilePicture || 'default_profile_picture_url'"
            alt="Profile"
            class="h-16 w-16 rounded-full object-cover mr-4"
          />
          <input type="file" @change="uploadProfilePic" />
          <span v-if="isUploading" class="ml-2 text-gray-500"
            >Uploading...</span
          >
        </div>
      </div>

      <!-- Username -->
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

      <!-- Email -->
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

      <!-- New Password -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >New Password</label
        >
        <input
          type="password"
          id="password"
          v-model="newPassword"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          @click.prevent="changePassword"
          class="mt-2 text-blue-500 hover:underline"
        >
          Change Password
        </button>
      </div>

      <!-- Notification Preferences -->
      <div class="mb-4">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            v-model="notificationsEnabled"
            class="form-checkbox"
          />
          <span class="ml-2">Email Notifications</span>
        </label>
      </div>

      <!-- Security Settings -->
      <h3 class="text-lg font-semibold mt-6">Security Settings</h3>
      <div class="mb-4">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            v-model="twoFactorEnabled"
            class="form-checkbox"
          />
          <span class="ml-2">Enable Two-Factor Authentication</span>
        </label>
      </div>

      <!-- Subscription Management -->
      <h3 class="text-lg font-semibold mt-6">Subscription Management</h3>
      <p>Your current plan: {{ subscriptionPlan }}</p>
      <button
        @click.prevent="changePlan"
        class="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Change Plan
      </button>

      <!-- Data Management -->
      <h3 class="text-lg font-semibold mt-6">Data Management</h3>
      <button
        @click.prevent="deleteAccount"
        class="bg-red-500 text-white py-2 px-4 rounded"
      >
        Delete Account
      </button>

      <button
        :disabled="isUploading"
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Save Changes
      </button>
    </form>
  </div>
</template>

<script>
import { auth, db } from "@/firebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        profilePicture: "",
      },
      newPassword: "",
      notificationsEnabled: false,
      twoFactorEnabled: false,
      subscriptionPlan: "Basic", // Placeholder for current subscription plan
      isUploading: false,
    };
  },
  mounted() {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          this.user.username = data.username || "";
          this.user.email = data.email || "";
          this.user.profilePicture = data.profilePicture || "";
          this.notificationsEnabled = data.notificationsEnabled || false;
          this.twoFactorEnabled = data.twoFactorEnabled || false;
        }
      });
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.user.username || !this.user.email) {
        alert("Username and email are required.");
        return;
      }

      const user = auth.currentUser;
      const userRef = doc(db, "users", user.uid);

      try {
        await updateDoc(userRef, {
          username: this.user.username,
          email: this.user.email,
          profilePicture: this.user.profilePicture,
          notificationsEnabled: this.notificationsEnabled,
          twoFactorEnabled: this.twoFactorEnabled,
        });

        if (this.newPassword) {
          await user.updatePassword(this.newPassword);
        }

        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert(
          "An error occurred while updating your profile. Please try again."
        );
      }
    },
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
    async uploadProfilePic(event) {
      const file = event.target.files[0];
      if (file) {
        this.isUploading = true; // Set to true when the upload starts
        try {
          const storage = getStorage();
          const storageRefPath = `profile_pictures/${auth.currentUser.uid}/${file.name}`;
          const fileRef = storageRef(storage, storageRefPath);

          // Upload the file to Firebase Storage
          await uploadBytes(fileRef, file);

          // Get the download URL
          const downloadURL = await getDownloadURL(fileRef);
          this.user.profilePicture = downloadURL; // Set the URL for display and saving
          alert("Profile picture updated successfully!");
        } catch (error) {
          alert("Failed to upload profile picture. Please try again.");
        } finally {
          this.isUploading = false; // Always reset after upload completes
        }
      }
    },
    changePlan() {
      alert("Change plan feature is not yet implemented.");
    },
    async deleteAccount() {
      const confirmed = confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (confirmed) {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          try {
            // Delete user data from Firestore
            await deleteDoc(userRef);
            // Delete user account from Firebase Authentication
            await user.delete();
            alert("Your account has been deleted successfully.");
            // Redirect to home or login page after deletion
            this.$router.push("/"); // Change the path as needed
          } catch (error) {
            console.error("Error deleting account:", error);
            alert(
              "An error occurred while deleting your account. Please try again."
            );
          }
        }
      }
    },
    async changePassword() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("No authenticated user found. Please log in.");
        return;
      }

      if (!this.newPassword) {
        alert("Please enter a new password.");
        return;
      }

      try {
        await updatePassword(user, this.newPassword); // Use the modular approach
        alert("Password changed successfully!");
        this.newPassword = ""; // Clear the password field after successful change
      } catch (error) {
        console.error("Error changing password:", error);
        alert("An error occurred while changing your password. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
