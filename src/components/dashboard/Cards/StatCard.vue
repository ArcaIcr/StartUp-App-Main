<template>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div
        v-for="card in stats"
        :key="card.title"
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg stats-card"
        :title="card.title"
      >
        <h2 class="text-lg font-semibold text-gray-700">{{ card.title }}</h2>
        <p class="mt-2 text-2xl font-bold text-black">{{ card.value }}</p>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        stats: [
          { title: "Current MRR", value: "$12.4k" },
          { title: "Current Customers", value: "16,601" },
          { title: "Active Customers", value: "33%" },
          { title: "Churn Rate", value: "2%" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .stats-card {
    transition: transform 0.2s ease;
  }
  .stats-card:hover {
    transform: scale(1.05);
  }
  </style>
  