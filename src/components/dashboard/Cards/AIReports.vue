<template>
    <div class="bg-white p-8 rounded-xl shadow-lg"> <!-- Enlarged padding and enhanced shadow -->
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Strategic Business Insights</h2>
            <button 
                @click="fetchAIReports" 
                class="text-gray-500 hover:text-blue-600 transition-colors"
            >
                <i class="fas fa-sync"></i>
            </button>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-pulse text-center">
                <p class="text-gray-500 text-lg">Loading strategic insights...</p>
            </div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="!reports.length" class="text-center py-12">
            <div class="bg-blue-50 p-6 rounded-lg">
                <p class="text-gray-600 mb-4">No strategic insights available. Complete a business assessment to generate insights.</p>
                <router-link 
                    to="/assessment" 
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
                >
                    Complete Assessment
                </router-link>
            </div>
        </div>
        
        <!-- Insights Reports -->
        <div v-else class="space-y-6">
            <div 
                v-for="(report, index) in reports" 
                :key="index" 
                class="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all"
            >
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold text-gray-800">{{ report.title }}</h3>
                    <span class="text-sm text-gray-500">{{ formatDate(report.createdAt) }}</span>
                </div>
                
                <p class="text-gray-600 mb-4">{{ report.summary }}</p>
                
                <div v-if="report.details" class="space-y-4">
                    <!-- Key Opportunities -->
                    <div v-if="report.details.opportunities?.length" class="bg-white p-4 rounded-lg">
                        <h4 class="text-md font-semibold text-gray-700 mb-3">Key Opportunities</h4>
                        <ul class="list-disc list-inside text-sm text-gray-600 space-y-2">
                            <li v-for="(opportunity, idx) in report.details.opportunities.slice(0, 3)" :key="idx">
                                {{ opportunity }}
                            </li>
                        </ul>
                    </div>
                    
                    <!-- Business Score -->
                    <div class="flex justify-between items-center">
                        <div v-if="report.details.overallScore !== null" class="flex items-center">
                            <span class="text-sm text-gray-500 mr-2">Business Score:</span>
                            <span 
                                class="px-3 py-1 rounded-full text-sm font-semibold"
                                :class="{
                                    'bg-green-100 text-green-800': report.details.overallScore >= 70,
                                    'bg-yellow-100 text-yellow-800': report.details.overallScore >= 50 && report.details.overallScore < 70,
                                    'bg-red-100 text-red-800': report.details.overallScore < 50
                                }"
                            >
                                {{ report.details.overallScore || 'N/A' }}%
                            </span>
                        </div>
                        
                        <!-- View Full Insights Button -->
                        <button 
                            @click="viewFullReport(report)" 
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            View Full Insights
                        </button>
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
    emits: ['view-strategic-insights'],
    setup(_, { emit }) {
        const reports = ref([]);
        const loading = ref(true);

        // Format date into a readable format
        const formatDate = (date) => {
            return date ? new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : 'N/A';
        };

        // Fetch strategic insights reports
        const fetchAIReports = async () => {
            loading.value = true;
            try {
                const user = auth.currentUser;

                if (!user) {
                    reports.value = [];
                    loading.value = false;
                    return;
                }

                const docRef = doc(db, 'businessAssessments', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    
                    // Add comprehensive logging
                    console.log('Full document data:', data);
                    console.log('businessAnalysis:', data.businessAnalysis);

                    // Multiple layers of safe navigation
                    const insights = data.businessAnalysis?.strategic_insights || {};
                    const opportunities = insights.growth_opportunities || [];
                    const recommendations = insights.strategic_recommendations || [];

                    // Detailed logging of extracted data
                    console.log('Opportunities:', opportunities);
                    console.log('Recommendations:', recommendations);

                    // Create report if insights are available
                    reports.value = opportunities.length || recommendations.length
                        ? [{
                            title: 'Strategic Business Insights',
                            summary: 'Comprehensive business strategy analysis and growth opportunities.',
                            createdAt: new Date(),
                            details: {
                                opportunities,
                                recommendations,
                                overallScore: data.businessAnalysis?.overallScore || null
                            }
                        }]
                        : [];
                } else {
                    console.warn('No document found for user:', user.uid);
                    reports.value = [];
                }
            } catch (error) {
                console.error('Error fetching AI reports:', error);
                // Log the full error object for more details
                console.error('Full error object:', JSON.stringify(error, null, 2));
                reports.value = [];
            } finally {
                loading.value = false;
            }
        };

        // Emit full report details
        const viewFullReport = (report) => {
            emit('view-strategic-insights', report.details);
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

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
