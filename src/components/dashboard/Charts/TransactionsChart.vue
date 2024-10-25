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
        const transactionsCtx = document
            .getElementById("transactionsChart")
            .getContext("2d");
        new Chart(transactionsCtx, {
        type: "pie",
        data: {
            labels: ["Completed", "Pending", "Cancelled"],
            datasets: [
            {
                data: [70, 20, 10],
                backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56"],
            },
            ],
        },
        options: {
            responsive: true,
        },
        });
    },
};
</script>
  