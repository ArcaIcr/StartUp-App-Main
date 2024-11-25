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
    isScrolled ? 'bg-bgLight/95 backdrop-blur-md py-2 shadow-md' : 'py-4'
  ]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <RouterLink to="/" class="flex items-center space-x-2">
          <img :src="logo" alt="StartUp Compass" class="h-8 w-auto" />
          <span class="text-xl font-bold text-accentDark hidden sm:block">StartUp Compass</span>
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
                ? 'text-accentDark font-medium'
                : 'text-textMedium hover:text-accentDark'
            ]"
          >
            {{ item.label }}
          </RouterLink>

          <!-- Auth Buttons -->
          <div class="flex items-center space-x-2 ml-4">
            <RouterLink to="/login">
              <Button 
                label="Log in" 
                class="!text-textMedium hover:!text-accentDark !bg-transparent"
                :class="{ '!text-accentDark': isActiveLink('/login') }"
              />
            </RouterLink>
            <RouterLink to="/signup">
              <Button 
                label="Sign up" 
                severity="primary"
                raised
                class="!bg-accentDark hover:!bg-primaryDark"
              />
            </RouterLink>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button
            icon="pi pi-bars"
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="!text-textMedium hover:!text-accentDark !bg-transparent"
            aria-label="Menu"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-bgLight border-t border-bgMedium shadow-lg"
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
                ? 'text-accentDark font-medium bg-primaryLight'
                : 'text-textMedium hover:text-accentDark hover:bg-bgMedium'
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
/* Force override PrimeVue button styles with !important */
:deep(.p-button) {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
