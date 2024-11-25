<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="bg-bgMedium py-8">
    <div class="container mx-auto px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div>
          <h2 class="text-3xl font-bold text-accentDark mb-2">StartUp Compass</h2>
          <p class="text-textMedium">
            Your ultimate toolkit for data-driven decisions.
          </p>
        </div>
        <div class="mt-4 lg:mt-0 text-center lg:text-right">
          <h3 class="text-2xl font-bold text-accentDark mb-2">Contact Us</h3>
          <p class="text-textMedium">
            Email:
            <a
              href="mailto:startup_compass@gmail.com"
              class="text-accentDark hover:text-primaryDark transition-colors"
              >startup_compass@gmail.com</a
            >
          </p>
          <p class="text-textMedium">
            Phone:
            <a href="tel:+689686728500" class="text-accentDark hover:text-primaryDark transition-colors"
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
            class="text-accentDark hover:text-primaryDark transition-colors"
          >
            <i class="pi pi-facebook text-2xl"></i>
          </a>
          <a
            href="https://web.facebook.com/edgie.bajuyo.12"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accentDark hover:text-primaryDark transition-colors"
          >
            <i class="pi pi-twitter text-2xl"></i>
          </a>
          <a
            href="https://web.facebook.com/profile.php?id=100009201655041"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accentDark hover:text-primaryDark transition-colors"
          >
            <i class="pi pi-linkedin text-2xl"></i>
          </a>
        </div>
      </div>

      <div class="text-center mt-4">
        <p class="text-textMedium">
          &copy; {{ new Date().getFullYear() }} StartUp Compass. All rights
          reserved.
        </p>
        <p class="text-textMedium">
          <RouterLink to="/privacy" class="text-accentDark hover:text-primaryDark transition-colors"
            >Privacy Policy</RouterLink
          >
          |
          <RouterLink to="/terms" class="text-accentDark hover:text-primaryDark transition-colors"
            >Terms of Service</RouterLink
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
</style>
