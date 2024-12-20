<script setup>
import axios from "axios";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { auth } from '@/firebaseConfig';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'vue-toast-notification';
import html2pdf from 'html2pdf.js';

// Add a ref for loading state
const isLoading = ref(false);
const $toast = useToast();

// PrimeVue Components
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Sidebar from '../Sidebar.vue';

// Reactive variables to store form inputs
const formData = ref({
  current_revenue: null,
  previous_revenue: null,
  total_expenses: null,
  customer_base: null,
  months: 12,
  industry: null
});

// New state for comprehensive analysis
const analysisResult = ref(null);
const isResultsVisible = ref(false);
const errors = ref({});

const router = useRouter();

// List of available industries
const industries = [
  "SaaS", "Retail", "Tech", "Healthcare", "Finance", "Energy", 
  "Consumer Goods", "Utilities", "Industrial"
];

// Validate form inputs
const validateForm = () => {
  let isValid = true;
  errors.value = {};

  if (!formData.value.current_revenue || formData.value.current_revenue <= 0) {
    errors.value.current_revenue = 'Valid current revenue is required';
    isValid = false;
  }

  if (!formData.value.previous_revenue || formData.value.previous_revenue <= 0) {
    errors.value.previous_revenue = 'Valid previous revenue is required';
    isValid = false;
  }

  if (!formData.value.total_expenses || formData.value.total_expenses < 0) {
    errors.value.total_expenses = 'Valid total expenses are required';
    isValid = false;
  }

  if (!formData.value.customer_base || formData.value.customer_base < 0) {
    errors.value.customer_base = 'Valid customer base is required';
    isValid = false;
  }

  if (!formData.value.industry) {
    errors.value.industry = 'Industry selection is required';
    isValid = false;
  }

  if (!formData.value.months || formData.value.months <= 0) {
    errors.value.months = 'Valid number of months is required';
    isValid = false;
  }

  return isValid;
};

// Perform comprehensive business analysis
const performComprehensiveAnalysis = async (businessData) => {
  try {
    console.log('Sending data:', JSON.stringify(businessData, null, 2)); // Detailed logging
    isLoading.value = true;
    const response = await axios.post(
      'https://business-report-worker.adriane-loquinte.workers.dev/business-insights', 
      businessData, 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 60000 // 1 minute timeout
      }
    );

    console.log('Full API Response:', response);

    // Check if response data exists
    if (!response.data) {
      throw new Error('No data received from the API');
    }

    // Destructure the API response with fallback
    const { 
      metrics = {}, 
      growthOpportunities = 'No growth opportunities found', 
      strategicRecommendations = 'No recommendations available' 
    } = response.data;

    const result = {
      metrics: {
        revenueGrowth: metrics.revenueGrowth || 0,
        profitMargin: metrics.profitMargin || 0,
        customerGrowthRate: metrics.customerGrowthRate || 0
      },
      growthOpportunities,
      strategicRecommendations
    };

    analysisResult.value = result;
    isResultsVisible.value = true;

    return result;
  } catch (error) {
    // Comprehensive error logging
    console.error('Analysis Error - Full Error:', error);
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Headers:', error.response.headers);
      
      errors.value.analysis = error.response.data?.error || 'Unexpected API response';
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      errors.value.analysis = 'No response from the server';
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
      errors.value.analysis = 'Error preparing the request';
    }

    analysisResult.value = null;
    isResultsVisible.value = false;
    throw error;
  } finally {
    isLoading.value = false;
  }
};

// Submit business assessment
const handleFormSubmit = async () => {
  // Validate form first
  if (!validateForm()) return;

  try {
    // Perform comprehensive business analysis directly
    await performComprehensiveAnalysis(formData.value);
  } catch (error) {
    console.error('Form submission error:', error);
    errors.value.submission = 'Failed to submit business assessment';
  }
};

