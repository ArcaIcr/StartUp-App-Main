<template>
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold text-gray-800">Welcome, {{ userName }}!</h1>
    <p class="text-gray-600">
      Use these tools to grow your business effectively.
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: String,
});
</script>
