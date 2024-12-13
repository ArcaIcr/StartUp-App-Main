&lt;template&gt;
  &lt;div class="bg-white p-6 rounded-lg shadow-md"&gt;
    &lt;h2 class="text-lg font-semibold mb-4"&gt;Industry Insights&lt;/h2&gt;
    
    &lt;div v-if="loading" class="flex justify-center items-center h-48"&gt;
      &lt;div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"&gt;&lt;/div&gt;
    &lt;/div&gt;

    &lt;div v-else-if="error" class="text-center text-red-600 p-4"&gt;
      {{ error }}
    &lt;/div&gt;

    &lt;div v-else class="space-y-6"&gt;
      &lt;!-- Industry Overview --&gt;
      &lt;div&gt;
        &lt;h3 class="text-md font-medium text-gray-700 mb-2"&gt;{{ industry }} Overview&lt;/h3&gt;
        &lt;p class="text-sm text-gray-600"&gt;{{ industryOverview }}&lt;/p&gt;
      &lt;/div&gt;

      &lt;!-- Market Position --&gt;
      &lt;div class="grid grid-cols-3 gap-4"&gt;
        &lt;div v-for="(metric, index) in marketMetrics" :key="index" 
             class="p-3 rounded-lg"
             :class="getMetricClass(metric.performance)"&gt;
          &lt;h4 class="text-sm font-medium mb-1"&gt;{{ metric.name }}&lt;/h4&gt;
          &lt;div class="flex items-center space-x-1"&gt;
            &lt;span class="text-lg font-bold"&gt;{{ metric.value }}&lt;/span&gt;
            &lt;span class="text-sm" :class="getPerformanceClass(metric.performance)"&gt;
              {{ metric.performance &gt; 0 ? '↑' : '↓' }} {{ Math.abs(metric.performance) }}%
            &lt;/span&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;

      &lt;!-- Growth Opportunities --&gt;
      &lt;div&gt;
        &lt;h3 class="text-md font-medium text-gray-700 mb-2"&gt;Growth Opportunities&lt;/h3&gt;
        &lt;ul class="space-y-2"&gt;
          &lt;li v-for="(opportunity, index) in opportunities" :key="index" 
              class="flex items-start space-x-2 text-sm"&gt;
            &lt;span class="text-green-500"&gt;•&lt;/span&gt;
            &lt;span class="text-gray-600"&gt;{{ opportunity }}&lt;/span&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;

      &lt;!-- Recommendations --&gt;
      &lt;div class="mt-4"&gt;
        &lt;h3 class="text-md font-medium text-gray-700 mb-2"&gt;Recommendations&lt;/h3&gt;
        &lt;div class="space-y-2"&gt;
          &lt;div v-for="(rec, index) in recommendations" :key="index" 
               class="p-3 bg-blue-50 rounded-lg"&gt;
            &lt;p class="text-sm text-blue-800"&gt;{{ rec }}&lt;/p&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getIndustryInsights, getMarketAnalysis } from '@/services/api';

export default {
  setup() {
    const loading = ref(true);
    const industry = ref('');
    const industryOverview = ref('');
    const marketMetrics = ref([]);
    const opportunities = ref([]);
    const recommendations = ref([]);
    const error = ref(null);

    const getMetricClass = (performance) => {
      if (performance > 0) return 'bg-green-50';
      if (performance < 0) return 'bg-red-50';
      return 'bg-gray-50';
    };

    const getPerformanceClass = (performance) => {
      if (performance > 0) return 'text-green-600';
      if (performance < 0) return 'text-red-600';
      return 'text-gray-600';
    };

    const loadInsightsData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const assessmentDoc = await getDoc(doc(db, 'businessAssessments', userId));
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
              name: 'Market Growth',
              value: `${marketData.marketGrowth}%`,
              performance: marketData.growthTrend
            },
            {
              name: 'Profit Margin',
              value: `${data.currentProfitMargin}%`,
              performance: calculatePerformance(data.currentProfitMargin, data.targetProfitMargin)
            },
            {
              name: 'Market Share',
              value: `${marketData.marketShare}%`,
              performance: marketData.shareTrend
            }
          ];
        }
      } catch (err) {
        console.error('Error loading insights data:', err);
        error.value = 'Failed to load industry insights. Please try again later.';
        // Fallback to static data if API fails
        loadFallbackData(data);
      } finally {
        loading.value = false;
      }
    };

    const calculatePerformance = (current, target) => {
      if (!current || !target) return 0;
      return Math.round(((target - current) / current) * 100);
    };

    const loadFallbackData = (data) => {
      // Fallback data in case API fails
      industryOverview.value = `${data.industry} industry overview - Currently experiencing significant growth and digital transformation.`;
      opportunities.value = [
        'Digital transformation initiatives',
        'Market expansion opportunities',
        'Process automation potential'
      ];
      recommendations.value = [
        'Focus on digital presence',
        'Invest in employee training',
        'Optimize operations'
      ];
      marketMetrics.value = [
        {
          name: 'Market Growth',
          value: '8.5%',
          performance: 5
        },
        {
          name: 'Profit Margin',
          value: `${data.currentProfitMargin}%`,
          performance: calculatePerformance(data.currentProfitMargin, data.targetProfitMargin)
        },
        {
          name: 'Market Share',
          value: '3.2%',
          performance: 1.5
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
&lt;/script&gt;
