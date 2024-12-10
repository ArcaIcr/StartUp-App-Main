<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm p-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-800">{{ activeToolName }}</h1>
          <div class="flex items-center space-x-4">
            <!-- Collaboration Status -->
            <div class="flex items-center">
              <span class="text-sm text-gray-600 mr-2">{{ activeCollaborators.length }} active</span>
              <div class="flex -space-x-2">
                <img v-for="user in activeCollaborators.slice(0, 3)" 
                     :key="user.id"
                     :src="user.avatar"
                     :alt="user.name"
                     class="w-8 h-8 rounded-full border-2 border-white"
                >
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button 
                @click="navigateToDashboard"
                class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Back to Dashboard
              </button>
              <button 
                v-if="canCreateTemplates"
                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                @click="createTemplate"
              >
                Create Template
              </button>
              <button 
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                @click="saveWorkspace"
              >
                Save Work
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Workspace Area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="p-6">
          <div class="grid grid-cols-1 gap-6">
            <!-- Tool Area -->
            <div>
              <div class="bg-white shadow rounded-lg p-6">
                <component 
                  :is="activeComponent"
                  :config="toolConfig"
                  :user-role="userRole"
                  @update="handleToolUpdate"
                />
              </div>
            </div>

            <!-- Collaborative Features -->
            <div>
              <CollaborativeFeatures />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useWorkspaceStore } from '@/store/workspace';
import CollaborativeFeatures from '@/components/workspace/CollaborativeFeatures.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'UnifiedWorkspace',
  components: {
    CollaborativeFeatures
  },
  
  setup() {
    const router = useRouter();
    const { userRole } = useAuth();
    const workspaceStore = useWorkspaceStore();
    const activeToolId = ref(null);

    // Unified tools list with role-based visibility
    const tools = [
      {
        id: 'analysis',
        name: 'Analysis',
        icon: 'pi pi-chart-line',
        component: 'AnalysisTool',
        roles: ['user', 'maker']
      },
      {
        id: 'templates',
        name: 'Templates',
        icon: 'pi pi-file',
        component: 'TemplateManager',
        roles: ['maker']
      },
      {
        id: 'collaboration',
        name: 'Collaboration',
        icon: 'pi pi-users',
        component: 'CollaborationTool',
        roles: ['user', 'maker']
      }
    ];

    // Auto-save interval
    let autoSaveInterval;
    onMounted(() => {
      autoSaveInterval = setInterval(() => {
        workspaceStore.saveWorkspaceState();
      }, 5 * 60 * 1000); // Every 5 minutes
    });

    onBeforeUnmount(() => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
      workspaceStore.saveWorkspaceState();
    });

    // Methods
    const saveWorkspace = async () => {
      await workspaceStore.saveWorkspaceState();
      // Show success notification
    };

    const createTemplate = () => {
      // Implement template creation logic
    };

    const navigateToDashboard = () => {
      router.push('/dashboard');
    };

    return {
      canCreateTemplates: computed(() => userRole.value === 'maker'),
      activeToolName: computed(() => {
        const tool = tools.find(t => t.id === activeToolId.value);
        return tool ? tool.name : 'Workspace';
      }),
      activeCollaborators: computed(() => workspaceStore.projectCollaborators),
      workspaceStore,
      saveWorkspace,
      createTemplate,
      navigateToDashboard
    };
  }
};
</script>

<style scoped>
/* Theme transitions */
.workspace {
  @apply transition-colors duration-300;
}

/* Responsive adjustments */
@screen sm {
  .sidebar-collapsed {
    @apply w-16;
  }
}
</style>
