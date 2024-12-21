<template>
    <div class="demo-view p-6">
      <h1 class="text-2xl font-bold mb-4">Demo Video</h1>
      <p class="mb-4">
        Watch our demo video to learn more about the features and benefits of our application.
      </p>
      <div class="card">
        <video controls class="w-full">
          <source src="/src/assets/vid/DemoVid.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="mt-4">
        <Button label="Back to Home" icon="pi pi-home" @click="goHome" />
      </div>
    </div>
  </template>
  
  <script>
  import Button from 'primevue/button'; // Corrected import
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'DemoView',
    components: {
      Button,
    },
    setup() {
      const router = useRouter();
  
      const goHome = () => {
        router.push('/');
      };
  
      return {
        goHome,
      };
    },
  };
  </script>
  
  <style scoped>
  .demo-view {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card {
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
  }
  </style>