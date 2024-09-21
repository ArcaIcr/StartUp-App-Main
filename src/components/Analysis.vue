<script setup>
import axios from "axios"; // Import Axios for making HTTP requests
import { ref } from "vue"; // Vue reactive data

// Reactive variables to store form inputs and API response
const niche = ref(""); // Niche input
const location = ref(""); // Location input
const timeframe = ref(""); // Timeframe input
const apiResponse = ref(null); // To store the API response
const error = ref(""); // To display error messages

// Method to fetch data from API based on form inputs
const fetchData = async () => {
  try {
    const response = await axios.get("https://startup-compass-api.onrender.com/get-bar-graph-data", {
      params: {
        niche: niche.value,
        location: location.value,
        timeframe: timeframe.value,
      },
    });

    // Check if the API response contains the required fields
    if (response.data.labels && response.data.values) {
      apiResponse.value = response.data; // Store the full response
      error.value = ""; // Clear previous errors
    } else {
      error.value = "No data available for the given parameters.";
      apiResponse.value = null; // Clear any previous response
    }
  } catch (err) {
    if (err.response) {
      error.value = err.response.data.error || "An error occurred.";
    } else {
      error.value = "An error occurred while connecting to the API.";
    }
    apiResponse.value = null; // Clear any previous response
  }
};
</script>

<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-white shadow-md">
        
        <!-- Form Section for Interest Score Analysis -->
        <div class="p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold">Interest Score Analysis</h2>
            <p class="mt-2 mb-4">
              Provide your niche, location, and timeframe to analyze interest scores.
            </p>

            <!-- Interest Score Analysis Form -->
            <form @submit.prevent="fetchData">
              <label for="niche" class="block mb-2">Niche</label>
              <input v-model="niche" type="text" id="niche" class="w-full p-2 mb-4 border border-gray-300 rounded-lg" placeholder="Enter your niche (e.g., coffee)" required />

              <label for="location" class="block mb-2">Location</label>
              <input v-model="location" type="text" id="location" class="w-full p-2 mb-4 border border-gray-300 rounded-lg" placeholder="Enter your location (e.g., US)" required />

              <label for="timeframe" class="block mb-2">Timeframe</label>
              <input v-model="timeframe" type="text" id="timeframe" class="w-full p-2 mb-4 border border-gray-300 rounded-lg" placeholder="e.g., today 12-m" required />

              <button type="submit" class="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 cursor-pointer">Analyze</button>
            </form>

            <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-600 rounded-lg">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- API Response Section -->
        <div class="p-6 flex flex-col justify-between">
          <div class="bg-white shadow-md rounded-lg p-4">
            <h3 class="text-xl font-semibold">API Response</h3>
            <pre v-if="apiResponse" class="mt-2 bg-gray-100 p-4 rounded">
              {{ JSON.stringify(apiResponse, null, 2) }}
            </pre>
            <div v-if="!apiResponse" class="mt-2 text-gray-500">
              No data received yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add any custom styles here */
</style>
