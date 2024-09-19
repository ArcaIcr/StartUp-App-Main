<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "Become a Vue Dev",
  },
  subtitle: {
    type: String,
    default: "Find the Vue job fits your skills and need",
  },
});
</script>

<template>
  <section class="bg-white-700 py-20 mb-4">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div class="text-side-left">
        <h1 class="text-4xl font-extrabold text-blue sm:text-5xl md:text-6xl">
          StartUp Compass
        </h1>
        <p class="my-4 text-xl text-blue">
          Empowering Cagayan de Oro businesses with technology! Our platform
          provides a comprehensive suite of tools to help local entrepreneurs
          navigate the challenges of running a business in today's digital
          world. From inventory management and market analysis to financial
          planning and trend tracking, we offer the resources you need to
          thrive.
        </p>
      </div>
    </div>
  </section>
</template>
