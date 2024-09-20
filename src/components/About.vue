<template>
  <div class="p-10 text-center">
    <h1 class="text-2xl font-bold mb-6">
      Meet the Designers Behind Our Website
    </h1>
    <div class="flex flex-col items-center">
      <div class="flex justify-center gap-5 mb-5">
        <div
          class="max-w-xs w-full h-64 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:border hover:border-gray-300"
        >
          <img
            src="@/assets/img/Uriel.png"
            alt="Uriel Dionsay"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">Uriel Dionsay</h2>
          <p class="text-gray-600">
            Lead UI/UX Designer with 10+ years of experience.
          </p>
        </div>

        <div
          class="max-w-xs w-full h-64 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:border hover:border-gray-300"
        >
          <img
            src="@/assets/img/Edgie.png"
            alt="Edgie Roszel Bajuyo"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">Edgie Roszel Bajuyo</h2>
          <p class="text-gray-600">
            Lead in Research Papers, also assisting in Backend.
          </p>
        </div>
      </div>

      <div class="flex justify-center gap-5">
        <div
          class="max-w-xs w-full h-64 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:border hover:border-gray-300"
        >
          <img
            src="@/assets/img/Morrix.png"
            alt="Morrix Ken Ohata"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">Morrix Ken Ohata</h2>
          <p class="text-gray-600">
            Frontend Developer specializing in Vue.js and CSS animations.
          </p>
        </div>

        <div
          class="max-w-xs w-full h-64 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200 hover:shadow-lg hover:border hover:border-gray-300"
        >
          <img
            src="@/assets/img/Adriane.png"
            alt="Adriane Loquinte"
            class="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 class="text-xl font-semibold mb-2">Adriane Loquinte</h2>
          <p class="text-gray-600">
            Backend Engineer with expertise in API design and security. Also,
            Creative Director with a strong passion for minimalistic design.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
