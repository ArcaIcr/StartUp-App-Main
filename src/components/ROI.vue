<template>
  <div class="api-interaction">
    <h2>API Interaction</h2>

    <!-- Query Parameters Form -->
    <form @submit.prevent="fetchApiData">
      <div>
        <label for="niche">Niche:</label>
        <input v-model="query.niche" id="niche" type="text" placeholder="e.g., coffee" />
      </div>

      <div>
        <label for="location">Location:</label>
        <input v-model="query.location" id="location" type="text" placeholder="e.g., US" />
      </div>

      <div>
        <label for="timeframe">Timeframe:</label>
        <input v-model="query.timeframe" id="timeframe" type="text" placeholder="e.g., today 12-m" />
      </div>

      <div>
        <label for="investment_amount">Investment Amount:</label>
        <input v-model="query.investment_amount" id="investment_amount" type="number" placeholder="e.g., 500" />
      </div>

      <div>
        <label for="forecast_period">Forecast Period (days):</label>
        <input v-model="query.forecast_period" id="forecast_period" type="number" placeholder="e.g., 180" />
      </div>

      <button type="submit">Send Request</button>
    </form>

    <!-- Display the API Response -->
    <div v-if="response" class="api-response">
      <h3>Response</h3>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Reactive state for the query parameters and the response
const query = ref({
  niche: '',
  location: '',
  timeframe: '',
  investment_amount: '',
  forecast_period: ''
});

const response = ref(null);

// Function to fetch data from the API
const fetchApiData = async () => {
  try {
    const res = await axios.get('https://startup-compass-api.onrender.com/calculate_roi', {
      params: {
        niche: query.value.niche,
        location: query.value.location,
        timeframe: query.value.timeframe,
        investment_amount: query.value.investment_amount,
        forecast_period: query.value.forecast_period
      }
    });
    response.value = res.data; // Set the response data
  } catch (error) {
    response.value = `Error: ${error.message}`; // Handle errors
  }
};
</script>

<style scoped>
.api-interaction {
  font-family: Arial, sans-serif;
  margin: 20px;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

form > div {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.api-response {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

pre {
  background-color: #eef;
  padding: 10px;
  border-radius: 3px;
}
</style>
