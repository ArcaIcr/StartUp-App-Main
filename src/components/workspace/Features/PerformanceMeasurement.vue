<script setup>
import { ref } from 'vue'

const selectedDepartment = ref('all')

const departments = ref([
  { id: 'all', name: 'All Departments' },
  { id: 'sales', name: 'Sales' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'development', name: 'Development' }
])

const kpiMetrics = ref([
  {
    id: 1,
    name: 'Productivity Rate',
    value: '87%',
    target: '90%',
    progress: 87,
    status: 'On Track'
  },
  {
    id: 2,
    name: 'Quality Score',
    value: '95%',
    target: '92%',
    progress: 95,
    status: 'Excellent'
  },
  {
    id: 3,
    name: 'Efficiency Index',
    value: '76%',
    target: '85%',
    progress: 76,
    status: 'Needs Improvement'
  }
])

const performanceMetrics = ref([
  {
    id: 1,
    name: 'Task Completion Rate',
    current: '85%',
    target: '90%',
    status: 'On Track'
  },
  {
    id: 2,
    name: 'Customer Satisfaction',
    current: '4.5/5',
    target: '4.8/5',
    status: 'Good'
  },
  {
    id: 3,
    name: 'Response Time',
    current: '2.5 hrs',
    target: '2 hrs',
    status: 'Needs Improvement'
  }
])

const getStatusClass = (status) => {
  const classes = {
    'Excellent': 'bg-green-100 text-green-800',
    'Good': 'bg-blue-100 text-blue-800',
    'On Track': 'bg-blue-100 text-blue-800',
    'Needs Improvement': 'bg-yellow-100 text-yellow-800',
    'Critical': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getProgressColor = (progress) => {
  if (progress >= 90) return 'bg-green-500'
  if (progress >= 75) return 'bg-blue-500'
  if (progress >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

const generateAnalysis = () => {
  console.log(`Generating analysis for ${selectedDepartment.value}...`)
  // TODO: Implement analysis generation logic
}
</script>

<template>
  <div class="performance-container p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Performance Measurement</h2>
      <p class="text-gray-600">Track and analyze key performance indicators</p>
      <button @click="$router.push('/makerspace')">Back to Makerspace</button>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div v-for="kpi in kpiMetrics" 
           :key="kpi.id" 
           class="bg-white rounded-lg shadow p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-sm font-medium text-gray-500">{{ kpi.name }}</h3>
          <span :class="getStatusClass(kpi.status)" class="px-2 py-1 rounded-full text-xs">
            {{ kpi.status }}
          </span>
        </div>
        <div class="mt-2">
          <div class="flex justify-between items-baseline">
            <span class="text-2xl font-bold">{{ kpi.value }}</span>
            <span class="text-sm text-gray-500">Target: {{ kpi.target }}</span>
          </div>
          <div class="mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="rounded-full h-2 transition-all duration-300"
                   :class="getProgressColor(kpi.progress)"
                   :style="{ width: `${kpi.progress}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Trend Chart -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Performance Trends</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50">
          <!-- Placeholder for chart -->
          <p class="text-gray-500">Performance Trend Chart will be displayed here</p>
        </div>
      </div>

      <!-- Comparison Chart -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold mb-4">Department Comparison</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50">
          <!-- Placeholder for chart -->
          <p class="text-gray-500">Department Comparison Chart will be displayed here</p>
        </div>
      </div>
    </div>

    <!-- Performance Analysis -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Performance Analysis</h3>
        <div class="flex space-x-4">
          <select v-model="selectedDepartment" 
                  class="border rounded-md px-3 py-2 text-gray-700">
            <option v-for="dept in departments" 
                    :key="dept.id" 
                    :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
          <button @click="generateAnalysis" 
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Generate Analysis
          </button>
        </div>
      </div>

      <!-- Performance Metrics Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Metric</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Target</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="metric in performanceMetrics" 
                :key="metric.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ metric.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ metric.current }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ metric.target }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="getStatusClass(metric.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ metric.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.performance-container {
  min-height: calc(100vh - 4rem);
  background-color: #f9fafb;
}
</style>
