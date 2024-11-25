<template>
  <section class="introduction-section">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-content">
        <h1 class="title">
          Welcome to <span class="highlight">StartUp Compass</span>
        </h1>
        <p class="subtitle">
          Navigate your business journey with data-driven insights
        </p>
        <div class="cta-wrapper">
          <Button 
            label="Get Started" 
            icon="pi pi-arrow-right" 
            iconPos="right"
            severity="primary"
            class="get-started-btn"
            @click="navigateToSignup"
          />
        </div>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <Card v-for="(feature, index) in features" 
              :key="index"
              class="feature-card">
          <template #header>
            <div class="feature-header">
              <i :class="feature.icon"></i>
            </div>
          </template>
          <template #title>
            {{ feature.title }}
          </template>
          <template #content>
            <p>{{ feature.description }}</p>
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
.introduction-section {
  padding: 4rem 1rem;
  background: var(--surface-ground);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.highlight {
  color: var(--primary-color);
}

.subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary-color);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.cta-wrapper {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.get-started-btn {
  font-size: 1.1rem;
  padding: 1rem 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.feature-card {
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: var(--primary-color);
  color: white;
}

.feature-header i {
  font-size: 2rem;
}

:deep(.p-card) {
  background: var(--surface-card);
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
}

:deep(.p-card-title) {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: var(--text-color);
}

:deep(.p-card-content) {
  padding: 1.5rem;
  text-align: center;
  color: var(--text-secondary-color);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
