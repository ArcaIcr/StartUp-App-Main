<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    default: "Become a Vue Dev",
  },
  subtitle: {
    type: String,
    default: "Find the Vue job that fits your skills and needs",
  },
});
</script>

<template>
  <section
    class="bg-bgMedium py-20 mb-4 relative overflow-hidden"
  >
    <div
    class="absolute inset-0 bg-[url('@/assets/img/BackG-img.png')] opacity-30 bg-cover bg-fixed"
    ></div>

    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10"
    >
      <h1
        class="text-4xl font-extrabold text-textDark sm:text-5xl md:text-6xl animate-fade-in-up"
      >
        StartUp Compass
      </h1>
      <p class="my-4 text-xl text-textDark animate-fade-in-up">
        Empowering Cagayan de Oro businesses with technology! Our platform
        provides a comprehensive suite of tools to help local entrepreneurs
        navigate the challenges of running a business in today's digital world.
        From inventory management and market analysis to financial planning and
        trend tracking, we offer the resources you need to thrive.
      </p>
      <RouterLink
        to="/signup"
        class="mt-6 bg-accentDark text-white text-lg px-12 py-4 rounded-md shadow-md transition duration-300 hover:bg-darkblue hover:shadow-lg animate-fade-in-up"
      >
        Get Started
      </RouterLink>
    </div>
  </section>
</template>
