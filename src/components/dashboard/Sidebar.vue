<script>
export default {
  data() {
    return {
      menuItems: [
        { to: "/overview", icon: "pi pi-home", label: "Overview" },
        { to: "/assessment", icon: "pi pi-wallet", label: "Assessment" },
        { to: "/trend", icon: "pi pi-users", label: "Trends" },
        { to: "/metrics", icon: "pi pi-chart-line", label: "Metrics" },
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


<template>
    <aside class="w-64 h-screen bg-teal-500 flex flex-col justify-between">
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
  </template>
  