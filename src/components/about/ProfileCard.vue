<template>
  <div 
    class="profile-card"
    :style="{ animationDelay: delay + 'ms' }"
  >
    <div class="card-content">
      <div class="image-container">
        <img
          :src="imageSrc"
          :alt="name"
          class="profile-image"
        />
        <div class="image-overlay"></div>
      </div>
      
      <div class="text-content">
        <h3 class="name">{{ name }}</h3>
        <span class="role">{{ role }}</span>
        <p class="description">{{ description }}</p>
      </div>

      <div class="social-links">
        <Button 
          v-for="social in socials" 
          :key="social.icon"
          :icon="social.icon"
          class="p-button-rounded p-button-text"
          @click="social.action"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';

defineProps({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  imageSrc: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
});

const socials = [
  {
    icon: 'pi pi-linkedin',
    action: () => window.open('https://linkedin.com', '_blank')
  },
  {
    icon: 'pi pi-github',
    action: () => window.open('https://github.com', '_blank')
  },
  {
    icon: 'pi pi-twitter',
    action: () => window.open('https://twitter.com', '_blank')
  }
];
</script>

<style scoped>
.profile-card {
  background: var(--surface-card);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out backwards;
}

.profile-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-2);
}

.card-content {
  padding: 1.5rem;
}

.image-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 30%, var(--primary-100) 150%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-card:hover .profile-image {
  transform: scale(1.1);
}

.profile-card:hover .image-overlay {
  opacity: 0.2;
}

.text-content {
  text-align: center;
  margin-bottom: 1.5rem;
}

.name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.role {
  display: block;
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.description {
  color: var(--text-secondary-color);
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

:deep(.p-button.p-button-text) {
  color: var(--text-color);
  padding: 0.5rem;
}

:deep(.p-button.p-button-text:hover) {
  color: var(--primary-color);
  background: var(--surface-hover);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
