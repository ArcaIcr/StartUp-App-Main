<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import { RouterView } from "vue-router";

const hideNavbarRoutes = ["Dashboard", "Profile", "Settings"]; // Add routes to hide the Navbar
</script>

<template>
  <div>
    <Navbar v-if="!hideNavbarRoutes.includes($route.name)" />
    <RouterView />
  </div>
</template>
