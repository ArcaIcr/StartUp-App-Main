<template>
  <div
    class="roi-container flex flex-col items-center justify-center h-screen bg-gray-100 p-4"
  >
    <div
      class="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full bg-opacity-90"
    >
      <h2 class="text-3xl font-extrabold text-center text-darkblue mb-6">
        ROI Calculator
      </h2>
      <p class="text-center mb-4 text-gray-600">
        Unlock your business potential with accurate ROI insights!
      </p>

      <!-- Query Parameters Form -->
      <form @submit.prevent="fetchApiData" class="space-y-4">
        <div>
          <label for="niche" class="block text-sm font-medium text-gray-700"
            >Niche</label
          >
          <input
            v-model="query.niche"
            id="niche"
            type="text"
            placeholder="e.g., coffee"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
          />
        </div>

        <div>
          <label for="location" class="block text-sm font-medium text-gray-700"
            >Location</label
          >
          <input
            v-model="query.location"
            id="location"
            type="text"
            placeholder="e.g., US"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
          />
        </div>

        <div>
          <label for="timeframe" class="block text-sm font-medium text-gray-700"
            >Timeframe</label
          >
          <input
            v-model="query.timeframe"
            id="timeframe"
            type="text"
            placeholder="e.g., today 12-m"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
          />
        </div>

        <div>
          <label
            for="investment_amount"
            class="block text-sm font-medium text-gray-700"
            >Investment Amount</label
          >
          <input
            v-model="query.investment_amount"
            id="investment_amount"
            type="number"
            placeholder="e.g., 500"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
          />
        </div>

        <div>
          <label
            for="forecast_period"
            class="block text-sm font-medium text-gray-700"
            >Forecast Period (days)</label
          >
          <input
            v-model="query.forecast_period"
            id="forecast_period"
            type="number"
            placeholder="e.g., 180"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-lightblue"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-darkblue text-white font-semibold rounded-lg shadow-md hover:bg-lightblue transition duration-300 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-offset-2"
        >
          Send Request
        </button>
      </form>

      <!-- Display the API Response -->
      <div
        v-if="response"
        class="api-response mt-6 p-4 border rounded-lg bg-gray-50"
      >
        <h3 class="font-bold">Response</h3>
        <pre class="whitespace-pre-wrap text-sm text-gray-700">{{
          response
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

// Reactive state for the query parameters and the response
const query = ref({
  niche: "",
  location: "",
  timeframe: "",
  investment_amount: "",
  forecast_period: "",
});

const response = ref(null);

// Function to fetch data from the API
const fetchApiData = async () => {
  try {
    const res = await axios.get(
      "https://startup-compass-api.onrender.com/calculate_roi",
      {
        params: {
          niche: query.value.niche,
          location: query.value.location,
          timeframe: query.value.timeframe,
          investment_amount: query.value.investment_amount,
          forecast_period: query.value.forecast_period,
        },
      }
    );
    response.value = res.data; // Set the response data
  } catch (error) {
    response.value = `Error: ${error.message}`; // Handle errors
  }
};
</script>

<style scoped>
.roi-container {
  background-image: url("@/assets/img/roi-bg.png"); /* Optional background image */
  background-size: cover;
  background-position: center;
}

.api-response {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 20px;
}
</style>
