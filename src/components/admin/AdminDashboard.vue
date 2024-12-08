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
              <router-link
                to="/admin/users"
                class="text-white hover:bg-teal-800 p-2 rounded flex items-center space-x-2"
              >
                <i class="pi pi-users"></i>
                <span>User Management</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/analytics"
                class="text-white hover:bg-teal-800 p-2 rounded flex items-center space-x-2"
              >
                <i class="pi pi-chart-bar"></i>
                <span>Analytics</span>
              </router-link>
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

    <div class="flex-1 flex flex-col bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow-md p-4">
        <h1 class="text-2xl font-semibold text-gray-800">User Management</h1>
      </header>

      <!-- Main Content -->
      <main class="p-6">
        <!-- User Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p class="text-3xl font-bold text-teal-600">{{ totalUsers }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Online Users</h3>
            <p class="text-3xl font-bold text-green-600">{{ onlineUsers }}</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">New Users (Today)</h3>
            <p class="text-3xl font-bold text-blue-600">{{ newUsers }}</p>
          </div>
        </div>

        <!-- User List -->
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-4 border-b">
            <h2 class="text-xl font-semibold text-gray-800">User List</h2>
          </div>
          <div class="p-4">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          :src="user.photoURL || '/default-avatar.png'"
                          class="h-10 w-10 rounded-full"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.displayName }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        user.isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      ]"
                    >
                      {{ user.isOnline ? 'Online' : 'Offline' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatLastActive(user.lastActive) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="viewUserDetails(user)"
                      class="text-teal-600 hover:text-teal-900 mr-3"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebaseConfig';
import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter();
    const users = ref([]);
    const totalUsers = ref(0);
    const onlineUsers = ref(0);
    const newUsers = ref(0);
    let unsubscribe = null;

    const handleLogout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    const viewUserDetails = (user) => {
      router.push(`/admin/users/${user.id}`);
    };

    const formatLastActive = (timestamp) => {
      if (!timestamp) return 'Never';
      
      let date;
      try {
        // Handle Firestore Timestamp
        if (timestamp && typeof timestamp.toDate === 'function') {
          date = timestamp.toDate();
        }
        // Handle ISO string
        else if (typeof timestamp === 'string') {
          date = new Date(timestamp);
        }
        // Handle JavaScript Date object
        else if (timestamp instanceof Date) {
          date = timestamp;
        }
        // Handle invalid timestamp
        else {
          return 'Invalid date';
        }

        // Calculate time difference in minutes
        const diffMinutes = Math.round((date - new Date()) / (1000 * 60));
        
        // Format relative time
        if (Math.abs(diffMinutes) < 60) { // Less than an hour
          return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(diffMinutes, 'minutes');
        } else if (Math.abs(diffMinutes) < 1440) { // Less than a day
          return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(Math.round(diffMinutes/60), 'hours');
        } else { // More than a day
          return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(Math.round(diffMinutes/1440), 'days');
        }
      } catch (error) {
        console.error('Error formatting timestamp:', error);
        return 'Invalid date';
      }
    };

    onMounted(() => {
      // Subscribe to users collection
      const usersRef = collection(db, 'users');
      const q = query(usersRef, orderBy('lastActive', 'desc'));
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        users.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        totalUsers.value = users.value.length;
        onlineUsers.value = users.value.filter(user => user.isOnline).length;
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        newUsers.value = users.value.filter(user => {
  let createdAt;
  if (user.createdAt instanceof Date) {
    createdAt = user.createdAt;
  } else if (user.createdAt && typeof user.createdAt.toDate === 'function') {
    createdAt = user.createdAt.toDate();
  } else {
    createdAt = new Date(user.createdAt);
  }

  return createdAt >= today;
}).length;
      });
    });

    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });

    return {
      users,
      totalUsers,
      onlineUsers,
      newUsers,
      handleLogout,
      viewUserDetails,
      formatLastActive
    };
  }
};
</script>
