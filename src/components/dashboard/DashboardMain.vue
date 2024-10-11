<template>
  <section class="bg-gray-50 min-h-screen flex">
    <!-- Sidebar Toggle Button -->
    <button
      @click="toggleSidebar"
      class="text-white fixed top-4 left-4 z-50 bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition"
    >
      <i class="pi pi-bars text-2xl"></i>
    </button>

    <!-- Sidebar -->
    <Sidebar
      :showSidebar="showSidebar"
      :userName="userName"
      :userProfilePic="userProfilePic"
      @logout="logout"
    />

    <!-- Main Content -->
    <div class="flex-1 p-8 space-y-8">
      <!-- Header -->
      <Header :userName="userName" />

      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Business Overview Card -->
        <Card>
          <template #front>
            <h2 class="text-xl font-semibold text-gray-800">
              Business Overview
            </h2>
            <div class="mt-4 flex justify-between">
              <div>
                <p class="text-lg font-bold text-green-600">$12,345</p>
                <p class="text-gray-500">Revenue (This Month)</p>
              </div>
              <div>
                <p class="text-lg font-bold text-red-600">98%</p>
                <p class="text-gray-500">Customer Satisfaction</p>
              </div>
            </div>
          </template>
          <template #back>
            <h2 class="text-xl font-semibold text-gray-800">
              Detailed Overview
            </h2>
            <div class="mt-4 space-y-2">
              <p class="text-gray-600">Revenue Breakdown:</p>
              <ul class="text-gray-500 list-disc list-inside">
                <li>Product A: $5,000</li>
                <li>Product B: $3,000</li>
              </ul>
            </div>
          </template>
        </Card>

        <!-- Action Required Card -->
        <Card>
          <template #front>
            <h2 class="text-xl font-semibold text-gray-800">Action Required</h2>
            <ul class="mt-4 space-y-2 text-gray-600">
              <li>Complete Business Assessment</li>
              <li>Update Marketing Strategy</li>
            </ul>
          </template>
          <template #back>
            <h2 class="text-xl font-semibold text-gray-800">
              Detailed Actions
            </h2>
            <ul class="mt-4 space-y-2 text-gray-600">
              <li>Review trends</li>
              <li>Analyze competitors</li>
            </ul>
          </template>
        </Card>
      </div>

      <!-- Tools Section -->
      <h2 class="text-2xl font-bold text-gray-800">Your Tools</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Widget
          v-for="widget in widgets"
          :key="widget.title"
          :title="widget.title"
          :description="widget.description"
          :link="widget.link"
          :icon="widget.icon"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Card from "@/components/dashboard/Card.vue";
import Header from "@/components/dashboard/Header.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Widget from "@/components/dashboard/Widget.vue";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userName = ref("");
const userProfilePic = ref("path/to/default/profile-pic.jpg");
const showSidebar = ref(false);
const widgets = [
  {
    title: "ROI Calculator",
    description: "Predict your returns",
    link: "/roi",
    icon: "pi pi-calculator",
  },
  {
    title: "Business Assessment",
    description: "Assess your business",
    link: "/business-assessment",
    icon: "pi pi-chart-line",
  },
];

const toggleSidebar = () => (showSidebar.value = !showSidebar.value);

const logout = async () => {
  await auth.signOut();
  router.push("/login");
};

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    userName.value = userDoc.data().name;
    userProfilePic.value =
      userDoc.data().profilePicture || "path/to/default/profile-pic.jpg";
  }
});
</script>
