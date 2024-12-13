&lt;template&gt;
  &lt;div class="bg-white p-6 rounded-lg shadow-md"&gt;
    &lt;h2 class="text-lg font-semibold mb-4"&gt;Business Challenges Analysis&lt;/h2&gt;
    
    &lt;div v-if="loading" class="flex justify-center items-center h-48"&gt;
      &lt;div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"&gt;&lt;/div&gt;
    &lt;/div&gt;

    &lt;div v-else-if="error" class="text-center text-red-600 p-4"&gt;
      {{ error }}
    &lt;/div&gt;

    &lt;div v-else class="space-y-4"&gt;
      &lt;div v-for="(challenge, index) in challenges" :key="index" class="p-4 rounded-lg" :class="getPriorityClass(challenge.priority)"&gt;
        &lt;div class="flex items-start justify-between"&gt;
          &lt;div&gt;
            &lt;h3 class="font-medium"&gt;{{ challenge.name }}&lt;/h3&gt;
            &lt;p class="text-sm text-gray-600 mt-1"&gt;{{ challenge.description }}&lt;/p&gt;
          &lt;/div&gt;
          &lt;span class="px-2 py-1 text-xs rounded-full" :class="getPriorityBadgeClass(challenge.priority)"&gt;
            {{ challenge.priority }}
          &lt;/span&gt;
        &lt;/div&gt;
        &lt;div class="mt-3"&gt;
          &lt;h4 class="text-sm font-medium mb-2"&gt;Recommended Actions:&lt;/h4&gt;
          &lt;ul class="list-disc list-inside text-sm text-gray-600 space-y-1"&gt;
            &lt;li v-for="(action, actionIndex) in challenge.actions" :key="actionIndex"&gt;
              {{ action }}
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getRecommendations } from '@/services/api';

export default {
  setup() {
    const challenges = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const getPriorityClass = (priority) => {
      const classes = {
        High: 'bg-red-50',
        Medium: 'bg-yellow-50',
        Low: 'bg-green-50'
      };
      return classes[priority] || 'bg-gray-50';
    };

    const getPriorityBadgeClass = (priority) => {
      const classes = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-green-100 text-green-800'
      };
      return classes[priority] || 'bg-gray-100 text-gray-800';
    };

    const loadChallengesData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const assessmentDoc = await getDoc(doc(db, 'businessAssessments', userId));
        if (assessmentDoc.exists()) {
          const data = assessmentDoc.data();
          
          // Get recommendations from API
          const recommendationsData = await getRecommendations({
            industry: data.industry,
            businessScale: data.businessScale,
            challenges: data.challenges,
            currentRevenue: data.currentRevenue,
            targetRevenue: data.targetRevenue,
            currentProfitMargin: data.currentProfitMargin,
            targetProfitMargin: data.targetProfitMargin,
            location: data.location
          });

          // Transform API data into challenges format
          challenges.value = recommendationsData.challenges.map(challenge => ({
            name: challenge.name,
            priority: challenge.priority,
            description: challenge.description,
            actions: challenge.recommendedActions
          }));
        }
      } catch (err) {
        console.error('Error loading challenges data:', err);
        error.value = 'Failed to load challenges data. Please try again later.';
        // Load fallback data if API fails
        loadFallbackData();
      } finally {
        loading.value = false;
      }
    };

    const loadFallbackData = () => {
      challenges.value = [
        {
          name: 'Market Competition',
          priority: 'High',
          description: 'Increasing competition in the market requires strategic positioning',
          actions: [
            'Conduct competitor analysis',
            'Develop unique value proposition',
            'Focus on customer retention'
          ]
        },
        {
          name: 'Operational Efficiency',
          priority: 'Medium',
          description: 'Streamlining operations can improve profit margins',
          actions: [
            'Implement automation tools',
            'Optimize business processes',
            'Train staff on efficiency measures'
          ]
        },
        {
          name: 'Digital Presence',
          priority: 'Medium',
          description: 'Enhanced online presence needed for market growth',
          actions: [
            'Develop digital marketing strategy',
            'Improve website and social media',
            'Implement analytics tracking'
          ]
        }
      ];
    };

    onMounted(() => {
      loadChallengesData();
    });

    return {
      challenges,
      loading,
      error,
      getPriorityClass,
      getPriorityBadgeClass
    };
  }
};
&lt;/script&gt;
