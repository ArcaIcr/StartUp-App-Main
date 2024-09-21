<template>
  <div
    class="relative min-h-screen flex items-center justify-center p-10 text-center bg-gradient-to-r from-beige via-tan to-darkblue animate-gradient-bg"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-beige/20 to-darkblue/20"
    ></div>

    <div class="relative z-10">
      <h1
        class="text-4xl font-extrabold text-darkblue mb-12 animate-fade-in-up"
      >
        Meet the Designers Behind Our Website
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Uriel Dionsay -->
        <div
          class="group max-w-xs w-full h-auto p-6 rounded-xl bg-lightblue/20 backdrop-blur-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-lightblue/30 animate-fade-in-up"
        >
          <img
            src="@/assets/img/Uriel.png"
            alt="Uriel Dionsay"
            class="w-28 h-28 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <h2 class="text-2xl font-semibold text-darkblue mb-2">
            Uriel Dionsay
          </h2>
          <p class="text-darkblue/80">
            Lead UI/UX Designer with 10+ years of experience.
          </p>
        </div>

        <!-- Edgie Roszel Bajuyo -->
        <div
          class="group max-w-xs w-full h-auto p-6 rounded-xl bg-lightblue/20 backdrop-blur-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-lightblue/30 animate-fade-in-up"
        >
          <img
            src="@/assets/img/Edgie.png"
            alt="Edgie Roszel Bajuyo"
            class="w-28 h-28 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <h2 class="text-2xl font-semibold text-darkblue mb-2">
            Edgie Roszel Bajuyo
          </h2>
          <p class="text-darkblue/80">
            Lead in Research Papers, also assisting in Backend.
          </p>
        </div>

        <!-- Morrix Ken Ohata -->
        <div
          class="group max-w-xs w-full h-auto p-6 rounded-xl bg-lightblue/20 backdrop-blur-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-lightblue/30 animate-fade-in-up"
        >
          <img
            src="@/assets/img/Morrix.png"
            alt="Morrix Ken Ohata"
            class="w-28 h-28 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <h2 class="text-2xl font-semibold text-darkblue mb-2">
            Morrix Ken Ohata
          </h2>
          <p class="text-darkblue/80">
            Frontend Developer specializing in Vue.js and CSS animations.
          </p>
        </div>

        <!-- Adriane Loquinte -->
        <div
          class="group max-w-xs w-full h-auto p-6 rounded-xl bg-lightblue/20 backdrop-blur-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-lightblue/30 animate-fade-in-up"
        >
          <img
            src="@/assets/img/Adriane.png"
            alt="Adriane Loquinte"
            class="w-28 h-28 rounded-full mx-auto mb-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <h2 class="text-2xl font-semibold text-darkblue mb-2">
            Adriane Loquinte
          </h2>
          <p class="text-darkblue/80">
            Backend Engineer with expertise in API design and security. Also,
            Creative Director with a strong passion for minimalistic design.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
