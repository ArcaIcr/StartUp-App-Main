<script setup>
import { RouterLink } from "vue-router"; // Import RouterLink for navigation
</script>

<template>
  <section class="bg-bgLight py-16">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-darkblue mb-4 leading-tight">
          Welcome to <span class="text-accentDark">StartUp Compass</span>
        </h1>
        <p class="text-xl text-textMedium max-w-2xl mx-auto">
          Your ultimate toolkit for making data-driven decisions. Discover the latest trends, assess your business health, and explore financial insights all in one place.
        </p>
      </div>

      <!-- Mission and Features Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <!-- Mission Section -->
        <div class="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out">
          <h2 class="text-4xl font-bold text-darkblue mb-4">Our Mission</h2>
          <p class="text-lg text-gray-700 mb-4">
            At StartUp Compass, our mission is to empower entrepreneurs and business owners with tools to understand market trends, evaluate business performance, and make informed financial decisions.
          </p>
          <p class="text-lg text-gray-700">
            We help you navigate the complexities of business growth with ease and confidence, from identifying emerging trends to analyzing your ROI.
          </p>
        </div>

        <!-- Key Features Section -->
        <div class="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out">
          <h2 class="text-4xl font-bold text-darkblue mb-4">Key Features</h2>
          <ul class="text-lg text-gray-700 space-y-3">
            <li>✔ Market Trend Analysis: Discover what’s trending in your niche and region.</li>
            <li>✔ ROI Calculator: Calculate your return on investment based on data-driven insights.</li>
            <li>✔ Business Assessment: Get comprehensive feedback on your business health.</li>
            <li>✔ Financial Metrics: Analyze key metrics like revenue growth, market share, and profit margins.</li>
          </ul>
        </div>
      </div>

      <!-- Key Benefits Section -->
      <div class="bg-white p-12 rounded-lg shadow-lg mb-20">
        <h2 class="text-4xl font-bold text-darkblue mb-8 text-center">Why Choose StartUp Compass?</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-bold text-darkblue mb-3">Data-Driven Insights</h3>
            <p class="text-lg text-gray-700">
              Make smarter business decisions with real-time, accurate data. Our tools help you understand market trends, track performance, and measure financial health.
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-darkblue mb-3">Tailored for Entrepreneurs</h3>
            <p class="text-lg text-gray-700">
              Whether you're a startup founder or seasoned business owner, our platform meets your needs with personalized recommendations and actionable insights.
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-darkblue mb-3">Comprehensive Financial Tools</h3>
            <p class="text-lg text-gray-700">
              From ROI calculation to assessing profit margins, our platform offers all the financial tools you need to stay on top of business performance and plan for the future.
            </p>
          </div>

          <div>
            <h3 class="text-2xl font-bold text-darkblue mb-3">Easy-to-Use Interface</h3>
            <p class="text-lg text-gray-700">
              Our intuitive design allows you to explore, analyze, and act on data without a steep learning curve. Get started quickly and effortlessly.
            </p>
          </div>
        </div>
      </div>

      <!-- Call to Action Section -->
      <div class="text-center">
        <h2 class="text-4xl font-bold text-darkblue mb-6">Get Started Today</h2>
        <p class="text-xl text-textMedium mb-8">Explore the tools and take your business to the next level.</p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <RouterLink
            to="/trends"
            class="bg-accentDark text-white font-semibold rounded-lg px-8 py-4 hover:bg-darkblue transition duration-300 ease-in-out shadow-md transform hover:scale-105"
          >
            Explore Trends
          </RouterLink>
          <RouterLink
            to="/business"
            class="bg-accentDark text-white font-semibold rounded-lg px-8 py-4 hover:bg-darkblue transition duration-300 ease-in-out shadow-md transform hover:scale-105"
          >
            Start Assessment
          </RouterLink>
          <RouterLink
            to="/roi"
            class="bg-accentDark text-white font-semibold rounded-lg px-8 py-4 hover:bg-darkblue transition duration-300 ease-in-out shadow-md transform hover:scale-105"
          >
            Calculate ROI
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Customizing Tailwind styles for better presentation */
h1, h2, h3 {
  color: #1d1c1c; /* Dark Text */
}

.text-darkblue {
  color: #1F2E43; /* Dark Blue for headings */
}

.bg-accentDark {
  background-color: #00668c; /* Deep Blue */
}

.bg-darkblue {
  background-color: #1F2E43; /* Dark Blue for hover state */
}

.shadow-lg {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}
</style>
