<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="py-5 bg-bgMedium">
    <div class="container-xl lg:container mx-auto">
      <h2 class="text-3xl font-bold text-accentDark text-center mb-6">
        Explore Our Tools
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <!-- Card for ROI Calculator -->
        <Card class="transform hover:scale-105 transition-transform duration-300 bg-bgLight rounded-xl">
          <template #header>
            <div class="flex items-center text-accentDark">
              <i class="pi pi-calculator mr-2 text-2xl"></i>
              <h2 class="text-2xl font-bold">ROI Calculator</h2>
            </div>
          </template>
          <template #content>
            <p class="mt-2 mb-4 text-textMedium">
              Predict your returns based on the Trends!
            </p>
            <RouterLink to="/roi">
              <Button label="Calculate ROI" icon="pi pi-arrow-right" iconPos="right" severity="primary" class="rounded-lg" />
            </RouterLink>
          </template>
        </Card>

        <!-- Card for Business Assessment -->
        <Card class="transform hover:scale-105 transition-transform duration-300 bg-bgLight rounded-xl">
          <template #header>
            <div class="flex items-center text-accentDark">
              <i class="pi pi-briefcase mr-2 text-2xl"></i>
              <h2 class="text-2xl font-bold">Business Assessment</h2>
            </div>
          </template>
          <template #content>
            <p class="mt-2 mb-4 text-textMedium">
              Start appraising your business.
            </p>
            <RouterLink to="/business">
              <Button label="Assessment" icon="pi pi-arrow-right" iconPos="right" severity="primary" class="rounded-lg" />
            </RouterLink>
          </template>
        </Card>

        <!-- Card for Marketing Analysis -->
        <Card class="transform hover:scale-105 transition-transform duration-300 bg-bgLight rounded-xl">
          <template #header>
            <div class="flex items-center text-accentDark">
              <i class="pi pi-chart-line mr-2 text-2xl"></i>
              <h2 class="text-2xl font-bold">Marketing Analysis</h2>
            </div>
          </template>
          <template #content>
            <p class="mt-2 mb-4 text-textMedium">
              Charts and graphs for your business.
            </p>
            <RouterLink to="/analysis">
              <Button label="Analysis" icon="pi pi-arrow-right" iconPos="right" severity="primary" class="rounded-lg" />
            </RouterLink>
          </template>
        </Card>

        <!-- Card for Trend Seeker -->
        <Card class="transform hover:scale-105 transition-transform duration-300 bg-bgLight rounded-xl">
          <template #header>
            <div class="flex items-center text-accentDark">
              <i class="pi pi-search mr-2 text-2xl"></i>
              <h2 class="text-2xl font-bold">Trend Seeker</h2>
            </div>
          </template>
          <template #content>
            <p class="mt-2 mb-4 text-textMedium">
              Find the latest trends in your industry.
            </p>
            <RouterLink to="/trend">
              <Button label="Explore Trends" icon="pi pi-arrow-right" iconPos="right" severity="primary" class="rounded-lg" />
            </RouterLink>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
