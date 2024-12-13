<template>
  <div class="evaluation-container p-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Project Evaluation</h2>
      <p class="text-gray-600">Evaluate project performance across different criteria</p>
    </div>

    <!-- Evaluation Form -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="criterion in criteria" :key="criterion.id" class="space-y-2">
          <label :for="criterion.id" class="block font-medium text-gray-700">
            {{ criterion.name }}
          </label>
          <div class="flex items-center space-x-4">
            <input
              type="range"
              :id="criterion.id"
              v-model="criterion.score"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              min="0"
              max="10"
              step="1"
            />
            <span class="text-sm font-medium text-gray-600">{{ criterion.score }}/10</span>
          </div>
          <p class="text-sm text-gray-500">{{ criterion.description }}</p>
        </div>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-semibold mb-4">Evaluation Summary</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-medium mb-2">Score Breakdown</h4>
          <ul class="space-y-2">
            <li v-for="criterion in criteria" :key="criterion.id" 
                class="flex justify-between items-center">
              <span class="text-gray-600">{{ criterion.name }}</span>
              <span class="font-medium" 
                    :class="getScoreColor(criterion.score)">
                {{ criterion.score }}/10
              </span>
            </li>
          </ul>
        </div>
        <div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium mb-2">Overall Score</h4>
            <div class="text-4xl font-bold text-blue-600">
              {{ averageScore }}/10
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Based on {{ criteria.length }} evaluation criteria
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end mt-6 space-x-4">
        <button @click="$router.push('/maker-space')">Back to Makerspace</button>
        <button @click="resetEvaluation" 
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Reset
        </button>
        <button @click="saveEvaluation" 
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save Evaluation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const criteria = ref([
  {
    id: 'technical',
    name: 'Technical Implementation',
    description: 'Quality of code, architecture, and technical decisions',
    score: 5
  },
  {
    id: 'design',
    name: 'Design & UI',
    description: 'Visual appeal, user experience, and interface design',
    score: 5
  },
  {
    id: 'functionality',
    name: 'Functionality',
    description: 'Features completeness and working as intended',
    score: 5
  },
  {
    id: 'innovation',
    name: 'Innovation',
    description: 'Uniqueness and creative problem-solving',
    score: 5
  }
])

const averageScore = computed(() => {
  const total = criteria.value.reduce((sum, criterion) => sum + criterion.score, 0)
  return (total / criteria.value.length).toFixed(1)
})

const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-blue-600'
  if (score >= 4) return 'text-yellow-600'
  return 'text-red-600'
}

const resetEvaluation = () => {
  criteria.value.forEach(criterion => criterion.score = 5)
}

const saveEvaluation = () => {
  // TODO: Implement save functionality
  console.log('Saving evaluation:', {
    criteria: criteria.value,
    averageScore: averageScore.value,
    timestamp: new Date().toISOString()
  })
}
</script>

<style scoped>
.evaluation-container {
  min-height: calc(100vh - 4rem);
  background-color: #f9fafb;
}

input[type="range"] {
  accent-color: #3b82f6;
}
</style>
