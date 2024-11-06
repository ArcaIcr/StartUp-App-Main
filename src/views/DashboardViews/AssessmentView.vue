<template>
  <Navbar />
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Assessment Tab</h2>
      <form @submit.prevent="submitAssessment">
        <div v-for="(field, index) in formFields" :key="index" class="mb-4">
          <label
            :for="field.id"
            class="block text-sm font-medium text-gray-700"
          >
            {{ field.label }}
          </label>
          <input
            :type="field.type"
            :id="field.id"
            v-model="assessment[field.model]"
            :placeholder="field.placeholder"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm mb-4">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";
import { db } from "@/firebaseConfig"; // Import Firestore configuration
import { addDoc, collection } from "firebase/firestore"; // Import necessary Firestore functions
import { mapState } from "vuex"; // For accessing Vuex state (if needed for auth data)

export default {
  data() {
    return {
      assessment: {
        businessOverview: "",
        businessScale: "",
        location: "",
        targetSales: "",
        profitPerYear: "",
        targetProfit: "",
        additionalInfo: "",
      },
      errorMessage: "",
      formFields: [
        {
          id: "businessOverview",
          label: "Target Business Overview",
          model: "businessOverview",
          type: "text",
          placeholder: "To hold Taho selling",
        },
        {
          id: "businessScale",
          label: "Scale of Business",
          model: "businessScale",
          type: "text",
          placeholder: "Large Scale",
        },
        {
          id: "location",
          label: "Location of Target Business",
          model: "location",
          type: "text",
          placeholder: "Cagayan De Oro",
        },
        {
          id: "targetSales",
          label: "Target Sales",
          model: "targetSales",
          type: "text",
          placeholder: "1,000,000 sales",
        },
        {
          id: "profitPerYear",
          label: "Sales Average Per Year",
          model: "profitPerYear",
          type: "text",
          placeholder: "₱500,000",
        },
        {
          id: "targetProfit",
          label: "Target Profit",
          model: "targetProfit",
          type: "text",
          placeholder: "₱500,000",
        },
        {
          id: "additionalInfo",
          label: "Additional Information of Business",
          model: "additionalInfo",
          type: "text",
          placeholder: "Finest Illegal Business within the City",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]), // Assuming the user info is stored in Vuex state after login
  },
  methods: {
    async submitAssessment() {
      try {
        // Check if user is authenticated before submission
        if (!this.user || !this.user.uid) {
          this.errorMessage = "You must be logged in to submit an assessment.";
          return;
        }

        // Add the assessment data to Firestore
        const docRef = await addDoc(collection(db, "assessments"), {
          ...this.assessment, // Spread form data
          createdAt: new Date().toISOString(), // Timestamp
          userId: this.user.uid, // User ID from Vuex state
        });

        console.log("Document written with ID: ", docRef.id);
        alert("Assessment submitted successfully!");
        this.clearForm(); // Clear the form on successful submission
      } catch (error) {
        console.error("Error adding document: ", error);
        this.errorMessage = "Failed to submit assessment. Please try again.";
      }
    },
    clearForm() {
      this.assessment = {
        businessOverview: "",
        businessScale: "",
        location: "",
        targetSales: "",
        profitPerYear: "",
        targetProfit: "",
        additionalInfo: "",
      };
    },
  },
};
</script>

<style scoped>
/* Styling for the form */
</style>
