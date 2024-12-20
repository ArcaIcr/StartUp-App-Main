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
import { collection, query, onSnapshot, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default {
  setup() {
    const showAddUserForm = ref(false); // State to toggle form visibility
    const newUser = ref({ name: '', email: '', password: '', accountType: 'user', isOnline: true });

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
          toggleAddUserForm(); // Toggle form visibility
        },
      },
      {
        name: 'Generate Report',
        icon: 'pi pi-file-pdf',
        handler: () => {
          console.log('Report generated:', quickStats.value);
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
              description: 'Notification sent to all users',
              timestamp: new Date(),
              type: 'notification',
            });
            console.log('Notification sent successfully');
          } catch (error) {
            console.error('Error sending notification:', error);
          }
        },
      },
    ];

    const fetchUserStats = () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        quickStats.value.totalUsers.value = users.length;
        quickStats.value.activeUsers.value = users.filter((u) => u.isOnline).length;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        quickStats.value.newUsers.value = users.filter((u) => {
          if (u.createdAt && u.createdAt.toDate) {
            return u.createdAt.toDate() > thirtyDaysAgo;
          }
          return false;
        }).length;
      });

      unsubscribers.push(unsubscribe);
    };

    const fetchRecentActivities = () => {
      const activitiesRef = collection(db, 'systemActivities');
      const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(5));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        recentActivities.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
        login: 'bg-green-100 text-green-800',
        logout: 'bg-red-100 text-red-800',
        registration: 'bg-blue-100 text-blue-800',
        notification: 'bg-yellow-100 text-yellow-800',
        default: 'bg-gray-100 text-gray-800',
      };
      return badgeClasses[type] || badgeClasses.default;
    };

    const toggleAddUserForm = () => {
      showAddUserForm.value = !showAddUserForm.value;
    };

    const handleAddUser = async () => {
      try {
        // Determine collection based on account type
        let userCollection = 'users'; // Default collection for normal users
        let adminLevel = null;

        if (newUser.value.accountType === 'admin' || newUser.value.accountType === 'superAdmin') {
          userCollection = 'admins'; // Add to admins collection
          if (newUser.value.accountType === 'superAdmin') {
            adminLevel = 'super'; // Set adminLevel to 'super' for super admin
          }
        }

        // Add user to the correct collection
        await addDoc(collection(db, userCollection), {
          name: newUser.value.name,
          email: newUser.value.email,
          password: newUser.value.password, // Store password securely (preferably hashed)
          accountType: newUser.value.accountType,
          isOnline: newUser.value.isOnline,
          createdAt: new Date(),
          adminLevel, // Only set for admins and super admins
        });

        console.log('User added successfully');
        showAddUserForm.value = false; // Hide the form after submission
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    onMounted(() => {
      fetchUserStats();
      fetchRecentActivities();
    });

    onUnmounted(() => {
      unsubscribers.forEach((unsub) => unsub());
    });

    return {
      showAddUserForm,
      newUser,
      quickStats,
      recentActivities,
      quickActions,
      formatTime,
      getActivityBadgeClass,
      toggleAddUserForm,
      handleAddUser,
    };
  },
};
</script>
