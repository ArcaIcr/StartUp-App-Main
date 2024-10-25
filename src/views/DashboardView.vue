<script>
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Header from "@/components/dashboard/Header.vue";
import StatsCards from "@/components/dashboard/Cards/StatCard.vue";
import TrendChart from "@/components/dashboard/Charts/TrendChart.vue";
import SalesChart from "@/components/dashboard/Charts/SalesChart.vue";
import TransactionsChart from "@/components/dashboard/Charts/TransactionsChart.vue";

export default {
  components: {
    Sidebar,
    Header,
    StatsCards,
    TrendChart,
    SalesChart,
    TransactionsChart,
  },
};
</script>

<template>
    <div class="flex h-screen">
        <Sidebar />
        <div class="flex-1 flex flex-col bg-gray-100">
            <Header />
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                <TrendChart />
                <SalesChart />
                <TransactionsChart />
                <!-- Add similar components for SalesChart and TransactionsChart -->
            </div>
        </div>
    </div>
  </template>
