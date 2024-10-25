<script setup>
import axios from "axios"; // Import Axios for making HTTP requests
import { ref } from "vue";
import { RouterLink } from "vue-router"; // Import RouterLink to handle navigation
import Sidebar from "../Sidebar.vue"; // Import Sidebar component

// Import API endpoint
import { getApiEndpoint } from '@/apiConfig';
const endpoint = getApiEndpoint(); // Get the API endpoint

// Reactive variables to store form inputs
const revenue = ref("");
const previousRevenue = ref("");
const totalExpenses = ref("");
const customerBase = ref("");
const months = ref(12); // Default to 12 months
const industry = ref(""); // Added industry field
const insights = ref("");

// List of available industries
const industries = [
  "Retail",
  "Tech",
  "Healthcare",
  "Finance",
  "Energy",
  "Consumer Goods",
  "Utilities",
  "Industrial",
];

// Method to handle form submission
const handleFormSubmit = async () => {
  try {
    const response = await axios.get(`${endpoint}/trends/business-assessment`, {
      params: {
        current_revenue: revenue.value,
        previous_revenue: previousRevenue.value,
        total_expenses: totalExpenses.value,
        customer_base: customerBase.value,
        months: months.value,
        industry: industry.value, // Include industry in the request
      },
    });

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
  <div class="flex h-screen">
    <Sidebar />
    
    <div class="flex-1 relative p-4"> <!-- Main content area with padding -->
      <!-- Fixed Business Assessment Window -->
      <div class="bg-white rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 max-h-screen overflow-hidden">
        <!-- Window Header -->
        <div class="bg-darkblue text-white rounded-t-lg p-4 flex justify-between items-center">
          <h2 class="text-xl font-bold">Business Assessment</h2>
          <button @click="$emit('close')" class="text-white hover:bg-red-600 rounded-full p-2">
            <i class="pi pi-times"></i>
          </button>
        </div>
  
        <!-- Window Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(100vh-200px)]"> <!-- Set a max height for the scrollable area -->
          <p class="mb-4 text-gray-700">
            Evaluate your business's performance and get tailored recommendations to boost growth.
          </p>
  
          <!-- Business Performance Overview Form -->
          <form @submit.prevent="handleFormSubmit">
            <!-- Revenue Input -->
            <label for="revenue" class="block mb-2">Current Monthly Revenue ($)</label>
            <input
              v-model="revenue"
              type="number"
              id="revenue"
              class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter your current monthly revenue"
              required
            />
  
            <!-- Previous Revenue Input -->
            <label for="previous-revenue" class="block mb-2">Previous Monthly Revenue ($)</label>
            <input
              v-model="previousRevenue"
              type="number"
              id="previous-revenue"
              class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter your previous monthly revenue"
              required
            />
  
            <!-- Total Expenses Input -->
            <label for="total-expenses" class="block mb-2">Total Expenses ($)</label>
            <input
              v-model="totalExpenses"
              type="number"
              id="total-expenses"
              class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter your total expenses"
              required
            />
  
            <!-- Customer Base Input -->
            <label for="customer-base" class="block mb-2">Customer Base (Number of Customers)</label>
            <input
              v-model="customerBase"
              type="number"
              id="customer-base"
              class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter the size of your customer base"
              required
            />
  
            <!-- Months Input -->
            <label for="months" class="block mb-2">Months for Average Revenue Calculation</label>
            <input
              v-model="months"
              type="number"
              id="months"
              class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter the number of months (default is 12)"
            />
  
            <!-- Industry Input as a Dropdown -->
            <label for="industry" class="block mb-2">Industry</label>
            <select
              v-model="industry"
              id="industry"
              class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              required
            >
              <option disabled value="">Select your industry</option>
              <option v-for="ind in industries" :key="ind" :value="ind">{{ ind }}</option>
            </select>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="inline-block bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue cursor-pointer transition duration-300"
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
  
        <!-- Navigation Section -->
        <div class="p-6 border-t">
          <RouterLink to="/signup">
            <span class="inline-block bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue cursor-pointer transition duration-300">
              Start Full Assessment
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles for the window */
.fixed {
  position: fixed; /* Keeps the modal in a fixed position */
}

.z-50 {
  z-index: 50; /* Higher than the sidebar */
}
</style>
