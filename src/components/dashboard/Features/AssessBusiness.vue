<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

// PrimeVue Components
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Sidebar from '../Sidebar.vue'; // Import local Sidebar component

// Import AI API endpoint
import { getAIApiEndpoint } from '@/apiConfig';
const aiEndpoint = getAIApiEndpoint();

// Reactive variables to store form inputs
const revenue = ref(null);
const previousRevenue = ref(null);
const totalExpenses = ref(null);
const customerBase = ref(null);
const months = ref(12); // Default to 12 months
const industry = ref(null); // Added industry field
const insights = ref("");
const businessMetrics = ref(null);
const isLoading = ref(false);

const router = useRouter();

// List of available industries
const industries = [
  "Retail", "Tech", "Healthcare", "Finance", "Energy", 
  "Consumer Goods", "Utilities", "Industrial"
];

// Method to handle form submission
const handleFormSubmit = async () => {
  isLoading.value = true;
  insights.value = "";
  businessMetrics.value = null;

  try {
    const response = await axios.get(aiEndpoint, {
      params: {
        current_revenue: revenue.value,
        previous_revenue: previousRevenue.value,
        total_expenses: totalExpenses.value,
        customer_base: customerBase.value,
        months: months.value,
        industry: industry.value,
      },
    });

    // Store business metrics and insights
    businessMetrics.value = response.data.business_metrics;
    insights.value = response.data.ai_insights.join("\n");
  } catch (error) {
    insights.value = error.response?.data?.error || 
      "An error occurred while fetching business insights. Please try again.";
  } finally {
    isLoading.value = false;
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
            <Button 
              icon="pi pi-times" 
              class="p-button-rounded p-button-text p-button-danger"
              @click="$emit('close')"
            />
          </div>
        </template>
        
        <template #content>
          <p class="mb-4 text-gray-700">
            Evaluate your business's performance and get tailored recommendations to boost growth.
          </p>

          <form @submit.prevent="handleFormSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="revenue" class="block mb-2">Current Monthly Revenue ($)</label>
              <InputNumber 
                v-model="revenue" 
                inputId="revenue"
                :min="0"
                mode="currency" 
                currency="USD"
                placeholder="Enter current monthly revenue"
                class="w-full"
                required
              />
            </div>

            <div>
              <label for="previous-revenue" class="block mb-2">Previous Monthly Revenue ($)</label>
              <InputNumber 
                v-model="previousRevenue" 
                inputId="previous-revenue"
                :min="0"
                mode="currency" 
                currency="USD"
                placeholder="Enter previous monthly revenue"
                class="w-full"
                required
              />
            </div>

            <div>
              <label for="total-expenses" class="block mb-2">Total Expenses ($)</label>
              <InputNumber 
                v-model="totalExpenses" 
                inputId="total-expenses"
                :min="0"
                mode="currency" 
                currency="USD"
                placeholder="Enter total expenses"
                class="w-full"
                required
              />
            </div>

            <div>
              <label for="customer-base" class="block mb-2">Customer Base</label>
              <InputNumber 
                v-model="customerBase" 
                inputId="customer-base"
                :min="0"
                placeholder="Number of customers"
                class="w-full"
                required
              />
            </div>

            <div>
              <label for="months" class="block mb-2">Months for Calculation</label>
              <InputNumber 
                v-model="months" 
                inputId="months"
                :min="1"
                placeholder="Default is 12"
                class="w-full"
              />
            </div>

            <div>
              <label for="industry" class="block mb-2">Industry</label>
              <Dropdown 
                v-model="industry" 
                :options="industries"
                placeholder="Select your industry"
                class="w-full"
                required
              />
            </div>

            <div class="col-span-full">
              <Button 
                type="submit" 
                :loading="isLoading"
                class="w-full"
                severity="secondary"
              >
                {{ isLoading ? 'Generating Insights...' : 'Get Insights' }}
              </Button>
            </div>
          </form>

          <!-- Business Metrics Panel -->
          <Panel v-if="businessMetrics" header="Business Metrics" class="mt-4">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <strong>Average Monthly Revenue:</strong> 
                ${{ businessMetrics.average_revenue_per_month.toFixed(2) }}
              </div>
              <div>
                <strong>Growth Rate:</strong> 
                {{ (businessMetrics.growth_rate).toFixed(2) }}%
              </div>
              <div>
                <strong>Profit Margin:</strong> 
                {{ (businessMetrics.profit_margin).toFixed(2) }}%
              </div>
              <div>
                <strong>Customer Base:</strong> 
                {{ businessMetrics.customer_base }}
              </div>
            </div>
          </Panel>

          <!-- Insights Panel -->
          <Panel v-if="insights" header="Strategic Insights" class="mt-4">
            <pre class="whitespace-pre-wrap text-sm">{{ insights }}</pre>
          </Panel>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Any additional custom styles can be added here */
</style>