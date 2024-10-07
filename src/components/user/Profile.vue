<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <button @click="goBack" class="mb-4 text-blue-500 hover:underline">
      ← Back
    </button>
    <h2 class="text-2xl font-bold mb-4">User Profile</h2>

    <div class="mb-4 flex items-center">
      <img
        :src="user.profilePicture || 'default_profile_picture_url'"
        alt="Profile Picture"
        class="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Joined:</strong> {{ user.createdAt }}</p>
      </div>
    </div>

    <router-link
      to="/settings"
      class="text-blue-500 hover:underline mt-4 inline-block"
      >Edit Profile</router-link
    >

    <button
      @click="logout"
      class="mt-4 bg-red-500 text-white py-2 px-4 rounded"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        createdAt: "",
        profilePicture: "default_profile_picture_url", // Set a default or fetched URL
      },
    };
  },
  mounted() {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then((doc) => {
        if (doc.exists()) {
          this.user.username = doc.data().username;
          this.user.email = doc.data().email;
          this.user.createdAt = doc.data().createdAt;
          this.user.profilePicture =
            doc.data().profilePicture || this.user.profilePicture;
        }
      });
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
    logout() {
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
/* Add styles as needed */
</style>
