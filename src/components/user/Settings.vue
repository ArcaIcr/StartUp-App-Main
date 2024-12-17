<template>
  <div class="settings-container p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-semibold mb-6">Account Settings</h2>

    <!-- Profile Section -->
    <div v-if="user" class="profile-section mb-6">
      <div class="flex items-center space-x-4">
        <img :src="user.profilePicture || defaultProfilePic" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover" />
        <div>
          <input type="file" @change="uploadProfilePic" accept="image/*" class="block mb-2" />
          <button v-if="isUploading" class="bg-blue-500 text-white px-4 py-2 rounded mt-2">Uploading...</button>
          <p v-if="profilePicError" class="text-red-500 mt-2 text-sm">{{ profilePicError }}</p>
        </div>
      </div>

      <div class="mt-4">
        <label for="username" class="block text-lg font-medium">Username</label>
        <input type="text" id="username" v-model="user.username" class="mt-2 p-2 border border-gray-300 rounded w-full" />
      </div>
    </div>

    <!-- Password Change Section -->
    <div class="password-section mb-6">
      <h3 class="text-2xl font-semibold mb-2">Change Password</h3>
      <input type="password" v-model="newPassword" placeholder="New Password" class="mt-2 p-2 border border-gray-300 rounded w-full" @input="checkPasswordStrength" />
      <p v-if="passwordFeedback" :class="passwordStrength < 3 ? 'text-red-500' : 'text-green-500'" class="mt-2 text-sm">{{ passwordFeedback }}</p>
      <button @click="changePassword" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Change Password</button>
      <p v-if="errors.password" class="text-red-500 text-sm mt-2">{{ errors.password }}</p>
    </div>

    <!-- Account Deletion Section -->
    <div class="account-deletion-section mb-6">
      <button @click="confirmDeleteAccount" class="bg-red-500 text-white px-4 py-2 rounded">Delete Account</button>
    </div>

    <!-- Save Changes and Back to Dashboard -->
    <div class="save-changes-section">
      <button @click="saveChanges" class="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
      <button @click="goToDashboard" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded">Back to Dashboard</button>
    </div>
  </div>
</template>

<script>
import { getAuth, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import zxcvbn from 'zxcvbn'; // Password strength checker
import { db } from '@/firebaseConfig'; // Adjust with the correct Firebase initialization

export default {
  data() {
    return {
      user: null,
      newPassword: '',
      passwordStrength: 0,
      passwordFeedback: '',
      errors: {
        password: '',
      },
      isUploading: false,
      profilePicError: '',
      defaultProfilePic: 'https://via.placeholder.com/150', // Fallback if user doesn't have a profile picture
    };
  },
  methods: {
    // Method to check password strength
    checkPasswordStrength() {
      if (this.newPassword) {
        const result = zxcvbn(this.newPassword);
        this.passwordStrength = result.score;
        this.passwordFeedback = result.feedback.warning || 
          (result.score >= 3 ? "Strong password" : "Weak password");
      } else {
        this.passwordStrength = 0;
        this.passwordFeedback = "";
      }
    },

    // Method to upload profile picture
    async uploadProfilePic(event) {
      if (this.isUploading) return;

      const file = event.target.files[0];
      if (file) {
        this.isUploading = true;
        this.profilePicError = ''; // Reset previous error
        try {
          const storage = getStorage();
          const fileRef = storageRef(storage, `profile_pictures/${this.user.email}/${file.name}`);
          await uploadBytes(fileRef, file);
          const url = await getDownloadURL(fileRef);
          this.user.profilePicture = url;
          await updateDoc(doc(db, 'users', this.user.uid), {
            profilePicture: url,
          });
        } catch (error) {
          this.profilePicError = 'Error uploading profile picture. Please try again.';
          console.error("Error uploading profile picture:", error);
        } finally {
          this.isUploading = false;
        }
      }
    },

    // Method to change the password
    async changePassword() {
      if (this.newPassword.length < 6) {
        this.errors.password = "Password must be at least 6 characters long.";
        return;
      }
      this.errors.password = "";
      try {
        const user = getAuth().currentUser;
        await updatePassword(user, this.newPassword);
        alert("Password updated successfully.");
      } catch (error) {
        console.error("Error changing password:", error);
      }
    },

    // Method to confirm and delete account
    async confirmDeleteAccount() {
      const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.");
      if (confirmation) {
        try {
          await deleteDoc(doc(db, 'users', this.user.uid));
          await getAuth().currentUser.delete();
          alert("Account deleted successfully.");
          // Redirect user to login page or home page after deletion
          this.$router.push('/login');
        } catch (error) {
          console.error("Error deleting account:", error);
        }
      }
    },

    // Method to save changes made to the profile
    async saveChanges() {
      try {
        await updateDoc(doc(db, "users", this.user.uid), {
          username: this.user.username,
        });
        alert("Profile updated successfully.");
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    },

    // Method to redirect user back to dashboard
    goToDashboard() {
      this.$router.push("/dashboard");
    }
  },

  async mounted() {
    const user = getAuth().currentUser;
    if (user) {
      // Fetch user details from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        this.user = userDocSnap.data();
      }
    }
  },
};
</script>

<style scoped>
.settings-container {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-section input,
.password-section input,
.account-deletion-section button,
.save-changes-section button {
  transition: all 0.3s ease;
}

.profile-section input:hover,
.password-section input:hover,
.account-deletion-section button:hover,
.save-changes-section button:hover {
  background-color: var(--accent-light);
}

button {
  cursor: pointer;
}
</style>
