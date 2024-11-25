<template>
  <Navbar />
  <div class="about-container">
    <!-- Background Animation -->
    <div class="animated-background">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>

    <div class="content-wrapper">
      <!-- Title Section -->
      <div class="title-section">
        <h1 class="main-title animate-fade-in">
          Meet Our Team
        </h1>
        <p class="subtitle">
          <TypeWriter 
            text="The creative minds behind StartUp Compass"
            :duration="1.5"
            :start-delay="1000"
          />
        </p>
      </div>

      <!-- Team Grid -->
      <div class="team-grid">
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
        class="values-section"
        :class="{ 'animate-fade-in-up': isValuesSectionVisible }"
      >
        <h1 class="main-title mb-12">
          <TypeWriter 
            v-if="isValuesSectionVisible"
            text="Our Values"
            :duration="1.5"
            :start-delay="0"
          />
          <span v-else class="invisible">Our Values</span>
        </h1>
        <div class="values-grid" :class="{ 'visible': isValuesSectionVisible }">
          <div 
            v-for="(value, index) in values" 
            :key="index" 
            class="value-item"
            :style="{ 
              '--delay': `${index * 200}ms`,
              'animation-play-state': isValuesSectionVisible ? 'running' : 'paused'
            }"
          >
            <i :class="value.icon + ' text-primary text-4xl mb-4'"></i>
            <h3 class="value-name">{{ value.name }}</h3>
            <p class="value-description">{{ value.description }}</p>
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
.about-container {
  min-height: 100vh;
  background: var(--surface-ground);
  position: relative;
  overflow: hidden;
}

.animated-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0.1;
}

.gradient-sphere {
  position: absolute;
  width: 50vmax;
  height: 50vmax;
  border-radius: 50%;
  filter: blur(80px);
}

.gradient-sphere:nth-child(1) {
  top: -25%;
  left: -25%;
  background: radial-gradient(circle at center, var(--primary-200), transparent 70%);
  animation: float 20s infinite;
}

.gradient-sphere:nth-child(2) {
  top: 50%;
  right: -25%;
  background: radial-gradient(circle at center, var(--primary-300), transparent 70%);
  animation: float 25s infinite reverse;
}

.gradient-sphere:nth-child(3) {
  bottom: -25%;
  left: 30%;
  background: radial-gradient(circle at center, var(--primary-400), transparent 70%);
  animation: float 30s infinite;
}

.content-wrapper {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
  z-index: 1;
}

.title-section {
  text-align: center;
  margin-bottom: 4rem;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.animate-fade-in {
  animation: fadeIn 1.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary-color);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 6rem;
}

.values-section {
  text-align: center;
  padding-top: 6rem;
  opacity: 0;
}

.values-section.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  opacity: 0;
}

.values-grid.visible {
  opacity: 1;
}

.value-item {
  padding: 2rem;
  background: var(--surface-card);
  border-radius: 1rem;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

.invisible {
  opacity: 0;
  visibility: hidden;
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

.mb-12 {
  margin-bottom: 3rem;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(5%, 5%) scale(1.1);
  }
}

.animate-slide-down {
  animation: slideDown 0.8s ease-out;
}

.animate-slide-down-delay {
  animation: slideDown 0.8s ease-out 0.2s backwards;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out 0.4s backwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .content-wrapper {
    padding: 4rem 1rem;
  }
}
</style>