<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Industry Insights</h2>
    
    <div v-if="loading" class="flex justify-center items-center h-48">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-center text-red-600 p-4">
      {{ error }}
    </div>

    <div v-else class="space-y-6">
      <!-- Industry Overview -->
      <div>
        <h3 class="text-md font-medium text-gray-700 mb-2">{{ industry }} Overview</h3>
        <p class="text-sm text-gray-600">{{ industryOverview }}</p>
      </div>

      <!-- Market Position -->
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(metric, index) in marketMetrics"
          :key="index"
          class="p-3 rounded-lg"
          :class="getMetricClass(metric.performance)"
        >
          <h4 class="text-sm font-medium mb-1">{{ metric.name }}</h4>
          <div class="flex items-center space-x-1">
            <span class="text-lg font-bold">{{ metric.value }}</span>
            <span class="text-sm" :class="getPerformanceClass(metric.performance)">
              {{ metric.performance > 0 ? '↑' : '↓' }} {{ Math.abs(metric.performance) }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Growth Opportunities -->
      <div>
        <h3 class="text-md font-medium text-gray-700 mb-2">Growth Opportunities</h3>
        <ul class="space-y-2">
          <li
            v-for="(opportunity, index) in opportunities"
            :key="index"
            class="flex items-start space-x-2 text-sm"
          >
            <span class="text-green-500">•</span>
            <span class="text-gray-600">{{ opportunity }}</span>
          </li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div class="mt-4">
        <h3 class="text-md font-medium text-gray-700 mb-2">Recommendations</h3>
        <div class="space-y-2">
          <div
            v-for="(rec, index) in recommendations"
            :key="index"
            class="p-3 bg-blue-50 rounded-lg"
          >
            <p class="text-sm text-blue-800">{{ rec }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getIndustryInsights, getMarketAnalysis } from "@/services/api";

export default {
  setup() {
    const loading = ref(true);
    const industry = ref("");
    const industryOverview = ref("");
    const marketMetrics = ref([]);
    const opportunities = ref([]);
    const recommendations = ref([]);
    const error = ref(null);

    const getMetricClass = (performance) => {
      if (performance > 0) return "bg-green-50";
      if (performance < 0) return "bg-red-50";
      return "bg-gray-50";
    };

    const getPerformanceClass = (performance) => {
      if (performance > 0) return "text-green-600";
      if (performance < 0) return "text-red-600";
      return "text-gray-600";
    };

    const loadInsightsData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const assessmentDoc = await getDoc(doc(db, "businessAssessments", userId));
        if (assessmentDoc.exists()) {
          const data = assessmentDoc.data();
          industry.value = data.industry;

          // Get insights from API
          const [insightsData, marketData] = await Promise.all([
            getIndustryInsights(data.industry, data.businessScale),
            getMarketAnalysis(data.industry, data.location)
          ]);

          // Update UI with API data
          industryOverview.value = insightsData.overview;
          opportunities.value = insightsData.opportunities;
          recommendations.value = insightsData.recommendations;

          // Format market metrics
          marketMetrics.value = [
            {
              name: "Market Growth",
              value: `${marketData.marketGrowth}%`,
              performance: marketData.growthTrend
            },
            {
              name: "Profit Margin",
              value: `${data.currentProfitMargin}%`,
              performance: calculatePerformance(
                data.currentProfitMargin,
                data.targetProfitMargin
              )
            },
            {
              name: "Market Share",
              value: `${marketData.marketShare}%`,
              performance: marketData.shareTrend
            }
          ];
        }
      } catch (err) {
        console.error("Error loading insights data:", err);
        error.value = "Failed to load industry insights. Please try again later.";
        // Fallback to static data if API fails
        loadFallbackData();
      } finally {
        loading.value = false;
      }
    };

    const calculatePerformance = (current, target) => {
      if (!current || !target) return 0;
      return Math.round(((target - current) / current) * 100);
    };

    const loadFallbackData = () => {
      // Fallback data in case API fails
      industryOverview.value =
        "Industry overview is currently unavailable. Please check back later.";
      opportunities.value = [
        "Expand your market reach.",
        "Focus on customer retention.",
        "Streamline operations for better margins."
      ];
      recommendations.value = [
        "Consider investing in automation.",
        "Enhance your digital presence.",
        "Explore new growth channels."
      ];
      marketMetrics.value = [
        {
          name: "Market Growth",
          value: "7.8%",
          performance: 3
        },
        {
          name: "Profit Margin",
          value: "12%",
          performance: 5
        },
        {
          name: "Market Share",
          value: "2.5%",
          performance: -1
        }
      ];
    };

    onMounted(() => {
      loadInsightsData();
    });

    return {
      loading,
      error,
      industry,
      industryOverview,
      marketMetrics,
      opportunities,
      recommendations,
      getMetricClass,
      getPerformanceClass
    };
  }
};
</script>
