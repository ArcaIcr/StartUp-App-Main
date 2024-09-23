<script setup>
import axios from "axios";
import { ref } from "vue";

// Import API endpoint
import { getApiEndpoint } from '@/apiConfig';
const endpoint = getApiEndpoint(); // Get the API endpoint
const isLoading = ref(false); // Reactive state for loading

// List of supported country codes (ISO-3166) for Google Trends
const countries = ref([
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Philippines", value: "PH" },
  { label: "India", value: "IN" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Brazil", value: "BR" },
  { label: "Mexico", value: "MX" },
  { label: "Japan", value: "JP" },
  { label: "South Korea", value: "KR" },
  { label: "China", value: "CN" },
  { label: "Italy", value: "IT" },
  { label: "Spain", value: "ES" },
  { label: "Russia", value: "RU" },
  // Add more countries as needed
]);

// Reactive state for the query parameters and the response
const query = ref({
  niche: "",
  location: "US", // Default to United States
  timeframe: "today 12-m", // Default timeframe set to 1 Month
  investment_amount: "",
  forecast_period: "",
});

const response = ref(null);

// Function to fetch data from the API
const fetchApiData = async () => {
  isLoading.value = true; // Start loading
  response.value = null; // Clear previous response

  try {
    const res = await axios.get(`${endpoint}/calculate_roi`, {
      params: {
        niche: query.value.niche,
        location: query.value.location,
        timeframe: query.value.timeframe,
        investment_amount: query.value.investment_amount,
        forecast_period: query.value.forecast_period,
      },
    });
    response.value = res.data; // Set the response data
  } catch (error) {
    response.value = `Error: ${error.message}`; // Handle errors
  } finally {
    isLoading.value = false; // Stop loading
  }
};
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-white shadow-lg">
        <!-- ROI Calculator Section -->
        <div class="p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-3xl font-extrabold text-darkblue mb-4 text-center">
              ROI Calculator
            </h2>
            <p class="mb-4 text-gray-700 text-center">
              Unlock your business potential with accurate ROI insights powered by Google Trends integration!
            </p>

            <!-- Query Parameters Form -->
            <form @submit.prevent="fetchApiData" class="mb-4">
              <!-- Niche Input -->
              <div class="flex items-center mb-4">
                <label for="niche" class="block w-24 text-right mr-2">Niche</label>
                <input
                  v-model="query.niche"
                  id="niche"
                  type="text"
                  placeholder="e.g., coffee"
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <!-- Location Dropdown -->
              <div class="flex items-center mb-4">
                <label for="location" class="block w-24 text-right mr-2">Location</label>
                <select
                  v-model="query.location"
                  id="location"
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option v-for="country in countries" :key="country.value" :value="country.value">
                    {{ country.label }}
                  </option>
                </select>
              </div>

              <!-- Timeframe Dropdown -->
              <div class="flex items-center mb-4">
                <label for="timeframe" class="block w-24 text-right mr-2">Timeframe</label>
                <select
                  v-model="query.timeframe"
                  id="timeframe"
                  class="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="today 12-m">1 Month</option>
                  <option value="today 5-y">5 Years</option>
                </select>
              </div>

              <!-- Investment Amount Input -->
              <div class="flex items-center mb-4">
                <label for="investment_amount" class="block w-24 text-right mr-2">Investment Amount</label>
                <input
                  v-model="query.investment_amount"
                  id="investment_amount"
                  type="number"
                  placeholder="e.g., 500"
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <!-- Forecast Period Input -->
              <div class="flex items-center mb-4">
                <label for="forecast_period" class="block w-24 text-right mr-2">Forecast Period (days)</label>
                <input
                  v-model="query.forecast_period"
                  id="forecast_period"
                  type="number"
                  placeholder="e.g., 180"
                  class="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <!-- Submit Button with Loading Icon -->
              <button
                type="submit"
                class="block mx-auto bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue cursor-pointer transition duration-300"
                :disabled="isLoading"
              >
                <span v-if="!isLoading">Send Request</span>
                <div v-else class="flex items-center">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span class="ml-2 text-gray-100">Loading...</span>
                </div>
              </button>
            </form>
          </div>
        </div>

        <!-- ROI Insights Display -->
        <div class="p-6 bg-gray-100 rounded-lg">
          <div v-if="response">
            <h3 class="text-lg font-semibold text-darkblue mb-4 text-center">ROI Insights for {{ query.niche }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-700"><strong>Initial Interest Score:</strong> {{ response.initial_interest_score }}</p>
                <p class="text-gray-700"><strong>Forecasted Interest Score:</strong> {{ response.forecasted_interest_score }}</p>
                <p class="text-gray-700"><strong>Growth Trend:</strong> {{ response.growth_trend }}</p>
              </div>
              <div>
                <p class="text-gray-700"><strong>Investment Amount:</strong> ${{ response.investment_amount }}</p>
                <p class="text-gray-700"><strong>Forecast Period:</strong> {{ response.forecast_period_days }} days</p>
                <p class="text-gray-700"><strong>Estimated ROI:</strong> {{ response.estimated_roi }}%</p>
                <p class="text-gray-700"><strong>Recommendation:</strong> {{ response.recommendation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Instructions Section -->
  <section class="py-4 bg-lightblue text-white">
    <div class="container mx-auto">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-center mb-4">Instructions & Purpose</h2>
        <p class="text-center">
          This ROI calculator helps you estimate the potential return on investment for a specific niche in a given location. It leverages Google Trends data to analyze search interest and predict future growth trends.
        </p>
        <ul class="text-center list-disc list-inside">
          <li>Enter the niche you are interested in. For example, "coffee", "fitness", or "travel".</li>
          <li>Select the country where you plan to operate your business from the dropdown list.</li>
          <li>Select the timeframe for which you want to estimate ROI. Choose from 1 Month, 1 Year, or 5 Years.</li>
          <li>Enter the investment amount you are planning to allocate. For example, "$500" or "$1000".</li>
          <li>Enter the forecast period in days for which you want to project the ROI. For example, "180 days" or "365 days".</li>
          <li>Click "Send Request" to calculate the estimated ROI.</li>
        </ul>
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
