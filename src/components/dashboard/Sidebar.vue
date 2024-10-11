<template>
  <aside
    v-if="showSidebar"
    class="w-64 bg-white shadow-md p-6 fixed inset-y-0 left-0 z-40 transition-transform duration-300 transform"
    :class="showSidebar ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Profile Section -->
    <div class="flex flex-col items-center mb-6">
      <img
        :src="userProfilePic"
        alt="Profile Picture"
        class="rounded-full w-24 h-24 mb-4"
      />
      <h2 class="text-xl font-semibold text-gray-800">{{ userName }}</h2>
      <p class="text-gray-500">Profile</p>
    </div>

    <!-- Sidebar Links -->
    <ul class="space-y-4">
      <li>
        <router-link
          to="/profile"
          class="text-gray-700 hover:text-blue-600 transition"
          :class="{ 'font-semibold text-blue-600': $route.path === '/profile' }"
        >
          Profile Settings
        </router-link>
      </li>
      <li>
        <router-link
          to="/settings"
          class="text-gray-700 hover:text-blue-600 transition"
          :class="{
            'font-semibold text-blue-600': $route.path === '/settings',
          }"
        >
          Account Settings
        </router-link>
      </li>
    </ul>

    <!-- Logout Button -->
    <button
      @click="logout"
      class="mt-auto bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 transition"
    >
      Log Out
    </button>
  </aside>
</template>

<script setup>
const props = defineProps({
  showSidebar: Boolean,
  userName: String,
  userProfilePic: String,
});

const emit = defineEmits(["logout"]);
</script>
