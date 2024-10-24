<template>
  <div class="card w-40">
    <div
      class="card__content text-center relative p-20 transition-transform duration-1000 text-white font-bold"
    >
      <div
        class="card__front absolute top-0 bottom-0 right-0 left-0 p-8 bg-bgLight flex items-center justify-center"
      >
        <slot name="front"></slot>
      </div>
      <div
        class="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-bgLight flex items-center justify-center"
      >
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  frontContent: String,
  backContent: String,
});
</script>

<style scoped>
.card {
  perspective: 800px;
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card__content {
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card:hover .card__content {
  transform: rotateY(0.5turn);
}

.card__front,
.card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5rem;
}

.card__back {
  transform: rotateY(0.5turn);
}
</style>
