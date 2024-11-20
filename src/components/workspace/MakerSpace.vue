<template>
  <div class="flex">
    <!-- Sidebar with feature icons and links -->
    <aside
      :class="[
        'fixed top-0 left-0 h-screen bg-accentLight flex flex-col justify-between transition-all duration-300 ease-in-out',
        { 'w-16': isCollapsed, 'w-64': !isCollapsed },
      ]"
    >
      <div class="p-4">
        <div class="mb-8">
          <!-- Logo or text content -->
          <img
            v-if="!isCollapsed"
            src="/src/assets/img/Logo.png"
            alt="Logo"
            class="h-12"
          />
        </div>
        <nav>
          <ul class="space-y-4">
            <li v-for="item in menuItems" :key="item.label">
              <router-link
                :to="item.to"
                class="text-white hover:bg-accentDark p-2 block rounded items-center space-x-2"
                :aria-label="item.label"
              >
                <i :class="item.icon"></i>
                <span v-if="!isCollapsed">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4">
        <!-- Button to navigate to the dashboard -->
        <button
          @click="goToDashboard"
          class="text-white hover:bg-accentDark p-2 block rounded items-center space-x-2"
          aria-label="Go to Dashboard"
        >
          <i class="pi pi-home"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </button>
        <!-- Button to toggle sidebar collapse -->
        <button
          @click="toggleSidebar"
          class="text-white hover:bg-accentDark p-2 mt-4 rounded flex items-center space-x-2"
          aria-label="Toggle Sidebar"
        >
          <i class="pi pi-chevron-left" v-if="!isCollapsed"></i>
          <i class="pi pi-chevron-right" v-if="isCollapsed"></i>
          <span v-if="!isCollapsed">Collapse</span>
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <div
      :class="{ 'ml-16': isCollapsed, 'ml-64': !isCollapsed }"
      class="p-8 w-full"
    >
      <h1 class="text-2xl font-bold mb-4">Welcome to the Maker Space</h1>
      <p class="mb-6">
        Access various tools and resources to help you with your projects.
        Select a feature from the sidebar to begin.
      </p>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Sidebar collapse state
      isCollapsed: false,
      menuItems: [
        {
          to: "/workspace/financial-analysis",
          icon: "pi pi-chart-bar",
          label: "Financial Analysis",
        },
        {
          to: "/workspace/evaluation",
          icon: "pi pi-pencil",
          label: "Evaluation",
        },
        {
          to: "/workspace/performance-measurement",
          icon: "pi pi-chart-line",
          label: "Performance Measurement",
        },
        {
          to: "/workspace/market-share-analysis",
          icon: "pi pi-chart-pie",
          label: "Market Share Analysis",
        },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed; // Toggle sidebar collapse state
    },
    goToDashboard() {
      this.$router.push("/dashboard"); // Redirect to the dashboard page
    },
  },
};
</script>

<style scoped>
/* Optional: Add any additional styles here */
</style>
