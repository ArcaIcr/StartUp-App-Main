<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Trend</h2>
      <canvas ref="trendChart"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
    mounted() {
        const ctx = this.$refs.trendChart.getContext("2d");
            new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                {
                    label: "Revenue",
                    data: [12000, 15000, 13000, 17000, 20000],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
                ],
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } },
                },
            });
    },
};
</script>
  