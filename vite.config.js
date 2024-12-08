import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
    port: 3000,
    hmr: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: ['.js', '.vue', '.json']
  },
  optimizeDeps: {
    include: ['vue']
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'dashboard': [
            '@/components/dashboard/Charts/GoalsChart.vue',
            '@/components/dashboard/Charts/ChallengesChart.vue',
            '@/components/dashboard/Charts/IndustryInsights.vue'
          ]
        }
      }
    }
  }
});
