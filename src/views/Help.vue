<template>
  <div class="help-container max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Help Page</h1>
    <div class="space-y-6">
      <section>
        <p class="text-gray-600 leading-relaxed">
          Welcome to the Maker Space Help Page! Here you will find information on how to navigate and use the various tools available in the Maker Space.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3 text-gray-800">Navigation</h2>
        <p class="text-gray-600 leading-relaxed">
          Use the sidebar to access different features of the Maker Space. Click on the icons to navigate to the desired tool or resource.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3 text-gray-800">Available Tools</h2>
        <p class="text-gray-600 mb-2">The Maker Space offers a variety of tools including:</p>
        <ul class="list-disc ml-6 space-y-1 text-gray-600">
          <li>Financial Analysis</li>
          <li>Evaluation</li>
          <li>Performance Measurement</li>
          <li>Market Share Analysis</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-3 text-gray-800">Need Further Assistance?</h2>
        <p class="text-gray-600 leading-relaxed">
          If you need more help, please contact us at <a href="mailto:support@makerspace.com" class="text-blue-500 hover:text-blue-600">support@makerspace.com</a> or visit our website for more resources.
        </p>
      </section>

      <div class="flex justify-center mt-8">
        <button
          @click="$router.push('/maker-space')"
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Makerspace
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help',
};
</script>

<style scoped>
.help-container {
  min-height: calc(100vh - 4rem);
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
