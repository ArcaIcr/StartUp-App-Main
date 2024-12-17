<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold mb-4">Business Goals Progress</h2>
    <div class="space-y-4">
      <div v-for="(goal, index) in goals" :key="index" class="relative">
        <div class="flex justify-between mb-1">
          <span class="text-sm font-medium text-gray-700">{{ goal.name }}</span>
          <span class="text-sm font-medium text-gray-700">{{ goal.progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            :style="{ width: `${goal.progress}%` }"
            :class="{ 'bg-green-600': goal.progress >= 100 }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default {
  setup() {
    const goals = ref([]);

    const loadGoalsData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const assessmentDoc = await getDoc(doc(db, 'businessAssessments', userId));
        if (assessmentDoc.exists()) {
          const data = assessmentDoc.data();
          
          // Calculate progress based on current vs target metrics
          const revenueProgress = calculateProgress(
            parseFloat(data.currentRevenue),
            parseFloat(data.targetRevenue)
          );
          
          const profitProgress = calculateProgress(
            parseFloat(data.currentProfitMargin),
            parseFloat(data.targetProfitMargin)
          );

          goals.value = [
            {
              name: 'Revenue Target',
              progress: revenueProgress
            },
            {
              name: 'Profit Margin Target',
              progress: profitProgress
            }
          ];

          // Add business goals from assessment
          if (data.businessGoals && Array.isArray(data.businessGoals)) {
            data.businessGoals.forEach(goal => {
              goals.value.push({
                name: goal,
                progress: 0 // Initial progress for new goals
              });
            });
          }
        }
      } catch (error) {
        console.error('Error loading goals data:', error);
      }
    };

    const calculateProgress = (current, target) => {
      if (!current || !target) return 0;
      return Math.min(Math.round((current / target) * 100), 100);
    };

    onMounted(() => {
      loadGoalsData();
    });

    return {
      goals
    };
  }
};
</script>
