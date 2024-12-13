<template>
  <div class="flex">
    <aside
      :class="[
        'fixed top-0 left-0 h-screen bg-accentLight flex flex-col justify-between transition-all duration-300 ease-in-out',
        { 'w-16': isCollapsed, 'w-64': !isCollapsed },
      ]"
    >
      <div class="p-4">
        <div class="mb-8">
          <img
            v-if="!isCollapsed"
            src="/src/assets/img/Logo.png"
            alt="Logo"
            class="h-12"
          />
        </div>
        <nav>
          <ul class="space-y-4">
            <li v-for="item in filteredMenuItems" :key="item.label">
              <router-link
                :to="item.to"
                class="text-white hover:bg-accentDark p-2 block rounded items-center space-x-2"
                :aria-label="item.label"
                v-tooltip="item.tooltip"
              >
                <i :class="item.icon"></i>
                <span v-if="!isCollapsed">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4">
        <button
          @click="goToDashboard"
          class="text-white hover:bg-accentDark p-2 block rounded items-center space-x-2"
          aria-label="Go to Dashboard"
        >
          <i class="pi pi-home"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </button>
        <button
          @click="toggleSidebar"
          class="text-white hover:bg-accentDark p-2 mt-4 rounded flex items-center space-x-2"
          aria-label="Toggle Sidebar"
        >
          <i class="pi pi-chevron-left" v-if="!isCollapsed"></i>
          <i class="pi pi-chevron-right" v-if="isCollapsed"></i>
          <span v-if="!isCollapsed">Collapse</span>
        </button>
        <button
          @click="showHelp"
          class="text-white hover:bg-accentDark p-2 mt-4 rounded flex items-center space-x-2"
          aria-label="Help"
        >
          <i class="pi pi-question"></i>
          <span v-if="!isCollapsed">Help</span>
        </button>
      </div>
    </aside>

    <div
      :class="{ 'ml-16': isCollapsed, 'ml-64': !isCollapsed }"
      class="p-8 w-full"
    >
      <h1 class="text-2xl font-bold mb-4">Welcome to the Maker Space</h1>
      <p class="mb-6">
        Access various tools and resources to help you with your projects.
        Select a feature from the sidebar to begin.
      </p>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tools..."
        class="mb-4 p-2 border rounded"
      />
      <router-view />
      <div v-if="notification" class="notification">{{ notification }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      searchQuery: '',
      notification: '',
      menuItems: [
        { to: '/workspace/financial-analysis', icon: 'pi pi-chart-bar', label: 'Financial Analysis', tooltip: 'Analyze financial data' },
        { to: '/workspace/evaluation', icon: 'pi pi-pencil', label: 'Evaluation', tooltip: 'Evaluate projects' },
        { to: '/workspace/performance-measurement', icon: 'pi pi-chart-line', label: 'Performance Measurement', tooltip: 'Measure performance metrics' },
        { to: '/workspace/market-share-analysis', icon: 'pi pi-chart-pie', label: 'Market Share Analysis', tooltip: 'Analyze market share' },
      ],
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter(item => item.label.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    goToDashboard() {
      this.$router.push('/dashboard');
      this.showNotification('Navigating to Dashboard');
    },
    showHelp() {
      this.$router.push('/help');
      this.showNotification('Navigating to Help');
    },
    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
.notification {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
