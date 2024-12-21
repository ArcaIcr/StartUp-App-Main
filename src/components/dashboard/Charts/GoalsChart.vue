<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Business Goals Progress</h2>
      
      <div v-if="loading" class="flex justify-center items-center">
          <p class="text-gray-500">Loading goals...</p>
      </div>
      
      <div v-else-if="!goalsData" class="text-center text-gray-500">
          <p>No business assessment found. Please complete the business assessment.</p>
          <router-link 
              to="/assessment" 
              class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
              Complete Assessment
          </router-link>
      </div>
      
      <div v-else class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <h3 class="text-md font-medium text-gray-700 mb-2">Current Revenue</h3>
                  <div class="bg-gray-100 p-4 rounded-md">
                      <p class="text-2xl font-bold text-gray-800">₱{{ formatCurrency(goalsData.currentRevenue) }}</p>
                  </div>
              </div>
              
              <div>
                  <h3 class="text-md font-medium text-gray-700 mb-2">Target Revenue</h3>
                  <div class="bg-gray-100 p-4 rounded-md">
                      <p class="text-2xl font-bold text-gray-800">₱{{ formatCurrency(goalsData.targetRevenue) }}</p>
                  </div>
              </div>
          </div>
          
          <div>
              <h3 class="text-md font-medium text-gray-700 mb-2">Revenue Progress</h3>
              <div class="w-full bg-gray-200 rounded-full h-4">
                  <div 
                      class="bg-blue-600 h-4 rounded-full" 
                      :style="{ width: `${revenueProgressPercentage}%` }"
                  ></div>
              </div>
              <p class="text-sm text-gray-600 mt-2">
                  {{ revenueProgressPercentage.toFixed(2) }}% of target achieved
              </p>
          </div>
          
          <div>
              <h3 class="text-md font-medium text-gray-700 mb-2">Business Goals</h3>
              <p class="text-gray-600">{{ goalsData.businessGoals }}</p>
          </div>
          
          <div>
              <h3 class="text-md font-medium text-gray-700 mb-2">Current Challenges</h3>
              <p class="text-gray-600">{{ goalsData.challenges }}</p>
          </div>
          
          <canvas ref="goalsChart" class="w-full h-64"></canvas>
      </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import { db, auth } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default {
  setup() {
      const loading = ref(true);
      const goalsData = ref(null);
      const chart = ref(null);

      const formatCurrency = (value) => {
          return value ? value.toLocaleString('en-PH', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
          }) : '0';
      };

      const revenueProgressPercentage = computed(() => {
          if (!goalsData.value) return 0;
          const { currentRevenue, targetRevenue } = goalsData.value;
          return (currentRevenue / targetRevenue) * 100;
      });

      const fetchGoalsData = async () => {
          try {
              const user = auth.currentUser;
              if (!user) {
                  loading.value = false;
                  return;
              }

              const docRef = doc(db, 'businessAssessments', user.uid);
              const docSnap = await getDoc(docRef);

              if (docSnap.exists()) {
                  goalsData.value = docSnap.data();
                  renderChart();
              }

              loading.value = false;
          } catch (error) {
              console.error('Error fetching goals data:', error);
              loading.value = false;
          }
      };

      const renderChart = () => {
          if (!goalsData.value) return;

          const ctx = document.createElement('canvas').getContext('2d');
          chart.value = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Current Revenue', 'Target Revenue'],
                  datasets: [{
                      label: 'Revenue Comparison',
                      data: [
                          goalsData.value.currentRevenue, 
                          goalsData.value.targetRevenue
                      ],
                      backgroundColor: [
                          'rgba(75, 192, 192, 0.6)',
                          'rgba(54, 162, 235, 0.6)'
                      ],
                      borderColor: [
                          'rgba(75, 192, 192, 1)',
                          'rgba(54, 162, 235, 1)'
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  responsive: true,
                  scales: {
                      y: {
                          beginAtZero: true,
                          title: {
                              display: true,
                              text: 'Revenue (₱)'
                          }
                      }
                  },
                  plugins: {
                      title: {
                          display: true,
                          text: 'Revenue Progression'
                      }
                  }
              }
          });
      };

      onMounted(fetchGoalsData);

      return {
          loading,
          goalsData,
          formatCurrency,
          revenueProgressPercentage,
          fetchGoalsData
      };
  }
};
</script>