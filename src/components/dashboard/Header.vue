<script>
export default {
  data() {
    return {
      isProfileMenuOpen: false,
    };
  },
  methods: {
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
  },
};
</script>


<template>
    <header class="flex justify-between items-center p-4 bg-white shadow-md">
      <div class="flex items-center space-x-4 relative">
        <img
          src="/src/assets/img/Dad.png"
          alt="Profile"
          class="h-10 w-10 rounded-full cursor-pointer"
          @click="toggleProfileMenu"
          aria-label="Profile Menu"
        />
        <span class="text-gray-700">John Doe</span>
        <router-link
          to="/notifications"
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
  