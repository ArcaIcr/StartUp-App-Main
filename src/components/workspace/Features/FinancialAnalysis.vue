<template>
  <div class="financial-analysis-container p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Financial Analysis</h2>
      <p class="text-gray-600">Track and analyze financial performance metrics</p>
    </div>

    <!-- Financial Metrics Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="metric in financialMetrics" 
           :key="metric.id" 
           class="bg-white rounded-lg shadow p-4">
        <h3 class="text-sm text-gray-500">{{ metric.name }}</h3>
        <div class="mt-2 flex justify-between items-end">
          <span class="text-2xl font-bold">{{ metric.value }}</span>
          <span :class="getChangeColor(metric.change)">
            {{ metric.change >= 0 ? '+' : '' }}{{ metric.change }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Revenue Chart -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Revenue Trends</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50">
          <!-- Placeholder for chart -->
          <p class="text-gray-500">Revenue Chart will be displayed here</p>
        </div>
      </div>

      <!-- Expenses Chart -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Expense Breakdown</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50">
          <!-- Placeholder for chart -->
          <p class="text-gray-500">Expenses Chart will be displayed here</p>
        </div>
      </div>
    </div>

    <!-- Financial Reports -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Financial Reports</h3>
        <div class="flex space-x-4">
          <select v-model="selectedPeriod" 
                  class="border rounded-md px-3 py-2 text-gray-700">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button @click="generateReport" 
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Generate Report
          </button>
          <button @click="$router.push('/maker-space')">Back to Makerspace</button>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="transaction in recentTransactions" 
                :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ transaction.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ transaction.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="getTypeClass(transaction.type)">
                  {{ transaction.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm" 
                  :class="transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'">
                {{ transaction.amount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPeriod = ref('monthly')

const financialMetrics = ref([
  {
    id: 1,
    name: 'Total Revenue',
    value: '$45,678',
    change: 12.5
  },
  {
    id: 2,
    name: 'Total Expenses',
    value: '$23,456',
    change: -5.2
  },
  {
    id: 3,
    name: 'Net Profit',
    value: '$22,222',
    change: 8.7
  },
  {
    id: 4,
    name: 'Cash Flow',
    value: '$15,789',
    change: 3.4
  }
])

const recentTransactions = ref([
  {
    id: 1,
    date: '2023-12-10',
    description: 'Product Sales',
    type: 'Income',
    amount: '$5,000'
  },
  {
    id: 2,
    date: '2023-12-09',
    description: 'Office Supplies',
    type: 'Expense',
    amount: '$500'
  },
  {
    id: 3,
    date: '2023-12-08',
    description: 'Consulting Fees',
    type: 'Income',
    amount: '$2,000'
  }
])

const getChangeColor = (change) => {
  return change >= 0 ? 'text-green-600' : 'text-red-600'
}

const getTypeClass = (type) => {
  return type === 'Income'
    ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full'
    : 'text-red-600 bg-red-100 px-2 py-1 rounded-full'
}

const generateReport = () => {
  console.log(`Generating ${selectedPeriod.value} financial report...`)
  // TODO: Implement report generation logic
}
</script>

<style scoped>
.financial-analysis-container {
  min-height: calc(100vh - 4rem);
  background-color: #f9fafb;
}
</style>
