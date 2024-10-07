<template>
    <footer class="bg-bgMedium py-8">
      <div class="container mx-auto px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row justify-between items-center mb-6">
          <div>
            <h2 class="text-3xl font-bold text-darkblue mb-2">StartUp Compass</h2>
            <p class="text-textMedium">Your ultimate toolkit for data-driven decisions.</p>
          </div>
          <div class="mt-4 lg:mt-0 text-center lg:text-right">
            <h3 class="text-2xl font-bold text-darkblue mb-2">Contact Us</h3>
            <p class="text-textMedium">Email: <a href="mailto:startup_compass@gmail.com" class="hover:text-accentDark">startup_compass@gmail.com</a></p>
            <p class="text-textMedium">Phone: <a href="tel:+689686728500" class="hover:text-accentDark">+68 968-672-8500</a></p>
          </div>
        </div>
  
        <div class="flex flex-col lg:flex-row justify-center items-center mt-4">
          <div class="flex space-x-4 mt-4 lg:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-darkblue hover:text-accentDark">
              <i class="pi pi-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-darkblue hover:text-accentDark">
              <i class="pi pi-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-darkblue hover:text-accentDark">
              <i class="pi pi-linkedin"></i>
            </a>
          </div>
        </div>
  
        <div class="text-center mt-4">
          <p class="text-textMedium">
            &copy; {{ new Date().getFullYear() }} StartUp Compass. All rights reserved.
          </p>
          <p class="text-textMedium">
            <RouterLink to="/privacy" class="hover:text-accentDark">Privacy Policy</RouterLink> | 
            <RouterLink to="/terms" class="hover:text-accentDark">Terms of Service</RouterLink>
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { RouterLink } from "vue-router"; // Import RouterLink for navigation
  </script>
  
  <style scoped>
  /* PrimeIcons CSS Import */
  @import url('https://unpkg.com/primeicons@latest/primeicons.css');
  
  .footer {
    background-color: #f5f4f1; /* Light Gray */
  }
  </style>
  