<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Platform Analytics</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- User Statistics Cards -->
      <div 
        v-for="(stat, key) in userStats" 
        :key="key" 
        class="bg-white shadow-md rounded-lg p-6 flex flex-col"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">{{ stat.title }}</h3>
          <i :class="stat.icon" class="text-2xl opacity-50"></i>
        </div>
        <div class="text-3xl font-bold text-blue-600">{{ stat.value }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- User Growth Chart -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">User Growth</h3>
        <canvas ref="userGrowthChart"></canvas>
      </div>

      <!-- Business Assessment Insights -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Business Assessment Insights</h3>
        <canvas ref="industryChart"></canvas>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Recent User Activity -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Recent User Activity</h3>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-3 text-left">User</th>
              <th class="p-3 text-left">Action</th>
              <th class="p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="activity in recentActivities" 
              :key="activity.id" 
              class="border-b hover:bg-gray-50"
            >
              <td class="p-3">{{ activity.username }}</td>
              <td class="p-3">{{ activity.action }}</td>
              <td class="p-3">{{ formatTime(activity.timestamp) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Top Industries -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Top Industries</h3>
        <canvas ref="topIndustriesChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Chart from 'chart.js/auto';

export default {
  setup() {
    const userStats = ref({
      totalUsers: { title: 'Total Users', value: 0, icon: 'fas fa-users' },
      activeUsers: { title: 'Active Users', value: 0, icon: 'fas fa-user-check' },
      newUsers: { title: 'New Users (30d)', value: 0, icon: 'fas fa-user-plus' },
      adminUsers: { title: 'Admin Users', value: 0, icon: 'fas fa-user-shield' }
    });

    const recentActivities = ref([]);
    const unsubscribers = [];

    // User Growth Chart
    const userGrowthChart = ref(null);
    const userGrowthChartInstance = ref(null);

    // Industry Chart
    const industryChart = ref(null);
    const industryChartInstance = ref(null);

    // Top Industries Chart
    const topIndustriesChart = ref(null);
    const topIndustriesChartInstance = ref(null);

    const fetchUserStats = () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const users = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Calculate user statistics
        userStats.value.totalUsers.value = users.length;
        userStats.value.activeUsers.value = users.filter(u => u.isOnline).length;
        
        // New users in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        userStats.value.newUsers.value = users.filter(u => 
          new Date(u.createdAt) > thirtyDaysAgo
        ).length;

        userStats.value.adminUsers.value = users.filter(u => u.isAdmin).length;
      });

      unsubscribers.push(unsubscribe);
    };

    const fetchRecentActivities = () => {
      const activitiesRef = collection(db, 'userActivities');
      const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(10));

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

    const initCharts = () => {
      // User Growth Chart
      if (userGrowthChart.value) {
        userGrowthChartInstance.value = new Chart(userGrowthChart.value, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'User Growth',
              data: [12, 19, 3, 5, 2, 3],
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
      }

      // Industry Chart
      if (industryChart.value) {
        industryChartInstance.value = new Chart(industryChart.value, {
          type: 'pie',
          data: {
            labels: ['Technology', 'Retail', 'Finance', 'Healthcare', 'Other'],
            datasets: [{
              data: [30, 20, 15, 10, 25],
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)'
              ]
            }]
          }
        });
      }

      // Top Industries Chart
      if (topIndustriesChart.value) {
        topIndustriesChartInstance.value = new Chart(topIndustriesChart.value, {
          type: 'bar',
          data: {
            labels: ['Technology', 'Retail', 'Finance', 'Healthcare', 'Other'],
            datasets: [{
              label: 'Business Assessments',
              data: [45, 30, 25, 20, 15],
              backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    onMounted(() => {
      fetchUserStats();
      fetchRecentActivities();
      
      // Use nextTick to ensure DOM is rendered
      setTimeout(initCharts, 100);
    });

    onUnmounted(() => {
      // Cleanup subscriptions
      unsubscribers.forEach(unsub => unsub());

      // Destroy chart instances
      [userGrowthChartInstance, industryChartInstance, topIndustriesChartInstance].forEach(chart => {
        if (chart.value) chart.value.destroy();
      });
    });

    return {
      userStats,
      recentActivities,
      userGrowthChart,
      industryChart,
      topIndustriesChart,
      formatTime
    };
  }
};
</script>

<style scoped>
/* Optional additional styling */
</style>
