<script>
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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

  },
};

</script>

<template>
  <header class="flex justify-between items-center p-4 bg-white shadow-md">
    <div class="flex items-center space-x-4 relative">
      <img
        :src="user.profilePicture"
        alt="Profile Picture"
        class="h-10 w-10 rounded-full"
      />
      <h2 class="text-xl font-semibold text-gray-800">{{ user.username }}</h2>
      <router-link
        class="relative text-gray-700 hover:text-gray-900"
        aria-label="Notifications"
      >
        Notifications
        <span class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
      </router-link>
      <div
        v-if="isProfileMenuOpen"
        class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
      >
        <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
          My Profile
        </router-link>
        <router-link to="/settings" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
          Settings
        </router-link>
        <router-link to="/logout" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
          Log out
        </router-link>
      </div>
    </div>
  </header>
</template>
