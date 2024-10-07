<script setup>
import axios from "axios";
import { ref } from "vue";

// Import API endpoint
import { getApiEndpoint } from "@/apiConfig";
const endpoint = getApiEndpoint(); // Get the API endpoint

// Reactive state for the query parameters and the response
const query = ref({
  niche: "",
  location: "",
  timeframe: "",
  top_n: 5,
});

const response = ref(null);
const isLoading = ref(false);

// Function to fetch data from the API
const fetchApiData = async () => {
  try {
    isLoading.value = true;
    const res = await axios.get(`${endpoint}/trends/trend_seeker`, {
      params: {
        niche: query.value.niche,
        location: query.value.location,
        timeframe: query.value.timeframe,
        top_n: query.value.top_n,
      },
    });
    response.value = res.data; // Set the response data
  } catch (error) {
    console.error("Network Error:", error); // Handle errors silently
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="py-8 bg-gray-100">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg bg-white shadow-lg">
        <!-- Input Panel (Left Column) -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-3xl font-extrabold text-darkblue mb-4">Trend Seeker</h2>
          <p class="mb-4 text-gray-700">
            Discover the latest trends in your niche with valuable insights!
          </p>

          <!-- Query Parameters Form -->
          <form @submit.prevent="fetchApiData">
            <div class="mb-4">
              <label for="niche" class="block mb-2 text-sm font-medium text-gray-700">Niche</label>
              <input
                v-model="query.niche"
                id="niche"
                type="text"
                placeholder="e.g., coffee"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-lightblue transition"
                required
              />
            </div>

            <div class="mb-4">
              <label for="location" class="block mb-2 text-sm font-medium text-gray-700">Location</label>
              <input
                v-model="query.location"
                id="location"
                type="text"
                placeholder="e.g., US"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-lightblue transition"
                required
              />
            </div>

            <div class="mb-4">
              <label for="timeframe" class="block mb-2 text-sm font-medium text-gray-700">Timeframe</label>
              <input
                v-model="query.timeframe"
                id="timeframe"
                type="text"
                placeholder="e.g., today 12-m"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-lightblue transition"
                required
              />
            </div>

            <div class="mb-4">
              <label for="top_n" class="block mb-2 text-sm font-medium text-gray-700">Top N Suggestions</label>
              <input
                v-model="query.top_n"
                id="top_n"
                type="number"
                placeholder="e.g., 5"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-lightblue transition"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue transition duration-300 font-semibold"
            >
              Fetch Trends
            </button>

            <!-- Loading Indicator -->
            <div v-if="isLoading" class="flex items-center mt-4">
              <svg
                class="animate-spin h-5 w-5 text-darkblue"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              <span class="ml-2 text-gray-700">Loading...</span>
            </div>
          </form>
        </div>

        <!-- Result Panel (Right Column) -->
        <div class="p-6 bg-gray-50 rounded-lg shadow-md">
          <!-- Display the API Response -->
          <div v-if="response" class="api-response mt-6">
            <div v-if="response.error" class="bg-yellow-50 p-4 mb-2 rounded-lg shadow-md">
              <h4 class="text-lg font-semibold text-yellow-600">No Data Found</h4>
              <p class="mb-2">We couldn't find exact data for your query, but here are some related suggestions:</p>
              <ul class="list-disc list-inside text-gray-700">
                <li v-for="keyword in response.suggested_keywords" :key="keyword">{{ keyword }}</li>
              </ul>
            </div>

            <!-- Display Top Suggestions -->
            <div v-if="response.top_suggestions">
              <h3 class="font-bold mb-4">Suggestions for: <span class="italic">{{ response.original_keyword }}</span></h3>
              <div v-for="suggestion in response.top_suggestions" :key="suggestion.keyword" class="bg-gray-50 p-4 mb-2 rounded-lg shadow hover:shadow-lg transition">
                <h4 class="text-lg font-semibold">{{ suggestion.keyword }}</h4>
                <div v-if="suggestion.niche_data.error" class="text-red-600">
                  <p>{{ suggestion.niche_data.error }}</p>
                </div>
                <div v-else>
                  <p><strong>Average Interest Score:</strong> {{ suggestion.niche_data.average_interest_score }}</p>
                  <p><strong>Latest Interest Score:</strong> {{ suggestion.niche_data.latest_interest_score }}</p>
                  <p><strong>Date:</strong> {{ suggestion.niche_data.month }}/{{ suggestion.niche_data.year }}</p>
                </div>
              </div>
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