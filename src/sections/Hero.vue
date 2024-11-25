<script setup>
import { RouterLink } from 'vue-router';
import Button from 'primevue/button';
</script>

<template>
  <section class="hero-section">
    <!-- Background with gradient overlay -->
    <div class="hero-background">
      <div class="abstract-bg"></div>
      <div class="gradient-overlay"></div>
    </div>

    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Main content -->
      <div class="hero-content">
        <h1 class="hero-title animate-fade-in">
          StartUp <span class="text-primary font-black">Compass</span>
        </h1>

        <p class="hero-subtitle animate-fade-in-delay">
          Navigate your business journey with precision. Make data-driven decisions 
          that propel your startup forward.
        </p>

        <!-- CTA Buttons -->
        <div class="button-group animate-fade-in-delay-2">
          <RouterLink to="/signup">
            <Button 
              label="Get Started" 
              icon="pi pi-rocket" 
              severity="primary"
              size="large"
              raised
            />
          </RouterLink>
          <RouterLink to="/demo">
            <Button 
              label="Watch Demo" 
              icon="pi pi-play"
              severity="secondary" 
              size="large"
              outlined
            />
          </RouterLink>
        </div>

        <!-- Stats or social proof -->
        <div class="stats-container animate-fade-in-delay-3">
          <div class="stat-item">
            <span class="stat-number">10K+</span>
            <span class="stat-label">Active Users</span>
          </div>
          <div class="divider"></div>
          <div class="stat-item">
            <span class="stat-number">95%</span>
            <span class="stat-label">Success Rate</span>
          </div>
          <div class="divider"></div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Support</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--surface-ground);
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.abstract-bg {
  position: absolute;
  inset: -50%;
  background: 
    radial-gradient(circle at 0% 0%, var(--primary-100) 0%, transparent 50%),
    radial-gradient(circle at 100% 0%, var(--primary-200) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, var(--primary-300) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, var(--primary-400) 0%, transparent 50%);
  opacity: 0.1;
  animation: rotate 60s linear infinite;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    transparent 0%,
    var(--surface-ground) 70%
  );
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.5);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* Add these animated shapes */
.hero-background::before,
.hero-background::after {
  content: '';
  position: absolute;
  width: 40vmax;
  height: 40vmax;
  border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%;
  background: var(--primary-50);
  opacity: 0.1;
}

.hero-background::before {
  top: -15%;
  left: -15%;
  animation: morph1 15s linear infinite;
}

.hero-background::after {
  bottom: -15%;
  right: -15%;
  animation: morph2 18s linear infinite;
}

@keyframes morph1 {
  0% { border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%; }
  50% { border-radius: 52% 48% 39% 61% / 55% 45% 55% 45%; }
  100% { border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%; }
}

@keyframes morph2 {
  0% { border-radius: 52% 48% 39% 61% / 55% 45% 55% 45%; }
  50% { border-radius: 47% 53% 61% 39% / 45% 51% 49% 55%; }
  100% { border-radius: 52% 48% 39% 61% / 55% 45% 55% 45%; }
}

.content-wrapper {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  z-index: 1;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.hero-subtitle {
  font-size: 1.5rem;
  line-height: 1.5;
  color: var(--text-secondary-color);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--surface-card);
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary-color);
  margin-top: 0.25rem;
}

.divider {
  width: 1px;
  height: 40px;
  background-color: var(--surface-border);
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s backwards;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s backwards;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 1s ease-out 0.9s backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .stats-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .divider {
    width: 80%;
    height: 1px;
  }

  .button-group {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
