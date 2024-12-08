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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Navbar from "@/components/navbar/Navbar.vue";

export default {
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const errors = ref({});

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
      'Transportation',
      'Entertainment',
      'Professional Services',
      'Other'
    ];

    const formData = ref({
      businessName: '',
      industry: '',
      businessScale: '',
      location: '',
      currentRevenue: '',
      targetRevenue: '',
      currentProfitMargin: '',
      targetProfitMargin: '',
      businessGoals: '',
      challenges: ''
    });

    const validateForm = () => {
      errors.value = {};
      let isValid = true;

      // Basic Information Validation
      if (!formData.value.businessName.trim()) {
        errors.value.businessName = 'Business name is required';
        isValid = false;
      }

      if (!formData.value.industry) {
        errors.value.industry = 'Please select an industry';
        isValid = false;
      }

      if (!formData.value.businessScale) {
        errors.value.businessScale = 'Please select business scale';
        isValid = false;
      }

      if (!formData.value.location.trim()) {
        errors.value.location = 'Location is required';
        isValid = false;
      }

      // Financial Information Validation
      if (!formData.value.currentRevenue || formData.value.currentRevenue < 0) {
        errors.value.currentRevenue = 'Please enter valid current revenue';
        isValid = false;
      }

      if (!formData.value.targetRevenue || formData.value.targetRevenue < 0) {
        errors.value.targetRevenue = 'Please enter valid target revenue';
        isValid = false;
      }

      if (!formData.value.currentProfitMargin || formData.value.currentProfitMargin < 0 || formData.value.currentProfitMargin > 100) {
        errors.value.currentProfitMargin = 'Please enter valid profit margin (0-100%)';
        isValid = false;
      }

      if (!formData.value.targetProfitMargin || formData.value.targetProfitMargin < 0 || formData.value.targetProfitMargin > 100) {
        errors.value.targetProfitMargin = 'Please enter valid target profit margin (0-100%)';
        isValid = false;
      }

      // Business Goals Validation
      if (!formData.value.businessGoals.trim()) {
        errors.value.businessGoals = 'Please describe your business goals';
        isValid = false;
      }

      if (!formData.value.challenges.trim()) {
        errors.value.challenges = 'Please describe your key challenges';
        isValid = false;
      }

      return isValid;
    };

    const submitAssessment = async () => {
      if (!validateForm()) return;

      loading.value = true;
      try {
        const userId = auth.currentUser.uid;
        await setDoc(doc(db, 'businessAssessments', userId), {
          ...formData.value,
          createdAt: new Date().toISOString(),
          userId
        });
        
        // Redirect to dashboard after successful submission
        router.push('/dashboard');
      } catch (error) {
        console.error('Error submitting assessment:', error);
        alert('An error occurred while submitting the assessment. Please try again.');
      } finally {
        loading.value = false;
      }
    };

    return {
      formData,
      industries,
      loading,
      errors,
      submitAssessment
    };
  }
};
</script>
