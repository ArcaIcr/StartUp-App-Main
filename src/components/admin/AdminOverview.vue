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

    <!-- Add User Form -->
    <div v-if="showAddUserForm" class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 class="text-xl font-semibold mb-4">Add New User</h3>
      <form @submit.prevent="handleAddUser">
        <div class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input 
              v-model="newUser.name"
              type="text"
              id="name"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter name"
              required
            />
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              v-model="newUser.email"
              type="email"
              id="email"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter email"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input 
              v-model="newUser.password"
              type="password"
              id="password"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              placeholder="Enter password"
              required
            />
          </div>

          <!-- Account Type -->
          <div>
            <label for="accountType" class="block text-sm font-medium text-gray-700">Account Type</label>
            <select 
              v-model="newUser.accountType"
              id="accountType"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superAdmin">Super Admin</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label for="isOnline" class="block text-sm font-medium text-gray-700">Status</label>
            <select 
              v-model="newUser.isOnline"
              id="isOnline"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            >
              <option value="true">Online</option>
              <option value="false">Offline</option>
            </select>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4">
            <button 
              type="button" 
              @click="toggleAddUserForm" 
              class="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
            >
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Recent System Activity</h3>
        <ul class="divide-y divide-gray-200">
          <li 
            v-for="activity in filteredActivities" 
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

    <!-- Report Format Selection -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 class="text-xl font-semibold mb-4">Choose Report Format</h3>
      <select 
        v-model="reportFormat"
        class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
      >
        <option value="pdf">PDF</option>
        <option value="csv">CSV</option>
        <option value="excel">Excel</option>
      </select>
      <button 
        @click="generateReport"
        class="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
      >
        Generate Report
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { collection, query, onSnapshot, orderBy, limit, where, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import jsPDF from 'jspdf'; // Import jsPDF
import { saveAs } from 'file-saver'; // For CSV and Excel file saving
import * as XLSX from 'xlsx'; // For Excel file generation

export default {
  setup() {
    const showAddUserForm = ref(false);
    const newUser = ref({ name: '', email: '', password: '', accountType: 'user', isOnline: true });
    const reportFormat = ref('pdf'); // To store selected report format

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
    const filteredActivities = ref([]); // For filtered activities based on status/role
    const unsubscribers = [];

    const quickActions = [
      {
        name: 'Add User',
        icon: 'pi pi-user-plus',
        handler: () => {
          toggleAddUserForm(); 
        },
      },
      {
        name: 'System Settings',
        icon: 'pi pi-cog',
        handler: () => {
          console.log('Navigating to system settings');
        },
      },
      {
        name: 'Send Notification',
        icon: 'pi pi-bell',
        handler: async () => {
          try {
            await addDoc(collection(db, 'systemActivities'), {
              description: 'New notification sent',
              timestamp: new Date(),
              type: 'info',
            });
          } catch (error) {
            console.error('Error adding document:', error);
          }
        },
      },
    ];

    const getActivityBadgeClass = (type) => {
      switch (type) {
        case 'error': return 'bg-red-500 text-white';
        case 'info': return 'bg-blue-500 text-white';
        case 'success': return 'bg-green-500 text-white';
        default: return 'bg-gray-500 text-white';
      }
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    };

    const toggleAddUserForm = () => {
      showAddUserForm.value = !showAddUserForm.value;
    };

    const handleAddUser = async () => {
      try {
        await addDoc(collection(db, 'users'), {
          name: newUser.value.name,
          email: newUser.value.email,
          password: newUser.value.password,
          accountType: newUser.value.accountType,
          isOnline: newUser.value.isOnline,
        });
        toggleAddUserForm(); // Close form after submission
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    const fetchUserStats = async () => {
      // Fetch total users
      const totalUsersQuery = query(collection(db, 'users'));
      const totalUsersSnapshot = await getDocs(totalUsersQuery);
      quickStats.value.totalUsers.value = totalUsersSnapshot.size;

      // Fetch active users
      const activeUsersQuery = query(collection(db, 'users'), where('isOnline', '==', true));
      const activeUsersSnapshot = await getDocs(activeUsersQuery);
      quickStats.value.activeUsers.value = activeUsersSnapshot.size;

      // Fetch new users within the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const newUsersQuery = query(
        collection(db, 'users'),
        where('createdAt', '>=', thirtyDaysAgo)
      );
      const newUsersSnapshot = await getDocs(newUsersQuery);
      quickStats.value.newUsers.value = newUsersSnapshot.size;
    };

    onMounted(() => {
      fetchUserStats();
    });

    // Toast for download confirmation
    const toast = (message) => {
      alert(message);
    };

    const generateReport = () => {
      switch (reportFormat.value) {
        case 'pdf':
          generatePDFReport();
          break;
        case 'csv':
          generateCSVReport();
          break;
        case 'excel':
          generateExcelReport();
          break;
      }
    };

    const generatePDFReport = () => {
      const doc = new jsPDF();
      doc.text('User Report', 20, 20);
      doc.text('Total Users: ' + quickStats.value.totalUsers.value, 20, 30);
      doc.text('Active Users: ' + quickStats.value.activeUsers.value, 20, 40);
      doc.text('New Users: ' + quickStats.value.newUsers.value, 20, 50);
      doc.save('user_report.pdf');
      toast('PDF Report Generated');
    };

    const generateCSVReport = () => {
      const data = [
        ['Total Users', quickStats.value.totalUsers.value],
        ['Active Users', quickStats.value.activeUsers.value],
        ['New Users', quickStats.value.newUsers.value]
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'User Report');
      const csvOutput = XLSX.write(wb, { bookType: 'csv', type: 'binary' });

      saveAs(new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' }), 'user_report.csv');
      toast('CSV Report Generated');
    };

    const generateExcelReport = () => {
      const data = [
        ['Total Users', quickStats.value.totalUsers.value],
        ['Active Users', quickStats.value.activeUsers.value],
        ['New Users', quickStats.value.newUsers.value]
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'User Report');
      const excelOutput = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

      saveAs(new Blob([excelOutput], { type: 'application/octet-stream' }), 'user_report.xlsx');
      toast('Excel Report Generated');
    };

    return {
      showAddUserForm,
      newUser,
      quickStats,
      reportFormat,
      toggleAddUserForm,
      handleAddUser,
      fetchUserStats,
      quickActions,
      generateReport,
      generatePDFReport,
      generateCSVReport,
      generateExcelReport,
      getActivityBadgeClass,
      formatTime,
      recentActivities,
    };
  },
};
</script>
