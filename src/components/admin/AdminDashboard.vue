<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 h-screen bg-teal-700 flex flex-col justify-between">
      <div class="p-4">
        <div class="mb-8">
          <h1 class="text-white text-xl font-bold">Admin Panel</h1>
        </div>
        <nav>
          <ul class="space-y-4">
            <li>
              <a 
                @click="currentView = 'dashboard'" 
                :class="[
                  'cursor-pointer text-white hover:bg-teal-800 p-2 rounded flex items-center space-x-2',
                  { 'bg-teal-800': currentView === 'dashboard' }
                ]"
              >
                <i class="pi pi-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a 
                @click="currentView = 'users'" 
                :class="[
                  'cursor-pointer text-white hover:bg-teal-800 p-2 rounded flex items-center space-x-2',
                  { 'bg-teal-800': currentView === 'users' }
                ]"
              >
                <i class="pi pi-users"></i>
                <span>User Management</span>
              </a>
            </li>
            <li>
              <a 
                @click="currentView = 'analytics'" 
                :class="[
                  'cursor-pointer text-white hover:bg-teal-800 p-2 rounded flex items-center space-x-2',
                  { 'bg-teal-800': currentView === 'analytics' }
                ]"
              >
                <i class="pi pi-chart-bar"></i>
                <span>Analytics</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4">
        <button
          @click="handleLogout"
          class="text-white hover:bg-teal-800 p-2 rounded flex items-center space-x-2 w-full"
        >
          <i class="pi pi-sign-out"></i>
          <span>Log out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 overflow-auto">
      <!-- Dynamic Component Rendering -->
      <component 
        :is="currentComponentView" 
        v-if="currentComponentView"
      ></component>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

// Dynamically import components
import UserManagement from './UserManagement.vue';
import Analytics from './Analytics.vue';
import AdminOverview from './AdminOverview.vue';

export default {
  components: {
    UserManagement,
    Analytics,
    AdminOverview
  },
  setup() {
    const router = useRouter();
    const currentView = ref('dashboard');

    // Dynamically select component based on current view
    const currentComponentView = computed(() => {
      const viewMap = {
        'dashboard': AdminOverview,
        'users': UserManagement,
        'analytics': Analytics
      };
      return viewMap[currentView.value];
    });

    const handleLogout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    return {
      currentView,
      currentComponentView,
      handleLogout
    };
  }
};
</script>

<style scoped>
/* Optional additional styling */
.pi {
  margin-right: 8px;
}
</style>
