<template>
  <div
    class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200"
  >
    <h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center">
      <i :class="icon + ' text-blue-600 mr-2'"></i>
      {{ title }}
    </h3>
    <p class="text-gray-600 mb-4">{{ description }}</p>
    <router-link
      :to="link"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Go to {{ title }}
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  link: String,
  icon: String,
});
</script>
