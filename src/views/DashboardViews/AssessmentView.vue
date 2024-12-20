<template>
  <Navbar />
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Business Assessment</h2>
        <p class="text-gray-600 mb-8">Help us understand your business better to provide tailored insights and recommendations.</p>

        <form @submit.prevent="submitAssessment" class="space-y-8">
          <!-- Basic Information Section -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-700">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Business Name</label>
                <input 
                  v-model="formData.businessName"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.businessName }"
                  required
                />
                <p v-if="errors.businessName" class="mt-1 text-sm text-red-600">{{ errors.businessName }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Industry</label>
                <select 
                  v-model="formData.industry"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.industry }"
                  required
                >
                  <option value="">Select Industry</option>
                  <option v-for="industry in industries" :key="industry" :value="industry">
                    {{ industry }}
                  </option>
                </select>
                <p v-if="errors.industry" class="mt-1 text-sm text-red-600">{{ errors.industry }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Business Scale</label>
                <select 
                  v-model="formData.businessScale"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.businessScale }"
                  required
                >
                  <option value="">Select Scale</option>
                  <option value="micro">Micro (1-9 employees)</option>
                  <option value="small">Small (10-49 employees)</option>
                  <option value="medium">Medium (50-249 employees)</option>
                  <option value="large">Large (250+ employees)</option>
                </select>
                <p v-if="errors.businessScale" class="mt-1 text-sm text-red-600">{{ errors.businessScale }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Location</label>
                <input 
                  v-model="formData.location"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.location }"
                  required
                />
                <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
              </div>
            </div>
          </div>

          <!-- Financial Information Section -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-700">Financial Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Current Annual Revenue (₱)</label>
                <input 
                  v-model="formData.currentRevenue"
                  type="number"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.currentRevenue }"
                  required
                />
                <p v-if="errors.currentRevenue" class="mt-1 text-sm text-red-600">{{ errors.currentRevenue }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Target Annual Revenue (₱)</label>
                <input 
                  v-model="formData.targetRevenue"
                  type="number"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.targetRevenue }"
                  required
                />
                <p v-if="errors.targetRevenue" class="mt-1 text-sm text-red-600">{{ errors.targetRevenue }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Current Profit Margin (%)</label>
                <input 
                  v-model="formData.currentProfitMargin"
                  type="number"
                  min="0"
                  max="100"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.currentProfitMargin }"
                  required
                />
                <p v-if="errors.currentProfitMargin" class="mt-1 text-sm text-red-600">{{ errors.currentProfitMargin }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Target Profit Margin (%)</label>
                <input 
                  v-model="formData.targetProfitMargin"
                  type="number"
                  min="0"
                  max="100"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.targetProfitMargin }"
                  required
                />
                <p v-if="errors.targetProfitMargin" class="mt-1 text-sm text-red-600">{{ errors.targetProfitMargin }}</p>
              </div>
            </div>
          </div>

          <!-- Business Goals Section -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-700">Business Goals</h3>
            <div>
              <label class="block text-sm font-medium text-gray-700">Primary Business Goals</label>
              <textarea 
                v-model="formData.businessGoals"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.businessGoals }"
                required
              ></textarea>
              <p v-if="errors.businessGoals" class="mt-1 text-sm text-red-600">{{ errors.businessGoals }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Key Challenges</label>
              <textarea 
                v-model="formData.challenges"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.challenges }"
                required
              ></textarea>
              <p v-if="errors.challenges" class="mt-1 text-sm text-red-600">{{ errors.challenges }}</p>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-4">
            <span v-if="loading" class="text-sm text-gray-500">Submitting...</span>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Submitting...' : 'Submit Assessment' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Navbar from "@/components/navbar/Navbar.vue";
import axios from 'axios';

