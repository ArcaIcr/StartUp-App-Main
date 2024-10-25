<template>
    <div class="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Sales</h2>
        <div class="grid grid-cols-2 gap-4">
        <div>
            <canvas id="salesChart"></canvas>
        </div>
        <div>
            <canvas id="transactionsChart"></canvas>
        </div>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
    mounted() {
        const salesCtx = document.getElementById("salesChart").getContext("2d");
        new Chart(salesCtx, {
            type: "line",
            data: {
                labels: ["Q1", "Q2", "Q3", "Q4"],
                datasets: [
                {
                    label: "Sales",
                    data: [30000, 40000, 35000, 50000],
                    borderColor: "rgba(75, 192, 192, 1)",
                    fill: false,
                },
                ],
            },
            options: {
                responsive: true,
                scales: {
                y: {
                    beginAtZero: true,
                },
                },
            },
        });
    },
};
</script>
  