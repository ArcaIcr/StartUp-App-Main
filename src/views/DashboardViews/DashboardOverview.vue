<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-y-auto">
      <Header />
      
      <div class="p-4 md:p-6 lg:p-8 space-y-6">
        <StatsCards />
        
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-3">
            <TrendChart />
          </div>
          
          <div class="xl:col-span-2">
            <AIReports @view-strategic-insights="openStrategicInsightsModal" />
          </div>
          
          <div class="xl:col-span-1">
            <GoalsChart />
          </div>
        </div>
      </div>

      <!-- Strategic Insights Modal with Enhanced Design -->
      <Dialog 
        v-model:visible="showStrategicInsightsModal" 
        header="Strategic Business Insights" 
        :style="{ width: '60vw', maxWidth: '800px' }" 
        :modal="true"
        :closable="true"
        class="strategic-insights-modal"
      >
        <template #header>
          <div class="flex items-center justify-between w-full">
            <h2 class="text-2xl font-bold text-gray-800">Strategic Business Insights</h2>
            <div class="flex items-center space-x-2">
              <button 
                @click="downloadInsights" 
                class="text-gray-500 hover:text-blue-600 transition-colors"
                title="Download Insights"
              >
                <i class="fas fa-download"></i>
              </button>
              <button 
                @click="printInsights" 
                class="text-gray-500 hover:text-blue-600 transition-colors"
                title="Print Insights"
              >
                <i class="fas fa-print"></i>
              </button>
            </div>
          </div>
        </template>
        
        <div v-if="selectedInsights" class="space-y-6">
          <div class="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Overview</h3>
            <p class="text-gray-600 leading-relaxed">{{ selectedInsights.summary }}</p>
          </div>

          <div 
            v-if="selectedInsights.details.opportunities && selectedInsights.details.opportunities.length" 
            class="bg-green-50 p-6 rounded-xl border-l-4 border-green-500"
          >
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Key Opportunities</h3>
            <ul class="space-y-2 text-gray-600">
              <li 
                v-for="(opportunity, idx) in selectedInsights.details.opportunities" 
                :key="idx" 
                class="flex items-start"
              >
                <span class="mr-2 text-green-600">➤</span>
                {{ opportunity }}
              </li>
            </ul>
          </div>

          <div 
            v-if="selectedInsights.details.recommendations && selectedInsights.details.recommendations.length" 
            class="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500"
          >
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Strategic Recommendations</h3>
            <ul class="space-y-2 text-gray-600">
              <li 
                v-for="(recommendation, idx) in selectedInsights.details.recommendations" 
                :key="idx" 
                class="flex items-start"
              >
                <span class="mr-2 text-yellow-600">➤</span>
                {{ recommendation }}
              </li>
            </ul>
          </div>

          <div 
            v-if="selectedInsights.details.overallScore" 
            class="flex justify-center items-center bg-gray-100 p-4 rounded-xl"
          >
            <span class="text-lg text-gray-700 mr-4">Overall Business Score:</span>
            <span 
              class="px-4 py-2 rounded-full text-lg font-bold"
              :class="{
                'bg-green-100 text-green-800': selectedInsights.details.overallScore >= 70,
                'bg-yellow-100 text-yellow-800': selectedInsights.details.overallScore >= 50 && selectedInsights.details.overallScore < 70,
                'bg-red-100 text-red-800': selectedInsights.details.overallScore < 50
              }"
            >
              {{ selectedInsights.details.overallScore }}%
            </span>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// Import components
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Header from "@/components/dashboard/Header.vue";
import StatsCards from "@/components/dashboard/Cards/StatCard.vue";
import TrendChart from "@/components/dashboard/Charts/TrendChart.vue";
import AIReports from "@/components/dashboard/Cards/AIReports.vue";
import GoalsChart from "@/components/dashboard/Charts/GoalsChart.vue";

// Import PrimeVue Dialog
import Dialog from 'primevue/dialog';

// Define the component
export default {
  name: 'DashboardOverview',
  components: {
    Sidebar,
    Header,
    StatsCards,
    TrendChart,
    AIReports,
    Dialog,
    GoalsChart,
  },
  setup() {
    const showStrategicInsightsModal = ref(false);
    const selectedInsights = ref(null);

    const openStrategicInsightsModal = (insights) => {
      selectedInsights.value = insights;
      showStrategicInsightsModal.value = true;
    };

    const downloadInsights = () => {
      // Placeholder for download functionality
      console.log('Downloading insights...');
    };

    const printInsights = () => {
      // Placeholder for print functionality
      window.print();
    };

    return {
      showStrategicInsightsModal,
      selectedInsights,
      openStrategicInsightsModal,
      downloadInsights,
      printInsights
    };
  }
};
</script>