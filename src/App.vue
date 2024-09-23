<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Navbar v-if="$route.name !== 'Dashboard'" />
  <RouterView />
</template>
