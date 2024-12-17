<template>
  <Navbar />
  <section class="bg-gradient-to-b from-beige to-white min-h-screen px-4 py-16">
    <div class="container-xl lg:container m-auto">
      <div class="text-center mb-12">
        <h2 class="text-5xl font-bold text-darkblue mb-4">
          Simple, Transparent Pricing
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Choose the perfect plan for your business needs
        </p>
        
        <!-- Billing Toggle -->
        <div class="flex items-center justify-center gap-4 mb-8">
          <span :class="{ 'text-darkblue font-semibold': !isYearly }">Monthly</span>
          <button
            class="w-16 h-8 rounded-full relative bg-darkblue focus:outline-none"
            @click="isYearly = !isYearly"
          >
            <div
              class="w-6 h-6 rounded-full bg-white absolute top-1 transition-all duration-300"
              :class="isYearly ? 'left-9' : 'left-1'"
            ></div>
          </button>
          <span :class="{ 'text-darkblue font-semibold': isYearly }">
            Yearly
            <span class="text-green-500 text-sm ml-1">(Save 20%)</span>
          </span>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="option in calculatedPricing"
          :key="option.id"
          class="relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2"
          :class="{
            'border-2 border-lightblue': option.id === 2,
            'z-10': option.id === 2
          }"
        >
          <!-- Popular Badge -->
          <div
            v-if="option.id === 2"
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-lightblue text-darkblue px-4 py-1 rounded-full text-sm font-semibold"
          >
            Most Popular
          </div>

          <h3 class="text-2xl font-bold text-darkblue mb-2">
            {{ option.title }}
          </h3>
          <p class="text-gray-600 mb-6">{{ option.description }}</p>
          
          <div class="mb-6">
            <span class="text-4xl font-bold text-darkblue">
              ${{ isYearly ? option.yearlyPrice : option.monthlyPrice }}
            </span>
            <span class="text-gray-500">
              /{{ isYearly ? 'year' : 'month' }}
            </span>
          </div>

          <!-- Features List -->
          <ul class="mb-8 space-y-3">
            <li
              v-for="(feature, index) in option.features"
              :key="index"
              class="flex items-center gap-2"
              :class="feature.included ? 'text-gray-800' : 'text-gray-400'"
            >
              <i
                class="pi"
                :class="feature.included ? 'pi-check-circle text-green-500' : 'pi-times-circle'"
              ></i>
              {{ feature.name }}
            </li>
          </ul>

          <button
            class="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            :class="option.id === 2 
              ? 'bg-lightblue text-darkblue hover:bg-blue-400' 
              : 'bg-darkblue text-white hover:bg-blue-900'"
            @click="choosePlan(option)"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
      @click.self="showModal = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-8">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold text-darkblue">
            Complete Your Purchase
          </h3>
          <button
            @click="showModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <!-- Plan Summary -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="flex justify-between mb-2">
            <span class="font-semibold">{{ selectedOption?.title }}</span>
            <span class="font-bold">
              ${{ isYearly 
                ? selectedOption?.yearlyPrice 
                : selectedOption?.monthlyPrice 
              }}/{{ isYearly ? 'year' : 'month' }}
            </span>
          </div>
          <p class="text-sm text-gray-600">
            {{ selectedOption?.description }}
          </p>
        </div>

        <!-- Error Messages -->
        <div
          v-if="formErrors.length"
          class="bg-red-50 border border-red-200 text-red-600 p-4 mb-6 rounded-lg"
        >
          <ul class="list-disc list-inside">
            <li v-for="(error, index) in formErrors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <!-- Payment Method Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="method in ['card', 'online']"
              :key="method"
              class="p-4 rounded-lg border-2 transition-all duration-200"
              :class="paymentMethod === method
                ? 'border-lightblue bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'"
              @click="paymentMethod = method"
            >
              <i
                class="pi text-xl mb-2"
                :class="method === 'card' ? 'pi-credit-card' : 'pi-wallet'"
              ></i>
              <div class="text-sm font-medium">
                {{ method === 'card' ? 'Credit Card' : 'Online Payment' }}
              </div>
            </button>
          </div>
        </div>

        <!-- Payment Details Form -->
        <div v-if="paymentMethod === 'card'" class="space-y-4">
          <form @submit.prevent="submitPayment">
            <div id="card-element"></div>
            <button type="submit">Pay</button>
            <div v-if="errorMessage">{{ errorMessage }}</div>
            <div v-if="successMessage">{{ successMessage }}</div>
          </form>
        </div>

        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              v-model="onlineInfo.accountNumber"
              type="text"
              placeholder="Enter your account number"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Payment Reference
            </label>
            <input
              v-model="onlineInfo.paymentReference"
              type="text"
              placeholder="Enter payment reference"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-lightblue focus:border-lightblue"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-8">
          <button
            @click="redirectToSignup"
            class="flex-1 bg-lightblue text-darkblue font-semibold py-3 px-6 rounded-lg hover:bg-blue-400 transition-colors duration-200 disabled:opacity-50"
            :disabled="processingPayment"
          >
            <span v-if="processingPayment">
              <i class="pi pi-spinner pi-spin mr-2"></i>
              Processing...
            </span>
            <span v-else>Complete Purchase</span>
          </button>
          <button
            @click="showModal = false"
            class="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Navbar from "@/components/navbar/Navbar.vue";
