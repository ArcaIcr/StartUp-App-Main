<script setup>
import Card from "@/components/Card.vue";
import { RouterLink } from "vue-router"; // Import RouterLink to handle navigation
</script>

<template>
  <section class="py-10 bg-lightblue/10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-darkblue text-center mb-6">
        Explore Our Tools
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg">
        <!-- Card for ROI Calculator -->
        <Card bg="bg-gradient-to-br from-beige to-tan">
          <h2 class="text-2xl font-bold text-darkblue flex items-center">
            <i class="pi pi-calculator mr-2 text-orange-700"></i>
            ROI Calculator
          </h2>
          <p class="mt-2 mb-4 text-darkblue/80">Calculate your ROI now!</p>
          <RouterLink to="/roi">
            <span
              class="inline-block bg-lightblue text-white rounded-lg px-4 py-2 hover:bg-darkblue transition duration-300 cursor-pointer"
            >
              Calculate ROI
            </span>
          </RouterLink>
        </Card>

        <!-- Card for Business Assessment -->
        <Card bg="bg-gradient-to-br from-beige to-tan">
          <h2 class="text-2xl font-bold text-darkblue flex items-center">
            <i class="pi pi-briefcase mr-2 text-orange-700"></i>
            Business Assessment
          </h2>
          <p class="mt-2 mb-4 text-darkblue/80">
            Start appraising your business.
          </p>
          <RouterLink
            to="/business"
            class="inline-block bg-lightblue text-white rounded-lg px-4 py-2 hover:bg-darkblue transition duration-300"
          >
            Assessment
          </RouterLink>
        </Card>

        <!-- Card for Marketing Analysis -->
        <Card bg="bg-gradient-to-br from-beige to-tan">
          <h2 class="text-2xl font-bold text-darkblue flex items-center">
            <i class="pi pi-chart-line mr-2 text-orange-700"></i>
            Marketing Analysis
          </h2>
          <p class="mt-2 mb-4 text-darkblue/80">
            Charts and graphs for your business.
          </p>
          <RouterLink
            to="/analysis"
            class="inline-block bg-lightblue text-white rounded-lg px-4 py-2 hover:bg-darkblue transition duration-300"
          >
            Analysis
          </RouterLink>
        </Card>

        <!-- Card for Trend Seeker -->
        <Card bg="bg-gradient-to-br from-beige to-tan">
          <h2 class="text-2xl font-bold text-darkblue flex items-center">
            <i class="pi pi-search mr-2 text-orange-700"></i>
            Trend Seeker
          </h2>
          <p class="mt-2 mb-4 text-darkblue/80">
            Find trending products in your area.
          </p>
          <RouterLink
            to="/search"
            class="inline-block bg-lightblue text-white rounded-lg px-4 py-2 hover:bg-darkblue transition duration-300"
          >
            Search
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
