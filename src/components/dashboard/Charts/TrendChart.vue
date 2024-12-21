<template>
    <div class="bg-white p-6 rounded-xl shadow-lg"> <!-- Enhanced shadow and rounded corners -->
        <div class="flex justify-between items-center mb-6"> <!-- Improved header layout -->
            <h2 class="text-xl font-bold text-gray-800">Trend Analysis</h2>
            <div class="flex items-center space-x-3">
                <!-- Optional: Add export or refresh functionality -->
                <button @click="fetchTrendData" class="text-gray-500 hover:text-blue-600">
                    <i class="fas fa-sync"></i>
                </button>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"> <!-- Responsive grid for inputs -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                <input 
                    v-model="queryParams.niche" 
                    @change="fetchTrendData"
                    type="text"
                    placeholder="Enter niche (e.g., coffee, tech)"
                    class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select 
                    v-model="queryParams.location" 
                    @change="fetchTrendData"
                    class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                    <option value="US">United States</option>
                    <option value="PH">Philippines</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                </select>
            </div>
        </div>
        
        <!-- Enlarged and more responsive chart container -->
        <div class="w-full h-[500px] min-h-[400px]"> 
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
            // Structured chart data for better readability
            chartData: {
                labels: [],
                datasets: []
            },
            // Centralized query parameters with sensible defaults
            queryParams: {
                niche: 'coffee',
                timeframe: 'today 12-m',
                location: 'US'
            },
            chart: null
        };
    },
    mounted() {
        // Fetch trend data when component is mounted
        this.fetchTrendData();
    },
    methods: {
        async fetchTrendData() {
            try {
                // Construct API URL with dynamic query parameters
                const apiUrl = getApiEndpoint();
                const queryString = new URLSearchParams(this.queryParams).toString();
                const response = await axios.get(`${apiUrl}/trends/interest_by_region?${queryString}`);
                
                // Flexible data extraction: supports both array and object responses
                const trendData = Array.isArray(response.data) ? response.data[0] : response.data;
                
                // Prepare chart data with enhanced styling
                this.chartData = {
                    labels: trendData.labels,
                    datasets: [{
                        label: `${this.queryParams.niche} Interest by Region`,
                        data: trendData.values,
                        backgroundColor: "rgba(75, 192, 192, 0.7)", // Slightly more opaque
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(75, 192, 192, 0.9)"
                    }]
                };
                
                this.renderChart();
            } catch (error) {
                console.error("Error fetching trend data:", error);
                this.renderFallbackChart();
            }
        },
        renderChart() {
            // Safely destroy existing chart
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
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Regions'
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: `${this.queryParams.niche} Interest Trends in ${this.queryParams.location}`,
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleColor: 'white',
                            bodyColor: 'white'
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                },
            });
        },
        renderFallbackChart() {
            // Comprehensive fallback with sample data
            this.chartData = {
                labels: [
                    "Metro Manila", "Calabarzon", "Central Luzon", 
                    "Ilocos Region", "Davao Region"
                ],
                datasets: [{
                    label: 'Sample Interest Data',
                    data: [100, 77, 72, 90, 69],
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                }]
            };
            this.renderChart();
        }
    }
};
</script>

<style scoped>
/* Optional: Add some subtle transitions */
.bg-white {
    transition: all 0.3s ease;
}
.bg-white:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>