import { savePaymentInfo } from "@/authService";
import pricingData from "@/price.json";
import { ref, computed } from "vue";
import { loadStripe } from '@stripe/stripe-js';

const isYearly = ref(false);
const pricingOptions = ref(pricingData.map(plan => ({
  ...plan,
  features: [
    { name: "Basic Analytics", included: true },
    { name: "Market Trends", included: plan.id >= 2 },
    { name: "Financial Reports", included: plan.id >= 2 },
    { name: "ROI Calculator", included: plan.id >= 2 },
    { name: "Business Assessment", included: plan.id >= 3 },
    { name: "Performance Metrics", included: plan.id >= 3 },
    { name: "AI Recommendations", included: plan.id >= 3 },
    { name: "Priority Support", included: plan.id >= 3 }
  ]
})));


const calculatedPricing = computed(() => {
  return pricingOptions.value.map(option => ({
    ...option,
    monthlyPrice: parseFloat(option.price.replace('$', '').replace('/month', '')),
    yearlyPrice: parseFloat(option.price.replace('$', '').replace('/month', '')) * 10 // 2 months free
  }));
});

const showModal = ref(false);
const selectedOption = ref(null);
const paymentMethod = ref("card");
const cardInfo = ref({ number: "", expiration: "", cvv: "" });
const onlineInfo = ref({ accountNumber: "", paymentReference: "" });
const formErrors = ref([]);
const processingPayment = ref(false);
const stripe = ref(null);
const card = ref(null);
const errorMessage = ref('');
const successMessage = ref('');

async function submitPayment() {
  errorMessage.value = '';
  successMessage.value = '';

  // Call your backend to create a payment intent
  const response = await fetch('/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 1000 }), // Amount in cents
  });

  const { clientSecret, error } = await response.json();

  if (error) {
    errorMessage.value = error;
    return;
  }

  // Confirm the payment with the card details
  const { error: stripeError } = await stripe.value.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card.value,
    },
  });

  if (stripeError) {
    errorMessage.value = stripeError.message;
  } else {
    successMessage.value = 'Payment successful!';
  }
}

const choosePlan = (option) => {
  selectedOption.value = option;
  showModal.value = true;
};

const validateBillingForm = () => {
  formErrors.value = [];

  if (paymentMethod.value === "card") {
    if (!cardInfo.value.number || !cardInfo.value.expiration || !cardInfo.value.cvv) {
      formErrors.value.push("Please complete all card information.");
    }
    // Add card validation logic here
    if (cardInfo.value.number && !/^\d{16}$/.test(cardInfo.value.number.replace(/\s/g, ''))) {
      formErrors.value.push("Invalid card number.");
    }
  } else if (paymentMethod.value === "online") {
    if (!onlineInfo.value.accountNumber || !onlineInfo.value.paymentReference) {
      formErrors.value.push("Please complete all online payment details.");
    }
  }

  return formErrors.value.length === 0;
};

const redirectToSignup = async () => {
  if (!validateBillingForm()) return;
  
  processingPayment.value = true;
  try {
    const userId = "USER_ID_HERE";
    const paymentInfo = {
      plan: selectedOption.value.title,
      billing: isYearly.value ? 'yearly' : 'monthly',
      method: paymentMethod.value,
      details: paymentMethod.value === "card" ? cardInfo.value : onlineInfo.value,
    };

    await savePaymentInfo(userId, paymentInfo);
    window.location.href = "/signup";
  } catch (error) {
    formErrors.value.push(error.message);
  } finally {
    processingPayment.value = false;
  }
};

const formatCardNumber = (e) => {
  let value = e.target.value.replace(/\s/g, '');
  if (value.length > 16) value = value.slice(0, 16);
  cardInfo.value.number = value.replace(/(\d{4})/g, '$1 ').trim();
};

async function mounted() {
  stripe.value = await loadStripe('pk_test_51QUWzSAt94MkqoH6prF5eXCKqVJukqfK9aLtvkVnfoI6sfHI3gpPGb7FrpVdBOSFx2LHz3fSIFNdEo5QeMg8WCvT00xYp4PMOE');
  const elements = stripe.value.elements();
  card.value = elements.create('card');
  card.value.mount('#card-element');
}
mounted();
</script>

<style scoped>
.pi {
  font-size: 1.2rem;
}

/* Smooth transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Card hover effect */
.pricing-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
