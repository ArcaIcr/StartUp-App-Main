<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Button from 'primevue/button';
import logo from '@/assets/img/logo.png';

const route = useRoute();
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const updateNavbarBackground = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', updateNavbarBackground);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateNavbarBackground);
});

const isActiveLink = (path) => route.path === path;
</script>

<template>
  <nav :class="[
    'fixed w-full z-50 transition-all duration-300',
    isScrolled ? 'bg-surface py-2' : 'py-4'
  ]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <img :src="logo" alt="StartUp Compass" class="h-8 w-auto" />
          <span class="text-xl font-bold text-primary hidden sm:block">StartUp Compass</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <RouterLink 
            v-for="item in [
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/pricing', label: 'Pricing' }
            ]"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 rounded-md transition-colors"
            :class="[
              isActiveLink(item.to) 
                ? 'text-primary font-medium'
                : 'text-700 hover:text-primary'
            ]"
          >
            {{ item.label }}
          </RouterLink>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-2 ml-4">
            <RouterLink to="/login">
              <Button 
                label="Log in" 
                class="p-button-text"
                :class="{ 'p-button-primary': isActiveLink('/login') }"
              />
            </RouterLink>
            <RouterLink to="/signup">
              <Button 
                label="Sign up" 
                severity="primary"
                raised
              />
            </RouterLink>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button
            icon="pi pi-bars"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-button-text p-button-rounded"
            aria-label="Menu"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-surface border-t border-surface-200 shadow-lg"
      >
        <div class="flex flex-col p-4 space-y-2">
          <RouterLink
            v-for="item in [
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/pricing', label: 'Pricing' },
              { to: '/login', label: 'Log in' },
              { to: '/signup', label: 'Sign up' }
            ]"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 rounded-md transition-colors"
            :class="[
              isActiveLink(item.to)
                ? 'text-primary font-medium bg-primary-50'
                : 'text-700 hover:text-primary hover:bg-surface-100'
            ]"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <!-- Spacer for fixed navbar -->
  <div :class="['h-16', isScrolled ? 'md:h-16' : 'md:h-20']"></div>
</template>

<style scoped>
.bg-surface {
  background: rgba(var(--surface-card-rgb), 0.95);
  backdrop-filter: blur(8px);
}

/* Smooth transition for background */
.fixed {
  transition: background-color 0.3s ease, padding 0.3s ease;
}

/* Override PrimeVue button styles */
:deep(.p-button.p-button-text:not(.p-button-primary)) {
  color: var(--text-color-secondary);
}

:deep(.p-button.p-button-text:not(.p-button-primary)):hover {
  color: var(--primary-color);
  background: transparent;
}

:deep(.p-button.p-button-text.p-button-primary) {
  color: var(--primary-color);
}

/* Container responsiveness */
.container {
  max-width: 1200px;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
