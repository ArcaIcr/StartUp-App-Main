<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
      <Header />
      <StatsCards />
      <TrendChart />
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        <AIReports @view-strategic-insights="openStrategicInsightsModal" />
        <GoalsChart />
      </div>

      <!-- Strategic Insights Modal -->
      <Dialog 
        v-model:visible="showStrategicInsightsModal" 
        header="Strategic Business Insights" 
        :style="{ width: '50vw' }" 
        :modal="true"
      >
        <div v-if="selectedInsights" class="space-y-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Overview</h3>
            <p class="text-gray-600">{{ selectedInsights.summary }}</p>
          </div>

          <div v-if="selectedInsights.details.opportunities && selectedInsights.details.opportunities.length" class="bg-green-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Key Opportunities</h3>
            <ul class="list-disc list-inside text-gray-600">
              <li v-for="(opportunity, idx) in selectedInsights.details.opportunities" :key="idx">
                {{ opportunity }}
              </li>
            </ul>
          </div>

          <div v-if="selectedInsights.details.recommendations && selectedInsights.details.recommendations.length" class="bg-yellow-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Strategic Recommendations</h3>
            <ul class="list-disc list-inside text-gray-600">
              <li v-for="(recommendation, idx) in selectedInsights.details.recommendations" :key="idx">
                {{ recommendation }}
              </li>
            </ul>
          </div>

          <div v-if="selectedInsights.details.overallScore" class="text-center">
            <span class="text-sm text-gray-500">Overall Business Score: 
              <span :class="{
                'text-green-600': selectedInsights.details.overallScore >= 70,
                'text-yellow-600': selectedInsights.details.overallScore >= 50 && selectedInsights.details.overallScore < 70,
                'text-red-600': selectedInsights.details.overallScore < 50
              }">
                {{ selectedInsights.details.overallScore }}%
              </span>
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

    return {
      showStrategicInsightsModal,
      selectedInsights,
      openStrategicInsightsModal
    };
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>