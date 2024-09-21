<script setup>
import axios from "axios"; // Import Axios for making HTTP requests
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import { RouterLink } from "vue-router"; // Import RouterLink to handle navigation

// Registering the necessary components for Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Reactive variables to store form inputs
const niche = ref("");
const location = ref("");
const timeframe = ref("");
const chartData = ref({
  labels: [], // Ensure it's initialized as an empty array
  datasets: [
    {
      label: "Interest Scores",
      backgroundColor: "#42A5F5",
      data: [],
    },
  ],
});
const insights = ref("");

// Method to handle form submission
const fetchData = async () => {
  try {
    const response = await axios.get("https://your-api-endpoint.com/analysis", {
      params: {
        niche: niche.value,
        location: location.value,
        timeframe: timeframe.value,
      },
    });

    // Ensure the response data is structured correctly
    if (response.data.labels && response.data.values) {
      chartData.value.labels = response.data.labels;
      chartData.value.datasets[0].data = response.data.values;
    } else {
      insights.value = "No data available.";
    }

    // If insights are part of the response, set them
    insights.value =
      response.data.insights.join("\n") || "No insights available.";
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
        <!-- Form Section for Interest Score Analysis -->
        <div class="p-6 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-bold">Interest Score Analysis</h2>
            <p class="mt-2 mb-4">
              Provide your niche, location, and timeframe to analyze interest
              scores.
            </p>

            <!-- Interest Score Analysis Form -->
            <form @submit.prevent="fetchData">
              <!-- Niche Input -->
              <label for="niche" class="block mb-2">Niche</label>
              <input
                v-model="niche"
                type="text"
                id="niche"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your niche"
                required
              />

              <!-- Location Input -->
              <label for="location" class="block mb-2">Location</label>
              <input
                v-model="location"
                type="text"
                id="location"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Enter your location"
                required
              />

              <!-- Timeframe Input -->
              <label for="timeframe" class="block mb-2">Timeframe</label>
              <input
                v-model="timeframe"
                type="text"
                id="timeframe"
                class="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="e.g., last 30 days"
                required
              />

              <!-- Submit Button -->
              <button
                type="submit"
                class="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 cursor-pointer"
              >
                Analyze
              </button>
            </form>

            <!-- Displaying Insights -->
            <div v-if="insights" class="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 class="text-xl font-bold">Your Insights</h3>
              <p>{{ insights }}</p>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="p-6 flex flex-col justify-between">
          <div class="bg-white shadow-md rounded-lg p-4">
            <Bar :data="chartData" />
            <!-- Ensure prop name matches expected by Bar component -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add any custom styles here */
</style>
