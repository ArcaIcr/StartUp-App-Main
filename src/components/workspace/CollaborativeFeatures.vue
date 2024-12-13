<template>
  <div class="collaborative-features">
    <!-- Real-time Collaboration Panel -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold mb-3">Active Collaborators</h3>
      <div class="flex space-x-2 mb-4">
        <div v-for="user in activeCollaborators" 
             :key="user.id" 
             class="relative group">
          <img :src="user.avatar" 
               :alt="user.name"
               class="w-8 h-8 rounded-full border-2"
               :class="{'border-green-400': user.online}"
          >
          <span class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full"
                :class="user.online ? 'bg-green-400' : 'bg-gray-400'"></span>
          <div class="hidden group-hover:block absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded p-2">
            {{ user.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Shared Resources -->
    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 class="text-lg font-semibold mb-3">Shared Resources</h3>
      <div class="space-y-2">
        <div v-for="resource in sharedResources" 
             :key="resource.id"
             class="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
          <div class="flex items-center">
            <i :class="resource.icon" class="mr-2"></i>
            <span>{{ resource.name }}</span>
          </div>
          <div class="flex space-x-2">
            <button @click="viewResource(resource)"
                    class="text-blue-500 hover:text-blue-700">
              <i class="pi pi-eye"></i>
            </button>
            <button v-if="canEdit(resource)"
                    @click="editResource(resource)"
                    class="text-green-500 hover:text-green-700">
              <i class="pi pi-pencil"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="bg-white rounded-lg shadow-md p-4">
      <h3 class="text-lg font-semibold mb-3">Recent Activity</h3>
      <div class="space-y-3">
        <div v-for="activity in recentActivities" 
             :key="activity.id"
             class="flex items-start space-x-3 text-sm">
          <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div>
            <p class="font-medium">{{ activity.description }}</p>
            <p class="text-gray-500">{{ formatTime(activity.timestamp) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWorkspaceStore } from '@/store/workspace';
import { useAuth } from '@/composables/useAuth';
import { formatDistanceToNow } from 'date-fns';

const workspaceStore = useWorkspaceStore();
const { userRole } = useAuth();

// Computed properties
const activeCollaborators = computed(() => workspaceStore.projectCollaborators);
const sharedResources = computed(() => workspaceStore.sharedResources);
const recentActivities = computed(() => workspaceStore.recentActivities);

// Methods
const canEdit = (resource) => {
  return resource.ownerId === auth.currentUser?.uid || userRole.value === 'maker';
};

const viewResource = (resource) => {
  workspaceStore.trackActivity('resource_view', { resourceId: resource.id });
  // Implement resource viewing logic
};

const editResource = (resource) => {
  workspaceStore.trackActivity('resource_edit', { resourceId: resource.id });
  // Implement resource editing logic
};

const getActivityIcon = (type) => {
  const icons = {
    resource_view: 'pi pi-eye',
    resource_edit: 'pi pi-pencil',
    project_switch: 'pi pi-sync',
    default: 'pi pi-info-circle'
  };
  return icons[type] || icons.default;
};

const formatTime = (timestamp) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};
</script>

<style scoped>
.collaborative-features {
  @apply space-y-4;
}

/* Smooth transitions */
.collaborative-features button {
  @apply transition-colors duration-200;
}

/* Activity feed animations */
.activity-enter-active,
.activity-leave-active {
  @apply transition-all duration-300;
}

.activity-enter-from,
.activity-leave-to {
  @apply opacity-0 transform translate-y-4;
}
</style>
