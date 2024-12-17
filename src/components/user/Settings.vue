<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto mb-4">
      <button 
        @click="goToDashboard" 
        class="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd" />
        </svg>
        Back to Dashboard
      </button>
    </div>

    <div class="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 class="text-3xl font-bold text-white">Account Settings</h2>
      </div>
      
      <div class="p-6">
        <!-- Profile Section -->
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4 border-b pb-2">Profile Details</h3>
          
          <div class="flex items-center space-x-6">
            <div class="relative">
              <img 
                :src="user.profilePicture || 'default_profile_picture_url'" 
                alt="Profile" 
                class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <label 
                class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600"
              >
                <input 
                  type="file" 
                  class="hidden" 
                  @change="uploadProfilePic"
                />
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 015.586 3H8.414a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
              </label>
            </div>
            
            <div>
              <input 
                v-model="user.username" 
                placeholder="Username" 
                class="text-xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 transition-all duration-300"
              />
              <p class="text-gray-500 mt-1">{{ user.email }}</p>
            </div>
          </div>
        </section>

        <!-- Account Management -->
        <section class="mb-8">
          <h3 class="text-xl font-semibold mb-4 border-b pb-2">Account Management</h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <!-- Email Settings (Now only display email) -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium mb-2">Email</h4>
              <p class="text-gray-500">{{ user.email }}</p>
            </div>

            <!-- Password Reset -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-medium mb-2">Password</h4>
              <input 
                v-model="newPassword" 
                type="password" 
                placeholder="New password" 
                class="w-full px-3 py-2 border rounded-md mb-2"
              />
              <p v-if="errors.password" class="text-red-500 mt-1">{{ errors.password }}</p>
              <div v-if="passwordStrength > 0" class="mb-2">
                <p class="text-gray-500">Password strength: {{ passwordFeedback }}</p>
                <div class="w-full h-2 bg-gray-200 rounded-full">
                  <div :class="['h-2 rounded-full', passwordStrength >= 3 ? 'bg-green-500' : 'bg-red-500']" :style="{ width: `${passwordStrength * 33}%` }"></div>
                </div>
              </div>
              <button 
                @click="changePassword" 
                class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Change Password
              </button>
            </div>
          </div>
        </section>

        <!-- Danger Zone -->
        <section>
          <h3 class="text-xl font-semibold mb-4 border-b border-red-300 pb-2 text-red-600">Danger Zone</h3>
          
          <div class="bg-red-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 class="font-bold text-red-700">Delete Account</h4>
              <p class="text-red-500 text-sm">This action cannot be undone</p>
            </div>
            <button 
              @click="confirmDeleteAccount" 
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>
      
      <div class="flex justify-end">
        <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" @click="saveChanges">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import zxcvbn from "zxcvbn"; // Password strength checker

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        profilePicture: "",
      },
      newPassword: "",
      passwordStrength: 0,
      passwordFeedback: "",
      isUploading: false,
      errors: {
        password: "",
      },
    };
  },
  methods: {
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
    async changePassword() {
      this.errors.password = "";
      if (this.passwordStrength < 3) {
        this.errors.password = "Password is too weak";
        return;
      }

      try {
        const user = auth.currentUser;
        await updatePassword(user, this.newPassword);
        this.newPassword = ""; // Clear password field
        this.$toast.success("Password updated successfully");
      } catch (error) {
        this.errors.password = error.message || "Failed to update password";
        this.$toast.error(this.errors.password);
      }
    },
    async uploadProfilePic(event) {
      const file = event.target.files[0];
      if (file) {
        this.isUploading = true;
        try {
          const storage = getStorage();
          const storageRefPath = `profile_pictures/${auth.currentUser.uid}/${file.name}`;
          const fileRef = storageRef(storage, storageRefPath);
          await uploadBytes(fileRef, file);
          const downloadURL = await getDownloadURL(fileRef);
          this.user.profilePicture = downloadURL;
          this.$toast.success("Profile picture uploaded successfully");
        } catch (error) {
          this.$toast.error("Failed to upload profile picture");
        } finally {
          this.isUploading = false;
        }
      }
    },
    saveChanges() {
      this.$toast.success("Changes saved successfully");
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    confirmDeleteAccount() {
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        this.deleteAccount();
      }
    },
    async deleteAccount() {
      try {
        const user = auth.currentUser;
        await deleteDoc(doc(db, "users", user.uid));
        await user.delete();
        this.$toast.success("Account deleted successfully");
        this.$router.push("/signup");
      } catch (error) {
        this.$toast.error("Failed to delete account");
      }
    },
  },
  computed: {
    user() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        return {
          email: currentUser.email,
          username: currentUser.displayName,
          profilePicture: currentUser.photoURL,
        };
      }
      return {};
    },
  },
};
</script>


<style scoped>
/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .container {
    padding: 1rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
