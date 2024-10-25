<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import { RouterView } from "vue-router";

// Define the routes where Navbar or Sidebar should be hidden
const hideNavbarRoutes = ["Dashboard", "Profile", "Settings", "Overview", "AssessBusiness", "Trends"];
</script>

<template>
    <div class="flex-1 flex flex-col">
        <!-- Conditionally render Navbar based on the route name -->
        <Navbar v-if="!hideNavbarRoutes.includes($route.name)" />
        
        <!-- Main Content Area for RouterView -->
        <main class="flex-1">
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
/* Ensure full height and flex layout */
.flex-1 {
  display: flex;
  flex-direction: column;
}
</style>
