About.vue:

<template>
  <div class="p-10 text-center">
    <h1 class="text-2xl font-bold mb-6">
      Meet the Designers Behind Our Website
    </h1>
    <div class="flex flex-wrap justify-around gap-5">
      <!-- Designer 1 -->
      <div
        class="w-52 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200"
      >
        <img
          src="@/assets/img/Uriel.png"
          alt="Designer 1"
          class="w-full h-auto rounded-full mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Uriel Dionsay</h2>
        <p class="text-gray-600">
          Lead UI/UX Designer with 10+ years of experience.
        </p>
      </div>

      <!-- Designer 2 -->
      <div
        class="w-52 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200"
      >
        <img
          src="@/assets/img/Edgie.png"
          alt="Designer 2"
          class="w-full h-auto rounded-full mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Edgie Roszel Bajuyo</h2>
        <p class="text-gray-600">
          Frontend Developer specializing in Vue.js and CSS animations.
        </p>
      </div>

      <!-- Designer 3 -->
      <div
        class="w-52 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200"
      >
        <img
          src="@/assets/img/Morrix.png"
          alt="Designer 3"
          class="w-full h-auto rounded-full mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Morrix Ken Ohata</h2>
        <p class="text-gray-600">
          Creative Director with a strong passion for minimalistic design.
        </p>
      </div>

      <!-- Designer 4 -->
      <div
        class="w-52 p-5 rounded-lg bg-gray-100 shadow-md text-center transition-transform hover:scale-105 hover:bg-gray-200"
      >
        <img
          src="@/assets/img/Adriane.png"
          alt="Designer 4"
          class="w-full h-auto rounded-full mb-4"
        />
        <h2 class="text-xl font-semibold mb-2">Adriane Loquinte</h2>
        <p class="text-gray-600">
          Backend Engineer with expertise in API design and security.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
