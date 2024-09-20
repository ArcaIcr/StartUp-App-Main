<script setup>
import Card from "@/components/Card.vue";
import { RouterLink } from "vue-router"; // Import RouterLink to handle navigation
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <!-- Card for Developers with correct RouterLink usage -->
        <Card bg="bg-violet-200">
          <h2 class="text-2xl font-bold">ROI Calculator</h2>
          <p class="mt-2 mb-4">Calculate your ROI now!</p>
          <!-- Correct usage of RouterLink to navigate to ROI -->
          <RouterLink to="/roi">
            <span
              class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              Calculate ROI
            </span>
          </RouterLink>
        </Card>

        <!-- Example Card for Employers -->
        <Card bg="bg-violet-200">
          <h2 class="text-2xl font-bold">Business Assessment</h2>
          <p class="mt-2 mb-4">Start Appraising your Business</p>
          <RouterLink
            to="/business"
            class="inline-block bg-violet-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Assessment
          </RouterLink>
        </Card>

        <!-- Another Example Card for Employers -->
        <Card bg="bg-violet-200">
          <h2 class="text-2xl font-bold">Marketing Analysis</h2>
          <p class="mt-2 mb-4">Charts and Graphs for your Business</p>
          <RouterLink
            to="/analysis"
            class="inline-block bg-violet-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Analysis
          </RouterLink>
        </Card>

        <!-- Additional Card Example -->
        <Card bg="bg-violet-200">
          <h2 class="text-2xl font-bold">Trend Seeker</h2>
          <p class="mt-2 mb-4">
            Find the products that people are looking for a specific location.
          </p>
          <RouterLink
            to="/search"
            class="inline-block bg-violet-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Search
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
