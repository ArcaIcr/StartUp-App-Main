<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Quick Stats Cards -->
      <div 
        v-for="(stat, key) in quickStats" 
        :key="key" 
        class="bg-white shadow-md rounded-lg p-6 flex flex-col"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">{{ stat.title }}</h3>
          <i :class="stat.icon" class="text-2xl opacity-50"></i>
        </div>
        <div class="text-3xl font-bold" :class="stat.color">{{ stat.value }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Recent System Activity</h3>
        <ul class="divide-y divide-gray-200">
          <li 
            v-for="activity in recentActivities" 
            :key="activity.id" 
            class="py-4 flex justify-between"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
              <p class="text-sm text-gray-500">{{ formatTime(activity.timestamp) }}</p>
            </div>
            <span 
              :class="getActivityBadgeClass(activity.type)"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              {{ activity.type }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-4">
          <button 
            v-for="action in quickActions" 
            :key="action.name"
            @click="action.handler"
            class="bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition flex items-center justify-center space-x-2"
          >
            <i :class="action.icon"></i>
            <span>{{ action.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default {
  setup() {
    const quickStats = ref({
      totalUsers: { 
        title: 'Total Users', 
        value: 0, 
        icon: 'pi pi-users', 
        color: 'text-blue-600' 
      },
      activeUsers: { 
        title: 'Active Users', 
        value: 0, 
        icon: 'pi pi-user-check', 
        color: 'text-green-600' 
      },
      newUsers: { 
        title: 'New Users (30d)', 
        value: 0, 
        icon: 'pi pi-user-plus', 
        color: 'text-purple-600' 
      }
    });

    const recentActivities = ref([]);
    const unsubscribers = [];

    const quickActions = [
      {
        name: 'Add User',
        icon: 'pi pi-user-plus',
        handler: () => {
          // Implement user creation logic
          console.log('Add User clicked');
        }
      },
      {
        name: 'Generate Report',
        icon: 'pi pi-file-pdf',
        handler: () => {
          // Implement report generation logic
          console.log('Generate Report clicked');
        }
      },
      {
        name: 'System Settings',
        icon: 'pi pi-cog',
        handler: () => {
          // Implement system settings navigation
          console.log('System Settings clicked');
        }
      },
      {
        name: 'Send Notification',
        icon: 'pi pi-bell',
        handler: () => {
          // Implement notification sending logic
          console.log('Send Notification clicked');
        }
      }
    ];

    const fetchUserStats = () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Calculate user statistics
        quickStats.value.totalUsers.value = users.length;
        quickStats.value.activeUsers.value = users.filter(u => u.isOnline).length;
        
        // New users in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        quickStats.value.newUsers.value = users.filter(u => 
          new Date(u.createdAt) > thirtyDaysAgo
        ).length;
      });

      unsubscribers.push(unsubscribe);
    };

    const fetchRecentActivities = () => {
      const activitiesRef = collection(db, 'systemActivities');
      const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(5));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        recentActivities.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      });

      unsubscribers.push(unsubscribe);
    };

    const formatTime = (timestamp) => {
      if (!timestamp) return 'Unknown';
      return new Date(timestamp.seconds * 1000).toLocaleString();
    };

    const getActivityBadgeClass = (type) => {
      const badgeClasses = {
        'login': 'bg-green-100 text-green-800',
        'logout': 'bg-red-100 text-red-800',
        'registration': 'bg-blue-100 text-blue-800',
        'default': 'bg-gray-100 text-gray-800'
      };
      return badgeClasses[type] || badgeClasses['default'];
    };

    onMounted(() => {
      fetchUserStats();
      fetchRecentActivities();
    });

    onUnmounted(() => {
      // Cleanup subscriptions
      unsubscribers.forEach(unsub => unsub());
    });

    return {
      quickStats,
      recentActivities,
      quickActions,
      formatTime,
      getActivityBadgeClass
    };
  }
};
</script>

<style scoped>
/* Optional additional styling */
</style>
