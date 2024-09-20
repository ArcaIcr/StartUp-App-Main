<script setup>
import axios from "axios"; // Import Axios for making HTTP requests
import { ref } from "vue";
import { RouterLink } from "vue-router"; // Import RouterLink to handle navigation

// Reactive variables to store form inputs
const revenue = ref("");
const previousRevenue = ref("");
const totalExpenses = ref("");
const customerBase = ref("");
const months = ref(12); // Default to 12 months
const insights = ref("");

// Method to handle form submission
const handleFormSubmit = async () => {
  try {
    const response = await axios.get(
      "https://startup-compass-api.onrender.com/business-assessment",
      {
        params: {
          current_revenue: revenue.value,
          previous_revenue: previousRevenue.value,
          total_expenses: totalExpenses.value,
          customer_base: customerBase.value,
          months: months.value,
        },
      }
    );

    // Set insights from the response
    insights.value = response.data.insights.join("\n");
  } catch (error) {
    if (error.response) {
      insights.value = error.response.data.error || "An error occurred.";
    } else {
      insights.value = "An error occurred while connecting to the API.";
    }
  }
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
                >Current Monthly Revenue ($)</label
              >
              <input
                v-model="revenue"
                type="number"
                id="revenue"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your current monthly revenue"
                required
              />

              <!-- Previous Revenue Input -->
              <label for="previous-revenue" class="block mb-2"
                >Previous Monthly Revenue ($)</label
              >
              <input
                v-model="previousRevenue"
                type="number"
                id="previous-revenue"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your previous monthly revenue"
                required
              />

              <!-- Total Expenses Input -->
              <label for="total-expenses" class="block mb-2"
                >Total Expenses ($)</label
              >
              <input
                v-model="totalExpenses"
                type="number"
                id="total-expenses"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your total expenses"
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

              <!-- Months Input -->
              <label for="months" class="block mb-2"
                >Months for Average Revenue Calculation</label
              >
              <input
                v-model="months"
                type="number"
                id="months"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter the number of months (default is 12)"
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
