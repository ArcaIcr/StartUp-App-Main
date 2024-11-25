<template>
  <span class="typewriter" :style="{ '--typing-duration': duration + 's' }">
    <span class="typed-text">{{ displayedText }}</span>
    <span class="cursor" :class="{ 'typing': isTyping }">|</span>
  </span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 2
  },
  startDelay: {
    type: Number,
    default: 0
  }
});

const displayedText = ref('');
const isTyping = ref(true);

const typeText = async () => {
  if (props.startDelay > 0) {
    await new Promise(resolve => setTimeout(resolve, props.startDelay));
  }
  
  const text = props.text;
  displayedText.value = '';
  isTyping.value = true;
  
  const charInterval = (props.duration * 1000) / text.length;
  
  for (let i = 0; i <= text.length; i++) {
    displayedText.value = text.substring(0, i);
    await new Promise(resolve => setTimeout(resolve, charInterval));
  }
  
  isTyping.value = false;
};

watch(() => props.text, () => {
  typeText();
});

onMounted(() => {
  typeText();
});
</script>

<style scoped>
.typewriter {
  display: inline-flex;
  align-items: center;
}

.cursor {
  display: inline-block;
  width: 2px;
  margin-left: 2px;
  animation: blink 0.7s infinite;
}

.cursor.typing {
  animation: none;
  opacity: 1;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
