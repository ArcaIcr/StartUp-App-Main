<template>
  <section class="py-16 px-4 bg-bgMedium">
    <div class="max-w-7xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-extrabold text-textDark mb-4 leading-tight">
          Welcome to <span class="text-accentDark">StartUp Compass</span>
        </h1>
        <p class="text-2xl text-textMedium max-w-2xl mx-auto mb-8">
          Navigate your business journey with data-driven insights
        </p>
        <div class="flex justify-center gap-4">
          <Button 
            label="Get Started" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            severity="primary"
            class="text-lg px-8 py-4"
            @click="navigateToSignup"
          />
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        <Card v-for="(feature, index) in features" 
              :key="index"
              class="rounded-2xl bg-bgLight shadow-lg hover:-translate-y-1 transition-transform duration-200">
          <template #header>
            <div class="flex justify-center items-center p-6 bg-accentDark text-bgLight">
              <i :class="[feature.icon, 'feature-icon']"></i>
            </div>
          </template>
          <template #title>
            <div class="text-xl font-semibold text-textDark text-center">{{ feature.title }}</div>
          </template>
          <template #content>
            <p class="text-textMedium text-center p-6">{{ feature.description }}</p>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Card from 'primevue/card';

const router = useRouter();

const features = [
  {
    icon: 'pi pi-chart-line',
    title: 'Market Analysis',
    description: 'Get real-time insights into market trends and opportunities'
  },
  {
    icon: 'pi pi-calculator',
    title: 'ROI Calculator',
    description: 'Make informed decisions with our advanced ROI calculations'
  },
  {
    icon: 'pi pi-chart-bar',
    title: 'Performance Metrics',
    description: 'Track and analyze your business performance indicators'
  },
  {
    icon: 'pi pi-compass',
    title: 'Strategic Guidance',
    description: 'Receive personalized recommendations for growth'
  }
];

const navigateToSignup = () => {
  router.push('/signup');
};
</script>

<style scoped>
.feature-icon {
  font-size: 3rem !important;
}
</style>
