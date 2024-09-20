<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router"; // Import RouterLink to handle navigation

// Reactive variables to store form inputs
const revenue = ref("");
const profitMargin = ref("");
const growthRate = ref("");
const customerBase = ref("");
const insights = ref("");

// Method to handle form submission
const handleFormSubmit = () => {
  // Example insight generation based on form inputs
  insights.value = `
    Based on your inputs:
    - Revenue: $${revenue.value}
    - Profit Margin: ${profitMargin.value}%
    - Growth Rate: ${growthRate.value}%
    - Customer Base: ${customerBase.value}

    Suggested Action: Focus on increasing your profit margin through cost optimization, and consider diversifying your customer base to drive growth.
  `;
};
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-white shadow-md"
      >
        <!-- Form Section for Business Performance Overview -->
        <div class="p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold">Business Assessment</h2>
            <p class="mt-2 mb-4">
              Evaluate your business's performance and get tailored
              recommendations to boost growth.
            </p>

            <!-- Business Performance Overview Form -->
            <form @submit.prevent="handleFormSubmit">
              <!-- Revenue Input -->
              <label for="revenue" class="block mb-2"
                >Monthly Revenue ($)</label
              >
              <input
                v-model="revenue"
                type="number"
                id="revenue"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your monthly revenue"
                required
              />

              <!-- Profit Margin Input -->
              <label for="profit-margin" class="block mb-2"
                >Profit Margin (%)</label
              >
              <input
                v-model="profitMargin"
                type="number"
                id="profit-margin"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your profit margin"
                required
              />

              <!-- Growth Rate Input -->
              <label for="growth-rate" class="block mb-2"
                >Growth Rate (%)</label
              >
              <input
                v-model="growthRate"
                type="number"
                id="growth-rate"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your growth rate"
                required
              />

              <!-- Customer Base Input -->
              <label for="customer-base" class="block mb-2"
                >Customer Base (Number of Customers)</label
              >
              <input
                v-model="customerBase"
                type="number"
                id="customer-base"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter the size of your customer base"
                required
              />

              <!-- Submit Button -->
              <button
                type="submit"
                class="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 cursor-pointer"
              >
                Get Insights
              </button>
            </form>

            <!-- Displaying Insights -->
            <div v-if="insights" class="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 class="text-xl font-bold">Your Insights</h3>
              <p>{{ insights }}</p>
            </div>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="p-6 flex flex-col justify-between">
          <RouterLink to="/business-assessment">
            <span
              class="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 cursor-pointer"
            >
              Start Full Assessment
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add any custom styles here */
</style>
