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
      class="w-3/4 sm:w-1/4 bg-white shadow-lg p-4 rounded-lg flex flex-col justify-between fixed inset-y-0 left-0 z-40 transform transition-transform duration-300"
    >
      <!-- Profile Section -->
      <div class="text-center mb-6">
        <img
          :src="userProfilePic"
          alt="Profile Picture"
          class="rounded-full w-16 h-16 mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold">{{ userName }}</h2>
        <p class="text-gray-500">Profile</p>
      </div>

      <!-- Links with Active Highlighting -->
      <ul>
        <li class="mb-4">
          <router-link
            to="/profile"
            :class="{
              'font-bold text-accentDark': $route.path === '/profile',
              'text-darkblue': $route.path !== '/profile',
            }"
          >
            Profile Settings
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/settings"
            :class="{
              'font-bold text-accentDark': $route.path === '/settings',
              'text-darkblue': $route.path !== '/settings',
            }"
          >
            Account Settings
          </router-link>
        </li>
      </ul>

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
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-fade-in-up">
    <div class="relative cursor-pointer" @click="flipCard('overview')">
      <div
        v-if="!isFlipped['overview']"
        class="bg-gradient-to-br from-beige to-bgMedium p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out flip-card-front"
        data-card-id="overview"
      >
        <h2 class="text-2xl font-bold text-darkblue">Business Overview</h2>
        <p class="mt-2 text-textMedium">
          Here’s a quick snapshot of your business's performance.
        </p>
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p class="text-2xl font-bold text-accentDark">$12,345</p>
            <p class="text-sm text-textMedium">
              Total Revenue (This Month)
            </p>
            <p class="text-sm text-green-500">
              <span class="change-icon">📈</span>
              <span class="change-value">10%</span>
            </p>
          </div>
          <div>
            <p class="text-2xl font-bold text-accentDark">98%</p>
            <p class="text-sm text-textMedium">Customer Satisfaction</p>
            <p class="text-sm text-red-500">
              <span class="change-icon">📉</span>
              <span class="change-value">2%</span>
            </p>
          </div>
        </div>
        <a
          href="#"
          class="mt-4 inline-block bg-accentDark text-white font-bold py-2 px-4 rounded-md"
        >
          View Detailed Report
        </a>
      </div>

      <div
        v-if="isFlipped['overview']"
        class="bg-gradient-to-br from-beige to-bgMedium p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform rotate-y-180 flip-card-back"
        data-card-id="overview"
      >
        <h2 class="text-2xl font-bold text-darkblue">
          Business Overview - Details
        </h2>
        <p class="mt-2 text-textMedium">
          More detailed information about your business performance.
        </p>
        <!-- Add more detailed information here -->
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-textMedium">Revenue Breakdown:</p>
            <ul class="list-disc list-inside text-textMedium">
              <li>Product A: $5,000</li>
              <li>Product B: $3,000</li>
              <li>Product C: $4,345</li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-textMedium">
              Customer Satisfaction Breakdown:
            </p>
            <ul class="list-disc list-inside text-textMedium">
              <li>Net Promoter Score: 75</li>
              <li>Customer Feedback: 90% positive</li>
            </ul>
          </div>
        </div>
        <a
          href="#"
          class="mt-4 inline-block bg-accentDark text-white font-bold py-2 px-4 rounded-md"
        >
          Back to Overview
        </a>
      </div>
    </div>

    <div class="relative cursor-pointer" @click="flipCard('action')">
      <div
        v-if="!isFlipped['action']"
        class="bg-gradient-to-br from-tan to-bgMedium p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out flip-card-front"
        data-card-id="action"
      >
        <h2 class="text-2xl font-bold text-darkblue">Action Required</h2>
        <p class="mt-2 text-textMedium">
          Here are some tasks that need your attention.
        </p>
        <ul class="mt-4 list-disc list-inside text-textMedium">
          <li class="font-bold">Complete your business assessment</li>
          <li>Update your marketing strategy</li>
          <li>Review ROI predictions for next quarter</li>
        </ul>
        <a
          href="#"
          class="mt-4 inline-block bg-accentDark text-white font-bold py-2 px-4 rounded-md"
        >
          View All Tasks
        </a>
      </div>

      <div
        v-if="isFlipped['action']"
        class="bg-gradient-to-br from-tan to-bgMedium p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform rotate-y-180 flip-card-back"
        data-card-id="action"
      >
        <h2 class="text-2xl font-bold text-darkblue">
          Action Required - Details
        </h2>
        <p class="mt-2 text-textMedium">
          More detailed information about your action items.
        </p>
        <!-- Add more detailed information here -->
        <div class="mt-4 grid grid-cols-1 gap-4">
          <div>
            <p class="text-sm text-textMedium">
              <strong>Business Assessment:</strong>
            </p>
            <ul class="list-disc list-inside text-textMedium">
              <li>Review market trends</li>
              <li>Analyze competitor landscape</li>
              <li>Evaluate current business strategies</li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-textMedium">
              <strong>Marketing Strategy:</strong>
            </p>
            <ul class="list-disc list-inside text-textMedium">
              <li>Develop new marketing campaigns</li>
              <li>Optimize existing marketing channels</li>
              <li>Track campaign performance</li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-textMedium">
              <strong>ROI Predictions:</strong>
            </p>
            <ul class="list-disc list-inside text-textMedium">
              <li>Analyze historical data</li>
              <li>Forecast future revenue</li>
              <li>Identify potential risks and opportunities</li>
            </ul>
          </div>
        </div>
        <a
          href="#"
          class="mt-4 inline-block bg-accentDark text-white font-bold py-2 px-4 rounded-md"
        >
          Back to Action Required
        </a>
      </div>
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
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref(""); // Initialize with an empty string
const userProfilePic = ref("path/to/default/profile-pic.jpg"); // Default profile picture
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
  router.push("/login"); // Redirect to login page
};

// Fetch user data
onMounted(async () => {
  const user = auth.currentUser;
  if (!user) {
    router.push("/login"); // Redirect to login if no user
  } else {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      userName.value = userDoc.data().username; // Set the username from Firestore
      userProfilePic.value =
        userDoc.data().profilePicture || userProfilePic.value; // Set profile picture if available
    }
  }
});

// Flip card logic
const isFlipped = ref({
  overview: false,
  action: false,
});

const flipCard = (cardId) => {
  isFlipped.value[cardId] = !isFlipped.value[cardId];
  // Optional: Scroll to the top of the back side when flipped
  if (isFlipped.value[cardId]) {
    const backSide = document.querySelector(`.flip-card-back[data-card-id="${cardId}"]`);
    if (backSide) {
      backSide.scrollTop = 0; // Scroll to the top
    }
  }
};
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}
.sidebar-enter-from {
  transform: translateX(-100%);
}
.sidebar-leave-to {
  transform: translateX(-100%);
}

.hover\:scale-105:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.bg-beige {
  background-color: #f5f5f5;
}

.bg-medium {
  background-color: #e0e0e0;
}

.text-darkblue {
  color: #2980b9;
}

.text-textMedium {
  color: #666;
}

.text-accentDark {
  color: #3498db;
}

.change-icon {
  font-size: 1.2em;
  margin-right: 5px;
}

.change-value {
  font-size: 1em;
}

.flip-card-back {
  /* ... previous styles ... */
  overflow-y: auto; /* Enable vertical scrolling */
  height: 200px; /* Set a fixed height for the back side */
}

/* Optional: Add some padding to the back side */
.flip-card-back ul {
  padding-left: 20px;
}
</style>
