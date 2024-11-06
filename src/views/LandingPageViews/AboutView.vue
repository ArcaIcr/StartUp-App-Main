<template>
  <Navbar />
  <div
    class="relative min-h-screen flex items-center justify-center p-10 text-center bg-bgDark animate-gradient-bg"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-primaryLight to-primaryMedium opacity-40"
    ></div>

    <div class="relative z-10">
      <h1
        class="text-4xl font-extrabold text-primaryDark mb-12 overflow-hidden border-r-4 whitespace-nowrap inline-block animate-typing"
        style="width: 100%"
      >
        Meet the Designers Behind Our Website
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProfileCard
          v-for="(member, index) in teamMembers"
          :key="index"
          :name="member.name"
          :imageSrc="member.imageSrc"
          :description="member.description"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import ProfileCard from "@/components/about/ProfileCard.vue";

// Member Photos
import Edgie1 from "@/assets/img/Edgie1.png";
import Edgie2 from "@/assets/img/Edgie2.png";
import Edgie3 from "@/assets/img/Edgie3.png";
import Edgie4 from "@/assets/img/Edgie4.png";

const teamMembers = [
  {
    name: "Uriel Dionsay",
    imageSrc: Edgie1,
    description: "Lead UI/UX Designer with 10+ years of experience.",
  },
  {
    name: "Edgie Roszel Bajuyo",
    imageSrc: Edgie2,
    description: "Lead in Research Papers, also assisting in Backend.",
  },
  {
    name: "Morrix Ken Ohata",
    imageSrc: Edgie3,
    description: "Frontend Developer specializing in Vue.js and CSS animations.",
  },
  {
    name: "Adriane Loquinte",
    imageSrc: Edgie4,
    description:
      "Backend Engineer with expertise in API design and security. Also, Creative Director with a strong passion for minimalistic design.",
  },
];
</script>

<style>

</style>