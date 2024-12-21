<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Trend Analysis</h2>
        
        <div class="flex space-x-4 mb-4">
            <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                <input 
                    v-model="queryParams.niche" 
                    @change="fetchTrendData"
                    type="text"
                    placeholder="Enter niche (e.g., coffee, tech)"
                    class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            
            <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                    v-model="queryParams.location" 
                    @change="fetchTrendData"
                    class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="US">United States</option>
                    <option value="PH">Philippines</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                </select>
            </div>
        </div>
        
        <div class="w-full h-96">
            <canvas ref="trendChart" class="w-full h-full"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
import { getApiEndpoint } from "@/apiConfig";

export default {
    data() {
        return {
            chartData: {
                labels: [],
                datasets: []
            },
            queryParams: {
                niche: 'coffee',
                timeframe: 'today 12-m',
                location: 'US'
            },
            chart: null
        };
    },
    mounted() {
        this.fetchTrendData();
    },
    methods: {
        async fetchTrendData() {
            try {
                const apiUrl = getApiEndpoint();
                const queryString = new URLSearchParams(this.queryParams).toString();
                const response = await axios.get(`${apiUrl}/trends/interest_by_region?${queryString}`);
                
                // Check if response.data is an array or an object
                const trendData = Array.isArray(response.data) ? response.data[0] : response.data;
                
                this.chartData = {
                    labels: trendData.labels,
                    datasets: [{
                        label: `${this.queryParams.niche} Interest by Region`,
                        data: trendData.values,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    }]
                };
                
                this.renderChart();
            } catch (error) {
                console.error("Error fetching trend data:", error);
                // Fallback to default data if API call fails
                this.renderFallbackChart();
            }
        },
        renderChart() {
            // Destroy existing chart if it exists
            if (this.chart) {
                this.chart.destroy();
            }
            
            const ctx = this.$refs.trendChart.getContext("2d");
            this.chart = new Chart(ctx, {
                type: "bar",
                data: this.chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { 
                        y: { 
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Interest Level'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Regions'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: `${this.queryParams.niche} Interest Trends in ${this.queryParams.location}`
                        }
                    }
                },
            });
        },
        renderFallbackChart() {
            // Provide a fallback chart with sample data
            this.chartData = {
                labels: [
                    "Metro Manila", "Calabarzon", "Central Luzon", 
                    "Ilocos Region", "Davao Region"
                ],
                datasets: [{
                    label: 'Sample Interest Data',
                    data: [100, 77, 72, 90, 69],
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                }]
            };
            this.renderChart();
        }
    }
};
</script>