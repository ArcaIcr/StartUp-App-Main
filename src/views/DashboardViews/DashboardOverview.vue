<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
      <Header />
      <StatsCards />
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        <TrendChart />
        <SalesChart />
        <TransactionsChart class="lg:col-span-2 xl:col-span-3" />
      </div>
    </div>
  </div>
</template>

<script>
// Import components
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Header from "@/components/dashboard/Header.vue";
import StatsCards from "@/components/dashboard/Cards/StatCard.vue";
import TrendChart from "@/components/dashboard/Charts/TrendChart.vue";
import SalesChart from "@/components/dashboard/Charts/SalesChart.vue";
import TransactionsChart from "@/components/dashboard/Charts/TransactionsChart.vue";

// Commented out for future use
// import GoalsChart from "@/components/dashboard/Charts/GoalsChart.vue";
// import ChallengesChart from "@/components/dashboard/Charts/ChallengesChart.vue";
// import IndustryInsights from "@/components/dashboard/Charts/IndustryInsights.vue";

// Define the component
export default {
  name: 'DashboardOverview',
  components: {
    Sidebar,
    Header,
    StatsCards,
    TrendChart,
    SalesChart,
    TransactionsChart,
    // Commented out for future use
    // GoalsChart,
    // ChallengesChart,
    // IndustryInsights,
  },
  setup() {
    return {};
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