export default {
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    const user = ref(auth.currentUser);
    const loading = ref(false);
    const errors = ref({});
    const formData = ref({
      businessName: '',
      industry: '',
      businessScale: '',
      location: '',
      currentRevenue: null,
      targetRevenue: null,
      currentProfitMargin: null,
      targetProfitMargin: null,
      businessGoals: '',
      challenges: ''
    });

    // New state for comprehensive analysis
    const analysisResult = ref(null);
    const analysisError = ref(null);
    const isAnalysisLoading = ref(false);

    const industries = [
      'Technology',
      'Retail',
      'Manufacturing',
      'Healthcare',
      'Financial Services',
      'Education',
      'Real Estate',
      'Construction',
      'Food & Beverage',
      'Agriculture',
      'Other'
    ];

    // Validate form before submission
    const validateForm = () => {
      let isValid = true;
      errors.value = {};

      // Basic Information Validation
      if (!formData.value.businessName) {
        errors.value.businessName = 'Business name is required';
        isValid = false;
      }

      if (!formData.value.industry) {
        errors.value.industry = 'Industry is required';
        isValid = false;
      }

      if (!formData.value.businessScale) {
        errors.value.businessScale = 'Business scale is required';
        isValid = false;
      }

      if (!formData.value.location) {
        errors.value.location = 'Location is required';
        isValid = false;
      }

      // Financial Information Validation
      if (!formData.value.currentRevenue || formData.value.currentRevenue <= 0) {
        errors.value.currentRevenue = 'Valid current revenue is required';
        isValid = false;
      }

      if (!formData.value.targetRevenue || formData.value.targetRevenue <= 0) {
        errors.value.targetRevenue = 'Valid target revenue is required';
        isValid = false;
      }

      if (formData.value.currentProfitMargin === null || formData.value.currentProfitMargin < 0 || formData.value.currentProfitMargin > 100) {
        errors.value.currentProfitMargin = 'Valid current profit margin is required (0-100%)';
        isValid = false;
      }

      if (formData.value.targetProfitMargin === null || formData.value.targetProfitMargin < 0 || formData.value.targetProfitMargin > 100) {
        errors.value.targetProfitMargin = 'Valid target profit margin is required (0-100%)';
        isValid = false;
      }

      // Business Goals Validation
      if (!formData.value.businessGoals || formData.value.businessGoals.trim().length < 10) {
        errors.value.businessGoals = 'Please provide more detailed business goals';
        isValid = false;
      }

      if (!formData.value.challenges || formData.value.challenges.trim().length < 10) {
        errors.value.challenges = 'Please describe your key challenges in more detail';
        isValid = false;
      }

      return isValid;
    };

    // Prepare business data for analysis
    const prepareBusinessAnalysisData = () => {
      return {
        businessName: formData.value.businessName,
        industry: formData.value.industry,
        businessScale: formData.value.businessScale,
        location: formData.value.location,
        currentAnnualRevenue: formData.value.currentRevenue,
        targetAnnualRevenue: formData.value.targetRevenue,
        currentProfitMargin: formData.value.currentProfitMargin,
        targetProfitMargin: formData.value.targetProfitMargin,
        businessGoals: formData.value.businessGoals,
        keyChallenges: formData.value.challenges
      };
    };

    // Perform comprehensive business analysis
    const performComprehensiveAnalysis = async (businessData) => {
      isAnalysisLoading.value = true;
      analysisError.value = null;

      try {
        const response = await axios.post(
          'https://business-report-worker.adriane-loquinte.workers.dev/business-analysis', 
          businessData, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        analysisResult.value = response.data;
        console.log('Business Analysis Result:', response.data);
        return response.data;
      } catch (err) {
        analysisError.value = err.response?.data?.error || 'An unexpected error occurred during business analysis';
        console.error('Business Analysis Error:', analysisError.value);
        throw err;
      } finally {
        isAnalysisLoading.value = false;
      }
    };

    // Submit assessment with business analysis
    const submitAssessment = async () => {
      // Validate form first
      if (!validateForm()) return;

      try {
        // Prepare business data for analysis
        const businessAnalysisData = prepareBusinessAnalysisData();
        
        // Perform comprehensive business analysis
        const analysisResult = await performComprehensiveAnalysis(businessAnalysisData);
        
        // Ensure user is authenticated
        if (!user.value) {
          throw new Error('User not authenticated');
        }

        // Combine original form data with analysis results
        const assessmentData = {
          ...formData.value,
          businessAnalysis: analysisResult,
          submittedAt: new Date().toISOString()
        };

        // Store in Firestore
        await setDoc(doc(db, 'businessAssessments', user.value.uid), assessmentData);

        // Update user document
        await setDoc(
          doc(db, 'users', user.value.uid), 
          { 
            assessmentCompleted: true,
            lastBusinessAnalysisScore: analysisResult.overallScore || null,
            lastAssessmentDate: new Date().toISOString()
          }, 
          { merge: true }
        );

        // Navigate to dashboard or results page
        router.push('/dashboard');
      } catch (error) {
        console.error('Assessment Submission Error:', error);
        errors.value.submission = 'Failed to submit assessment. Please try again.';
      }
    };

    // Lifecycle hook to load existing assessment if available
    onMounted(async () => {
      if (!user.value) return;

      try {
        const docRef = doc(db, 'businessAssessments', user.value.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const existingData = docSnap.data();
          // Populate form with existing data
          Object.keys(formData.value).forEach(key => {
            if (existingData[key] !== undefined) {
              formData.value[key] = existingData[key];
            }
          });
        }
      } catch (error) {
        console.error('Error loading existing assessment:', error);
      }
    });

    return {
      formData,
      industries,
      loading,
      errors,
      submitAssessment,
      analysisResult,
      analysisError,
      isAnalysisLoading
    };
  }
}
</script>