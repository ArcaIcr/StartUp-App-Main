<template>
  <Navbar />
  <div class="min-h-screen bg-bgMedium relative overflow-hidden">
    <!-- Background Animation -->
    <div class="absolute inset-0 overflow-hidden opacity-10">
      <div class="absolute w-[50vmax] h-[50vmax] rounded-full blur-[80px] -top-1/4 -left-1/4 bg-gradient-to-br from-primaryLight to-transparent animate-float"></div>
      <div class="absolute w-[50vmax] h-[50vmax] rounded-full blur-[80px] top-1/2 -right-1/4 bg-gradient-to-br from-primaryMedium to-transparent animate-float-reverse"></div>
      <div class="absolute w-[50vmax] h-[50vmax] rounded-full blur-[80px] -bottom-1/4 left-[30%] bg-gradient-to-br from-accentLight to-transparent animate-float-slow"></div>
    </div>

    <div class="relative max-w-7xl mx-auto py-24 px-8 z-10">
      <!-- Title Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-extrabold text-textDark mb-4 animate-fade-in">
          Meet Our Team
        </h1>
        <p class="text-2xl md:text-3xl text-textMedium">
          <TypeWriter 
            text="The creative minds behind StartUp Compass"
            :duration="1.5"
            :start-delay="1000"
          />
        </p>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        <ProfileCard
          v-for="(member, index) in teamMembers"
          :key="index"
          :name="member.name"
          :role="member.role"
          :imageSrc="member.imageSrc"
          :description="member.description"
          :delay="index * 200"
        />
      </div>

      <!-- Values Section -->
      <div 
        ref="valuesSection"
        class="text-center pt-24 opacity-0"
        :class="{ 'animate-fade-in-up': isValuesSectionVisible }"
      >
        <h1 class="text-5xl md:text-6xl font-extrabold text-textDark mb-12">
          <TypeWriter 
            v-if="isValuesSectionVisible"
            text="Our Values"
            :duration="1.5"
            :start-delay="0"
          />
          <span v-else class="invisible">Our Values</span>
        </h1>
        <div 
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 opacity-0 transition-opacity duration-500"
          :class="{ 'opacity-100': isValuesSectionVisible }"
        >
          <div 
            v-for="(value, index) in values" 
            :key="index" 
            class="p-8 bg-bgLight rounded-2xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 opacity-0"
            :style="{ 
              '--delay': `${index * 200}ms`,
              'animation': isValuesSectionVisible ? 'fadeInUp 0.6s ease-out forwards var(--delay)' : 'none'
            }"
          >
            <i :class="[value.icon, 'text-4xl mb-4 text-accentDark']"></i>
            <h3 class="text-xl font-bold text-textDark mb-2">{{ value.name }}</h3>
            <p class="text-textMedium">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from "@/components/navbar/Navbar.vue";
import ProfileCard from "@/components/about/ProfileCard.vue";
import TypeWriter from "@/components/common/TypeWriter.vue";

// Member Photos
import Edgie1 from "@/assets/img/Edgie1.png";
import Edgie2 from "@/assets/img/Edgie2.png";
import Edgie3 from "@/assets/img/Edgie3.png";
import Edgie4 from "@/assets/img/Edgie4.png";

const valuesSection = ref(null);
const isValuesSectionVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        isValuesSectionVisible.value = true;
        // Optional: Disconnect observer after animation is triggered
        observer.disconnect();
      }
    },
    {
      threshold: 0.3, // Trigger when 30% of the section is visible
      rootMargin: '0px'
    }
  );

  if (valuesSection.value) {
    observer.observe(valuesSection.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

const teamMembers = [
  {
    name: "Uriel Dionsay",
    role: "Lead UI/UX Designer",
    imageSrc: Edgie1,
    description: "10+ years of experience crafting intuitive user experiences"
  },
  {
    name: "Edgie Roszel Bajuyo",
    role: "Research Lead",
    imageSrc: Edgie2,
    description: "Leading research initiatives and backend development"
  },
  {
    name: "Morrix Ken Ohata",
    role: "Frontend Developer",
    imageSrc: Edgie3,
    description: "Specializing in Vue.js and modern web animations"
  },
  {
    name: "Adriane Loquinte",
    role: "Creative Director",
    imageSrc: Edgie4,
    description: "Driving the vision of minimalistic and functional design"
  }
];

const values = [
  {
    icon: 'pi pi-heart',
    name: 'User-Centric',
    description: 'We put our users first in every decision we make'
  },
  {
    icon: 'pi pi-bolt',
    name: 'Innovation',
    description: 'Constantly pushing boundaries in startup solutions'
  },
  {
    icon: 'pi pi-check-circle',
    name: 'Quality',
    description: 'Committed to excellence in every detail'
  },
  {
    icon: 'pi pi-users',
    name: 'Community',
    description: 'Building a supportive ecosystem for startups'
  }
];
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(5%, 5%) scale(1.1);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 20s infinite;
}

.animate-float-reverse {
  animation: float 25s infinite reverse;
}

.animate-float-slow {
  animation: float 30s infinite;
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.invisible {
  opacity: 0;
  visibility: hidden;
}

@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  .text-2xl {
    font-size: 1.25rem;
  }
}
</style>