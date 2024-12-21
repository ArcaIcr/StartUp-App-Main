<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Strategic Business Insights</h2>
        
        <div v-if="loading" class="flex justify-center items-center">
            <p class="text-gray-500">Loading insights...</p>
        </div>
        
        <div v-else-if="reports.length === 0" class="text-center text-gray-500">
            <p>No strategic insights available. Complete a business assessment to generate insights.</p>
            <router-link 
                to="/assessment" 
                class="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Complete Assessment
            </router-link>
        </div>
        
        <div v-else class="space-y-4">
            <div 
                v-for="(report, index) in reports" 
                :key="index" 
                class="border-b pb-4 last:border-b-0"
            >
                <h3 class="font-medium text-gray-800">{{ report.title }}</h3>
                <p class="text-sm text-gray-600 mt-2">{{ report.summary }}</p>
                
                <div class="mt-2 flex justify-between items-center">
                    <span class="text-xs text-gray-500">{{ formatDate(report.createdAt) }}</span>
                    <button 
                        @click="viewFullReport(report)" 
                        class="text-sm text-blue-600 hover:text-blue-800"
                    >
                        View Full Insights
                    </button>
                </div>

                <div v-if="report.details" class="mt-4 bg-blue-50 p-3 rounded-md">
                    <div v-if="report.details.opportunities && report.details.opportunities.length">
                        <h4 class="text-sm font-semibold text-gray-700 mb-2">Key Opportunities</h4>
                        <ul class="list-disc list-inside text-xs text-gray-600">
                            <li v-for="(opportunity, idx) in report.details.opportunities.slice(0, 2)" :key="idx">
                                {{ opportunity }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="report.details.overallScore" class="mt-2">
                        <span class="text-xs text-gray-500">Overall Business Score: 
                            <span :class="{
                                'text-green-600': report.details.overallScore >= 70,
                                'text-yellow-600': report.details.overallScore >= 50 && report.details.overallScore < 70,
                                'text-red-600': report.details.overallScore < 50
                            }">
                                {{ report.details.overallScore }}%
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default {
    name: 'AIReports',
    setup() {
        const reports = ref([]);
        const loading = ref(true);

        const formatDate = (date) => {
            return date ? new Date(date).toLocaleDateString() : 'N/A';
        };

        const fetchAIReports = async () => {
            try {
                // Ensure user is authenticated
                const user = auth.currentUser;
                if (!user) {
                    loading.value = false;
                    return;
                }

                // Reference to the main business assessment document
                const businessAssessmentRef = doc(db, 'businessAssessments', user.uid);
                const businessAssessmentSnap = await getDoc(businessAssessmentRef);

                if (businessAssessmentSnap.exists()) {
                    const businessAssessmentData = businessAssessmentSnap.data();

                    // Extract `strategic_insights` data
                    const strategicInsights = businessAssessmentData.strategic_insights;

                    if (strategicInsights) {
                        // Extract opportunities and recommendations from the `strategic_insights` object
                        const growthOpportunities = strategicInsights.growth_opportunities || [];
                        const strategicRecommendations = strategicInsights.strategic_recommendations || [];

                        // Only create reports if there are insights
                        if (growthOpportunities.length > 0 || strategicRecommendations.length > 0) {
                            reports.value = [
                                {
                                    title: 'Strategic Business Insights',
                                    summary: 'Business strategy analysis',
                                    createdAt: new Date(),
                                    details: {
                                        opportunities: growthOpportunities,
                                        recommendations: strategicRecommendations,
                                        summary: 'Strategic insights for business growth',
                                        overallScore: businessAssessmentData.businessAnalysis?.overallScore || null
                                    }
                                }
                            ];
                        } else {
                            reports.value = [];
                        }
                    } else {
                        reports.value = [];
                    }
                } else {
                    // No business assessment document exists
                    reports.value = [];
                }

                loading.value = false;
            } catch (error) {
                console.error('Error fetching AI reports:', error);
                loading.value = false;
                reports.value = [];
            }
        };

        const viewFullReport = (report) => {
            // Emit the full report details to the parent component
            this.$emit('view-strategic-insights', report.details);
        };

        onMounted(fetchAIReports);

        return {
            reports,
            loading,
            formatDate,
            fetchAIReports,
            viewFullReport
        };
    }
};
</script>