// EXPORT PDF
const exportBusinessReportPDF = async () => {
  // Check if analysis result exists
  if (!analysisResult.value) {
    $toast.warning({
      message: 'No analysis result to export',
      position: 'top-right',
      duration: 3000
    });
    return;
  }

  try {
    // Wait for DOM to update and ensure results are visible
    await nextTick();

    // Create a dedicated export container with improved styling
    const exportContainer = document.createElement('div');
    exportContainer.style.cssText = `
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      word-wrap: break-word;
      overflow-wrap: break-word;
      min-height: 1000px; /* Ensure minimum height */
    `;

    // Helper function to parse markdown-like formatting
    const parseMarkdown = (text) => {
      if (!text) return 'No information available';

      // Replace markdown-like formatting
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')  // Italic
        .replace(/\\n/g, '<br>')  // New lines
        .replace(/\n/g, '<br>');  // Alternative new lines
    };

    // Helper function to format currency
    const formatCurrency = (value) => {
      return typeof value === 'number' 
        ? `$${value.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}` 
        : value;
    };

    // Helper function to format percentage
    const formatPercentage = (value) => {
      return typeof value === 'number'
        ? `${value.toFixed(2)}%`
        : value;
    };

    // Create sections with improved styling
    const createSection = (title, content, rawContent = null) => {
      const sectionContainer = document.createElement('div');
      sectionContainer.style.cssText = `
        background-color: #f9f9f9;
        border-left: 4px solid #3498db;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        word-wrap: break-word;
        overflow-wrap: break-word;
      `;

      const titleEl = document.createElement('h2');
      titleEl.style.cssText = `
        color: #2c3e50;
        margin-bottom: 15px;
        border-bottom: 1px solid #ecf0f1;
        padding-bottom: 10px;
      `;
      titleEl.textContent = title;

      const contentEl = document.createElement('div');
      contentEl.style.cssText = `
        word-wrap: break-word;
        overflow-wrap: break-word;
      `;
      // Use raw content if provided, otherwise use parsed content
      contentEl.innerHTML = rawContent 
        ? parseMarkdown(rawContent) 
        : content;

      sectionContainer.appendChild(titleEl);
      sectionContainer.appendChild(contentEl);
      return sectionContainer;
    };

    // Create title section
    const titleElement = document.createElement('h1');
    titleElement.style.cssText = `
      text-align: center;
      color: #2c3e50;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
      margin-bottom: 30px;
    `;
    titleElement.textContent = 'Comprehensive Business Analysis Report';
    exportContainer.appendChild(titleElement);

    // Combine metrics from form input and analysis result
    const financialMetrics = [
      { 
        label: 'Current Revenue', 
        value: formData.value.current_revenue ?? analysisResult.value.metrics?.currentRevenue 
      },
      { 
        label: 'Previous Revenue', 
        value: formData.value.previous_revenue ?? analysisResult.value.metrics?.previousRevenue 
      },
      { 
        label: 'Total Expenses', 
        value: formData.value.total_expenses ?? analysisResult.value.metrics?.totalExpenses 
      },
      { 
        label: 'Customer Base', 
        value: formData.value.customer_base ?? analysisResult.value.metrics?.customerBase 
      },
      { 
        label: 'Industry', 
        value: formData.value.industry ?? analysisResult.value.metrics?.industry 
      },
      { 
        label: 'Customer Growth Rate', 
        value: analysisResult.value.metrics?.customerGrowthRate,
        isPercentage: true 
      }
    ];

    // Financial Metrics Section
    const financialMetricsContent = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        ${financialMetrics.map(metric => `
          <div>
            <strong>${metric.label}:</strong> ${
              metric.isPercentage 
                ? formatPercentage(metric.value) 
                : formatCurrency(metric.value)
            }
          </div>
        `).join('')}
        <div><strong>Analysis Date:</strong> ${new Date().toLocaleDateString()}</div>
      </div>
    `;
    const financialMetricsSection = createSection('Financial Metrics', financialMetricsContent);
    exportContainer.appendChild(financialMetricsSection);

    // Key Metrics Section
    const keyMetricsSection = createSection(
      'Key Metrics', 
      '', 
      analysisResult.value.metrics?.description || 'Detailed analysis of business performance metrics.'
    );
    exportContainer.appendChild(keyMetricsSection);

    // Growth Opportunities Section
    const growthOpportunitiesSection = createSection(
      'Growth Opportunities', 
      '', 
      analysisResult.value.growthOpportunities || 'Potential areas for business expansion and improvement.'
    );
    exportContainer.appendChild(growthOpportunitiesSection);

    // Strategic Recommendations Section
    const strategicRecommendationsSection = createSection(
      'Strategic Recommendations', 
      '', 
      analysisResult.value.strategicRecommendations || 'Actionable strategies to enhance business performance.'
    );
    exportContainer.appendChild(strategicRecommendationsSection);

    // Add a final padding section to ensure full content rendering
    const paddingSection = document.createElement('div');
    paddingSection.style.cssText = `
      height: 200px;
      width: 100%;
      visibility: hidden;
    `;
    exportContainer.appendChild(paddingSection);

    // Temporarily add to body to ensure rendering
    document.body.appendChild(exportContainer);

    // HTML2PDF configuration with enhanced options
    const pdfOptions = {
      margin:       [10, 10, 10, 10],
      filename:     `Business_Analysis_${new Date().toISOString().split('T')[0]}.pdf`,
      image:        { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas:  { 
        scale: 3, // Increased scale for better quality
        useCORS: true,
        logging: true,
        width: exportContainer.scrollWidth,
        height: exportContainer.scrollHeight + 500, // Add extra height
        windowHeight: exportContainer.scrollHeight + 500
      },
      jsPDF:        { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: {
        mode: 'avoid-all',
        before: '.page-break'
      }
    };

    // Generate and save PDF with additional error handling
    const generatePDF = () => {
      return new Promise((resolve, reject) => {
        html2pdf()
          .set(pdfOptions)
          .from(exportContainer)
          .save()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            console.error('PDF Generation Error:', err);
            reject(err);
          });
      });
    };

    // Attempt PDF generation
    await generatePDF();

    // Remove temporary container
    document.body.removeChild(exportContainer);

    // Show success toast
    $toast.success({
      message: 'Business report exported as PDF',
      position: 'top-right',
      duration: 3000
    });

  } catch (error) {
    console.group('PDF Export Error');
    console.error('Export Error:', error);
    
    // Detailed error handling
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred during PDF export';

    // Log additional context
    console.log('Error Context:', {
      errorName: error.name,
      errorStack: error.stack,
      additionalInfo: error.toString()
    });
    console.groupEnd();

    // User-friendly error toast
    $toast.error({
      message: `PDF Export Failed: ${errorMessage}`,
      position: 'top-right',
      duration: 5000
    });
  }
};
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    
    <div class="flex-1 p-4 overflow-y-auto">
      <Card>
        <template #title>
          <div class="flex justify-between items-center">
            <span>Business Assessment</span>
          </div>
        </template>
        
        <template #content>
          <p class="mb-4 text-gray-700">
            Evaluate your business's performance and get tailored recommendations to boost growth.
          </p>

          <form @submit.prevent="handleFormSubmit" class="space-y-4">
            <!-- Existing form inputs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block mb-2">Current Revenue</label>
                <InputNumber 
                  v-model="formData.current_revenue" 
                  placeholder="Enter current revenue" 
                  :class="{'p-invalid': errors.current_revenue}"
                />
                <small v-if="errors.current_revenue" class="p-error">
                  {{ errors.current_revenue }}
                </small>
              </div>

              <div>
                <label class="block mb-2">Previous Revenue</label>
                <InputNumber 
                  v-model="formData.previous_revenue" 
                  placeholder="Enter previous revenue" 
                  :class="{'p-invalid': errors.previous_revenue}"
                />
                <small v-if="errors.previous_revenue" class="p-error">
                  {{ errors.previous_revenue }}
                </small>
              </div>

              <div>
                <label class="block mb-2">Total Expenses</label>
                <InputNumber 
                  v-model="formData.total_expenses" 
                  placeholder="Enter total expenses" 
                  :class="{'p-invalid': errors.total_expenses}"
                />
                <small v-if="errors.total_expenses" class="p-error">
                  {{ errors.total_expenses }}
                </small>
              </div>

              <div>
                <label class="block mb-2">Customer Base</label>
                <InputNumber 
                  v-model="formData.customer_base" 
                  placeholder="Enter customer base" 
                  :class="{'p-invalid': errors.customer_base}"
                />
                <small v-if="errors.customer_base" class="p-error">
                  {{ errors.customer_base }}
                </small>
              </div>

              <div>
                <label class="block mb-2">Months</label>
                <InputNumber 
                  v-model="formData.months" 
                  placeholder="Enter number of months" 
                  :class="{'p-invalid': errors.months}"
                />
                <small v-if="errors.months" class="p-error">
                  {{ errors.months }}
                </small>
              </div>

              <div>
                <label class="block mb-2">Industry</label>
                <Dropdown 
                  v-model="formData.industry" 
                  :options="industries" 
                  placeholder="Select Industry"
                  :class="{'p-invalid': errors.industry}"
                />
                <small v-if="errors.industry" class="p-error">
                  {{ errors.industry }}
                </small>
              </div>
            </div>

            <div class="mt-4">
              <Button type="submit" label="Generate Business Insights" />
            </div>
          </form>

          <!-- Error Message -->
          <div v-if="errors.analysis" class="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {{ errors.analysis }}
          </div>

          <!-- Add loading overlay when analysis is in progress -->
          <div v-if="isLoading" class="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
            <ProgressSpinner 
              strokeWidth="4" 
              animationDuration=".5s" 
              class="w-16 h-16"
            />
          </div>

          <!-- Results Display -->
          <Card v-if="isResultsVisible && analysisResult" class="mt-6">
            <template #title>Business Analysis Results</template>
            <template #content>
              <div class="space-y-4">
                <Panel header="Key Metrics">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <strong>Revenue Growth:</strong> 
                      {{ analysisResult.metrics.revenueGrowth.toFixed(2) }}%
                    </div>
                    <div>
                      <strong>Profit Margin:</strong> 
                      {{ analysisResult.metrics.profitMargin.toFixed(2) }}%
                    </div>
                    <div>
                      <strong>Customer Growth Rate:</strong> 
                      {{ analysisResult.metrics.customerGrowthRate.toFixed(2) }}%
                    </div>
                  </div>
                </Panel>

                <Panel header="Growth Opportunities">
                  <p>{{ analysisResult.growthOpportunities }}</p>
                </Panel>

                <Panel header="Strategic Recommendations">
                  <p>{{ analysisResult.strategicRecommendations }}</p>
                </Panel>

                <div class="flex justify-end">
                  <Button 
                    label="Export PDF" 
                    @click="exportBusinessReportPDF"
                    severity="secondary"
                  />
                </div>
              </div>
            </template>
          </Card>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.invalid-input {
  border-color: red;
}

.prose {
  max-width: 100%;
}

.prose h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
</style>