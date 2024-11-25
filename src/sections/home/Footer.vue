<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="surface-ground py-8">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div>
          <h2 class="text-3xl font-bold text-primary mb-2">StartUp Compass</h2>
          <p class="text-700">
            Your ultimate toolkit for data-driven decisions.
          </p>
        </div>
        <div class="mt-4 lg:mt-0 text-center lg:text-right">
          <h3 class="text-2xl font-bold text-primary mb-2">Contact Us</h3>
          <p class="text-700">
            Email:
            <a
              href="mailto:startup_compass@gmail.com"
              class="text-primary hover:text-primary-700"
              >startup_compass@gmail.com</a
            >
          </p>
          <p class="text-700">
            Phone:
            <a href="tel:+689686728500" class="text-primary hover:text-primary-700"
              >+68 968-672-8500</a
            >
          </p>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row justify-center items-center mt-4">
        <div class="flex space-x-4 mt-4 lg:mt-0">
          <a
            href="https://web.facebook.com/cjgwapo3000"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-primary-700"
          >
            <i class="pi pi-facebook text-2xl"></i>
          </a>
          <a
            href="https://web.facebook.com/edgie.bajuyo.12"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-primary-700"
          >
            <i class="pi pi-twitter text-2xl"></i>
          </a>
          <a
            href="https://web.facebook.com/profile.php?id=100009201655041"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary hover:text-primary-700"
          >
            <i class="pi pi-linkedin text-2xl"></i>
          </a>
        </div>
      </div>

      <div class="text-center mt-4">
        <p class="text-700">
          &copy; {{ new Date().getFullYear() }} StartUp Compass. All rights
          reserved.
        </p>
        <p class="text-700">
          <RouterLink to="/privacy" class="text-primary hover:text-primary-700"
            >Privacy Policy</RouterLink
          >
          |
          <RouterLink to="/terms" class="text-primary hover:text-primary-700"
            >Terms of Service</RouterLink
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.text-primary {
  color: var(--primary-color);
}

.text-primary-700 {
  color: var(--primary-700);
}

.text-700 {
  color: var(--text-color-secondary);
}
</style>
