&lt;template&gt;
  &lt;div class="bg-white p-6 rounded-lg shadow-md"&gt;
    &lt;h2 class="text-lg font-semibold mb-4"&gt;Business Goals Progress&lt;/h2&gt;
    &lt;div class="space-y-4"&gt;
      &lt;div v-for="(goal, index) in goals" :key="index" class="relative"&gt;
        &lt;div class="flex justify-between mb-1"&gt;
          &lt;span class="text-sm font-medium text-gray-700"&gt;{{ goal.name }}&lt;/span&gt;
          &lt;span class="text-sm font-medium text-gray-700"&gt;{{ goal.progress }}%&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="w-full bg-gray-200 rounded-full h-2.5"&gt;
          &lt;div 
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            :style="{ width: `${goal.progress}%` }"
            :class="{ 'bg-green-600': goal.progress >= 100 }"
          &gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
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
&lt;/script&gt;
