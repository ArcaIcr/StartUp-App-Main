<script setup>
// No need for defineProps since the title and subtitle are hardcoded
</script>

<template>
  <section class="bg-bgMedium py-24 mb-4 relative overflow-hidden">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 bg-[url('@/assets/img/BackG-img.png')] bg-cover bg-fixed opacity-30"></div>

    <!-- Content wrapper with z-index to layer over the background -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
      <!-- Main title -->
      <h1 class="text-5xl font-extrabold text-darkblue sm:text-6xl md:text-7xl animate-fade-in-up leading-tight">
        StartUp Compass
      </h1>

      <!-- Subtitle or description -->
      <p class="my-6 text-xl text-textMedium max-w-3xl animate-fade-in-up">
        Empowering businesses in Cagayan de Oro to thrive in the digital landscape! Our platform offers a suite of innovative tools designed to help local entrepreneurs tackle challenges and seize opportunities. From inventory management to market analysis, we provide the insights you need to excel.
      </p>

      <!-- CTA Button -->
      <RouterLink
        to="/signup"
        class="mt-8 bg-accentDark text-white text-lg px-12 py-4 rounded-md shadow-lg transition-transform duration-300 hover:bg-darkblue hover:scale-105 animate-fade-in-up"
      >
        Get Started
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* Ensure good contrast and visibility */
.bg-bgMedium {
  background-color: #f5f4f1; /* Light Gray */
}
.text-darkblue {
  color: #1F2E43; /* Dark Blue */
}
.text-textMedium {
  color: #313d44; /* Medium Text */
}
.bg-accentDark {
  background-color: #00668c; /* Deep Blue */
}
.bg-darkblue {
  background-color: #1F2E43; /* Dark Blue for hover state */
}

/* Animation for fading in and sliding up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
}
</style>
