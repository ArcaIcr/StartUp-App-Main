<template>
  <section class="bg-bgLight min-h-screen py-8 flex">
    <!-- Menu Icon Button -->
    <button
      @click="toggleSidebar"
      class="text-white fixed top-4 left-4 z-50 hover:text-accentDark transition-colors duration-300"
    >
      <i class="pi pi-bars text-2xl"></i>
    </button>

    <!-- Sidebar -->
    <aside
      v-if="showSidebar"
      class="w-1/4 bg-white shadow-lg p-4 rounded-lg flex flex-col justify-between"
    >
      <div>
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold">{{ userName }}</h2>
          <p class="text-gray-500">Profile</p>
        </div>
        <ul>
          <li class="mb-4">
            <router-link to="/profile" class="text-darkblue hover:underline"
              >Profile Settings</router-link
            >
          </li>
          <li class="mb-4">
            <router-link to="/settings" class="text-darkblue hover:underline"
              >Account Settings</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Logout Button at the Bottom -->
      <button
        @click="logout"
        class="bg-accentDark text-white px-6 py-3 rounded-lg hover:bg-darkblue transition duration-300 w-full"
      >
        Log Out
      </button>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 container mx-auto px-4">
      <!-- Welcome Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-darkblue mb-4 animate-fade-in-up">
          Welcome, {{ userName }}!
        </h1>
        <p class="text-lg text-textMedium">
          Let's start building your business success with these powerful tools.
        </p>
      </div>

      <!-- Overview Section -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-fade-in-up"
      >
        <div
          class="bg-gradient-to-br from-beige to-bgMedium p-6 rounded-lg shadow-lg"
        >
          <h2 class="text-2xl font-bold text-darkblue">Business Overview</h2>
          <p class="mt-2 text-textMedium">
            Here’s a quick snapshot of your business's performance.
          </p>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p class="text-2xl font-bold text-accentDark">$12,345</p>
              <p class="text-sm text-textMedium">Total Revenue</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-accentDark">98%</p>
              <p class="text-sm text-textMedium">Customer Satisfaction</p>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-tan to-bgMedium p-6 rounded-lg shadow-lg"
        >
          <h2 class="text-2xl font-bold text-darkblue">Action Required</h2>
          <p class="mt-2 text-textMedium">
            Here are some tasks that need your attention.
          </p>
          <ul class="mt-4 list-disc list-inside text-textMedium">
            <li>Complete your business assessment</li>
            <li>Update your marketing strategy</li>
            <li>Review ROI predictions for next quarter</li>
          </ul>
        </div>
      </div>

      <!-- Tools/Widgets Section -->
      <h2 class="text-3xl font-bold text-darkblue text-center mb-6">
        Your Tools
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="widget in widgets"
          :key="widget.title"
          class="bg-gradient-to-br from-beige to-bgDark p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <h3 class="text-2xl font-bold text-darkblue mb-2 flex items-center">
            <i :class="widget.icon + ' text-orange-700 mr-2 text-xl'"></i>
            {{ widget.title }}
          </h3>
          <p class="text-textMedium mb-4">{{ widget.description }}</p>
          <router-link
            :to="widget.link"
            class="bg-accentDark text-white px-4 py-2 rounded-lg hover:bg-darkblue transition duration-300"
          >
            Go to {{ widget.title }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { auth, db } from "@/firebaseConfig"; // Ensure the path is correct
import { doc, getDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";

const userName = ref(""); // Initialize with an empty string
const showSidebar = ref(false);
const widgets = [
  {
    title: "ROI Calculator",
    description: "Predict your returns based on market trends",
    link: "/roi",
    icon: "pi pi-calculator",
  },
  {
    title: "Business Assessment",
    description: "Assess the performance of your business",
    link: "/business",
    icon: "pi pi-briefcase",
  },
  {
    title: "Marketing Analysis",
    description: "Analyze your marketing campaigns with data insights",
    link: "/analysis",
    icon: "pi pi-chart-line",
  },
  {
    title: "Trend Seeker",
    description: "Discover the latest trends and opportunities",
    link: "/search",
    icon: "pi pi-search",
  },
];

// Function to toggle sidebar visibility
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

// Function to log out the user
const logout = async () => {
  await auth.signOut();
  // Redirect or handle logout
};

// Fetch user data
onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      userName.value = userDoc.data().username; // Set the username from Firestore
    }
  }
});
</script>

<style scoped>
/* You can add any additional styles here if needed */
</style>
