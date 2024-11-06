<template>
  <div class="flex">
    <aside class="fixed left-0 top-0 w-64 h-screen bg-accentLight flex flex-col justify-between">
      <div class="p-4">
        <div class="mb-8">
          <img src="/src/assets/img/Logo.png" alt="Logo" class="h-12" />
        </div>
        <nav>
          <ul class="space-y-4">
            <li v-for="item in menuItems" :key="item.label">
              <router-link
                :to="item.to"
                class="text-white hover:bg-accentLight p-2 block rounded flex items-center space-x-2"
                :aria-label="item.label"
              >
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4">
        <button
          @click="handleLogout"
          class="text-white hover:bg-accentLight p-2 block rounded flex items-center space-x-2"
          aria-label="Log out"
        >
          <i class="pi pi-sign-out"></i>
          <span>Log out</span>
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="ml-64 p-4 w-full">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { to: "/overview", icon: "pi pi-home", label: "Overview" },
        { to: "/assessmentwindow", icon: "pi pi-wallet", label: "Assessment" },
        { to: "/space", icon: "pi pi-users", label: "Space" },
        // { to: "/metrics", icon: "pi pi-chart-line", label: "Metrics" },
        { to: "/settings", icon: "pi pi-cog", label: "Settings" },
      ],
    };
  },
  methods: {
    handleLogout() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Optional: Add any additional styles here */
</style>
