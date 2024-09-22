<script setup>
import { savePaymentInfo } from "@/authService"; // Import the savePaymentInfo function
import pricingData from "@/price.json"; // Adjusted import for pricing data
import { ref } from "vue";

const pricingOptions = ref(pricingData);
const showModal = ref(false);
const selectedOption = ref(null);
const paymentMethod = ref("card");
const cardInfo = ref({ number: "", expiration: "", cvv: "" });
const onlineInfo = ref({ accountNumber: "", paymentReference: "" });
const formErrors = ref([]); // Array to hold form validation errors

// Function to open the plan selection modal
const choosePlan = (option) => {
  selectedOption.value = option;
  showModal.value = true;
};

// Function to validate billing form
const validateBillingForm = () => {
  formErrors.value = [];

  if (paymentMethod.value === "card") {
    if (
      !cardInfo.value.number ||
      !cardInfo.value.expiration ||
      !cardInfo.value.cvv
    ) {
      formErrors.value.push("Please complete all card information.");
    }
  } else if (paymentMethod.value === "online") {
    if (!onlineInfo.value.accountNumber || !onlineInfo.value.paymentReference) {
      formErrors.value.push("Please complete all online payment details.");
    }
  }

  return formErrors.value.length === 0;
};

// Function to handle signup and payment information saving
const redirectToSignup = async () => {
  if (!validateBillingForm()) {
    return; // If validation fails, prevent signup
  }

  try {
    const userId = "USER_ID_HERE"; // Replace this with actual user ID logic
    const paymentInfo = {
      plan: selectedOption.value.type,
      method: paymentMethod.value,
      details:
        paymentMethod.value === "card" ? cardInfo.value : onlineInfo.value,
    };

    await savePaymentInfo(userId, paymentInfo); // Save payment info to Firestore
    window.location.href = "/signup"; // Redirect to signup page after saving
  } catch (error) {
    console.error("Error saving payment information:", error.message);
  }
};
</script>

<template>
  <section class="bg-beige min-h-screen px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-4xl font-bold text-darkblue mb-6 text-center">
        Pricing Overview
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="option in pricingOptions"
          :key="option.id"
          class="bg-tan rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105"
        >
          <h3 class="text-2xl font-semibold text-darkblue">
            {{ option.type }}
          </h3>
          <p class="mb-4 text-gray-800">{{ option.description }}</p>
          <h4 class="text-lg font-bold text-green-600">{{ option.price }}</h4>
          <button
            class="mt-4 inline-block bg-darkblue text-white rounded-lg px-4 py-2 hover:bg-lightblue transition-colors duration-200"
            @click="choosePlan(option)"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for Billing Information -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 class="text-2xl font-bold text-darkblue mb-4">
          {{ selectedOption?.type }} Plan
        </h3>
        <p class="mb-4">{{ selectedOption?.description }}</p>
        <p class="mb-4 font-bold">Price: {{ selectedOption?.price }}</p>

        <!-- Display form errors -->
        <div
          v-if="formErrors.length"
          class="bg-red-100 text-red-600 p-4 mb-4 rounded"
        >
          <ul>
            <li v-for="(error, index) in formErrors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-2">Choose Payment Method</h4>
          <select
            v-model="paymentMethod"
            class="border rounded-lg p-2 mb-4 w-full"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="online">
              Online Payment (e.g., GCash, PayMaya)
            </option>
          </select>
        </div>

        <div v-if="paymentMethod === 'card'">
          <h4 class="font-semibold mb-2">Enter Card Information</h4>
          <input
            v-model="cardInfo.number"
            type="text"
            placeholder="Card Number"
            class="border rounded-lg p-2 mb-2 w-full"
          />
          <input
            v-model="cardInfo.expiration"
            type="text"
            placeholder="Expiration Date"
            class="border rounded-lg p-2 mb-2 w-full"
          />
          <input
            v-model="cardInfo.cvv"
            type="text"
            placeholder="CVV"
            class="border rounded-lg p-2 mb-2 w-full"
          />
        </div>

        <div v-if="paymentMethod === 'online'">
          <h4 class="font-semibold mb-2">Enter Online Payment Details</h4>
          <input
            v-model="onlineInfo.accountNumber"
            type="text"
            placeholder="Account Number"
            class="border rounded-lg p-2 mb-2 w-full"
          />
          <input
            v-model="onlineInfo.paymentReference"
            type="text"
            placeholder="Payment Reference"
            class="border rounded-lg p-2 mb-2 w-full"
          />
        </div>

        <div class="flex justify-between mt-4">
          <button
            @click="redirectToSignup"
            class="bg-lightblue text-darkblue rounded-lg px-4 py-2"
          >
            Sign Up
          </button>
          <button
            @click="showModal = false"
            class="bg-gray-300 rounded-lg px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add any custom styles here */
</style>
