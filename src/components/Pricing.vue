<script setup>
import pricingData from "@/price.json"; // Adjusted import for pricing data
import { ref } from "vue";

const pricingOptions = ref(pricingData);
</script>

<template>
  <section class="bg-beige min-h-screen px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-4xl font-bold text-darkblue mb-6 text-center">
        Pricing Overview
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="option in pricingOptions"
          :key="option.id"
          class="bg-tan rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105"
        >
          <h3 class="text-2xl font-semibold text-darkblue">
            {{ option.type }}
          </h3>
          <p class="mb-4 text-gray-800">{{ option.description }}</p>
          <h4 class="text-lg font-bold text-green-600">{{ option.price }}</h4>
          <button
            class="mt-4 inline-block bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue transition-colors duration-200"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add any custom styles here */
</style>
