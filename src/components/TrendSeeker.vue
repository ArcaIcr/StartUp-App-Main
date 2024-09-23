<script setup>
import axios from "axios";
import { ref } from "vue";

// Import API endpoint
import { getApiEndpoint } from '@/apiConfig';
const endpoint = getApiEndpoint(); // Get the API endpoint

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
      `${endpoint}/calculate_roi`,
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

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-white shadow-lg">
        <!-- ROI Calculator Section -->
        <div class="p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-3xl font-extrabold text-darkblue mb-4">
              ROI Calculator
            </h2>
            <p class="mb-4 text-gray-700">
              Unlock your business potential with accurate ROI insights!
            </p>

            <!-- Query Parameters Form -->
            <form @submit.prevent="fetchApiData">
              <!-- Niche Input -->
              <label for="niche" class="block mb-2">Niche</label>
              <input
                v-model="query.niche"
                id="niche"
                type="text"
                placeholder="e.g., coffee"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                required
              />

              <!-- Location Input -->
              <label for="location" class="block mb-2">Location</label>
              <input
                v-model="query.location"
                id="location"
                type="text"
                placeholder="e.g., US"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                required
              />

              <!-- Timeframe Input -->
              <label for="timeframe" class="block mb-2">Timeframe</label>
              <input
                v-model="query.timeframe"
                id="timeframe"
                type="text"
                placeholder="e.g., today 12-m"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                required
              />

              <!-- Investment Amount Input -->
              <label for="investment_amount" class="block mb-2">Investment Amount</label>
              <input
                v-model="query.investment_amount"
                id="investment_amount"
                type="number"
                placeholder="e.g., 500"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                required
              />

              <!-- Forecast Period Input -->
              <label for="forecast_period" class="block mb-2">Forecast Period (days)</label>
              <input
                v-model="query.forecast_period"
                id="forecast_period"
                type="number"
                placeholder="e.g., 180"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                required
              />

              <!-- Submit Button -->
              <button
                type="submit"
                class="inline-block bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue cursor-pointer transition duration-300"
              >
                Send Request
              </button>
            </form>

            <!-- Display the API Response -->
            <div v-if="response" class="api-response mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 class="font-bold">Response</h3>
              <pre class="whitespace-pre-wrap text-sm text-gray-700">{{
                response
              }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.api-response {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 20px;
}
</style>
