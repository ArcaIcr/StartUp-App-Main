<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    <div
      v-for="card in stats"
      :key="card.title"
      class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg stats-card"
      :title="card.title"
    >
      <h2 class="text-lg font-semibold text-gray-700">{{ card.title }}</h2>
      <p class="mt-2 text-2xl font-bold">
        <span :class="card.trend > 0 ? 'text-green-600' : card.trend < 0 ? 'text-red-600' : 'text-black'">
          {{ formatValue(card.value, card.format) }}
        </span>
      </p>
      <p v-if="card.trend !== undefined" class="mt-1 text-sm">
        <span :class="card.trend > 0 ? 'text-green-600' : 'text-red-600'">
          {{ card.trend > 0 ? '↑' : '↓' }} {{ Math.abs(card.trend) }}%
        </span>
        vs target
      </p>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default {
  setup() {
    const stats = ref([
      { 
        title: "Current Revenue",
        value: 0,
        format: 'currency',
        trend: 0
      },
      { 
        title: "Profit Margin",
        value: 0,
        format: 'percentage',
        trend: 0
      },
      { 
        title: "Business Scale",
        value: '',
        format: 'text'
      },
      { 
        title: "Industry",
        value: '',
        format: 'text'
      }
    ]);

    const formatValue = (value, format) => {
      switch (format) {
        case 'currency':
          return new Intl.NumberFormat('en-PH', { 
            style: 'currency', 
            currency: 'PHP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(value);
        case 'percentage':
          return `${value}%`;
        default:
          return value;
      }
    };

    const loadAssessmentData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const assessmentDoc = await getDoc(doc(db, 'businessAssessments', userId));
        if (assessmentDoc.exists()) {
          const data = assessmentDoc.data();
          
          // Update revenue stat
          stats.value[0].value = parseFloat(data.currentRevenue) || 0;
          stats.value[0].trend = calculateTrend(
            parseFloat(data.currentRevenue),
            parseFloat(data.targetRevenue)
          );

          // Update profit margin stat
          stats.value[1].value = parseFloat(data.currentProfitMargin) || 0;
          stats.value[1].trend = calculateTrend(
            parseFloat(data.currentProfitMargin),
            parseFloat(data.targetProfitMargin)
          );

          // Update business scale
          stats.value[2].value = formatBusinessScale(data.businessScale);

          // Update industry
          stats.value[3].value = data.industry;
        }
      } catch (error) {
        console.error('Error loading assessment data:', error);
      }
    };

    const calculateTrend = (current, target) => {
      if (!current || !target) return 0;
      return Math.round(((target - current) / current) * 100);
    };

    const formatBusinessScale = (scale) => {
      const scales = {
        'micro': 'Micro',
        'small': 'Small',
        'medium': 'Medium',
        'large': 'Large'
      };
      return scales[scale] || scale;
    };

    onMounted(() => {
      loadAssessmentData();
    });

    return {
      stats,
      formatValue
    };
  }
};
</script>

<style scoped>
.stats-card {
  transition: transform 0.2s ease;
}
.stats-card:hover {
  transform: scale(1.05);
}
</style>