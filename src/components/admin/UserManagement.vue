<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
    
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-4 bg-gray-50 flex justify-between items-center">
        <input 
          v-model="searchQuery" 
          placeholder="Search users..." 
          class="w-full max-w-md px-3 py-2 border rounded-lg"
        />
        <div class="ml-4">
          <select 
            v-model="filterRole" 
            class="px-3 py-2 border rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <table class="w-full">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="p-3 text-left">Username</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Role</th>
            <th class="p-3 text-left">Last Active</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="user in filteredUsers" 
            :key="user.id" 
            class="border-b hover:bg-gray-50"
          >
            <td class="p-3">{{ user.username }}</td>
            <td class="p-3">{{ user.email }}</td>
            <td class="p-3">
              <span 
                :class="user.isAdmin ? 'text-red-600' : 'text-green-600'"
              >
                {{ user.isAdmin ? 'Admin' : 'User' }}
              </span>
            </td>
            <td class="p-3">{{ formatLastActive(user.lastActive) }}</td>
            <td class="p-3">
              <div class="flex space-x-2">
                <button 
                  @click="viewUserDetails(user)" 
                  class="text-blue-500 hover:text-blue-700"
                >
                  View
                </button>
                <button 
                  @click="toggleUserStatus(user)" 
                  :class="user.isActive ? 'text-red-500' : 'text-green-500'"
                >
                  {{ user.isActive ? 'Deactivate' : 'Activate' }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div 
        v-if="filteredUsers.length === 0" 
        class="p-4 text-center text-gray-500"
      >
        No users found
      </div>
    </div>

    <!-- User Details Modal -->
    <div 
      v-if="selectedUser" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <h3 class="text-xl font-bold mb-4">User Details</h3>
        <p><strong>Username:</strong> {{ selectedUser.username }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Role:</strong> {{ selectedUser.isAdmin ? 'Admin' : 'User' }}</p>
        <p><strong>Last Active:</strong> {{ formatLastActive(selectedUser.lastActive) }}</p>
        <button 
          @click="selectedUser = null" 
          class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { collection, query, onSnapshot, where, orderBy, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default {
  setup() {
    const users = ref([]);
    const searchQuery = ref('');
    const filterRole = ref('');
    const selectedUser = ref(null);

    const fetchUsers = () => {
      const usersRef = collection(db, 'users');
      const adminsRef = collection(db, 'admins');
      const q = query(usersRef, orderBy('lastActive', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        users.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          isActive: doc.data().isActive !== false // Default to true if not specified
        }));
      });

      const adminsQ = query(adminsRef, orderBy('lastActive', 'desc'));
      onSnapshot(adminsQ, (snapshot) => {
        snapshot.docs.forEach(doc => {
          const user = {
            id: doc.id,
            ...doc.data(),
            isAdmin: true, // Mark as admin
            isActive: doc.data().isActive !== false
          };
          users.value.push(user);
        });
      });

      return unsubscribe;
    };

    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        const matchesRole = filterRole.value === '' || 
          (filterRole.value === 'admin' && user.isAdmin) ||
          (filterRole.value === 'user' && !user.isAdmin);
        
        return matchesSearch && matchesRole;
      });
    });

    const formatLastActive = (timestamp) => {
      if (!timestamp) return 'Never';
      
      try {
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
          Math.round((date - new Date()) / (1000 * 60)), 
          'minutes'
        );
      } catch {
        return 'Invalid date';
      }
    };

    const viewUserDetails = (user) => {
      selectedUser.value = user;
    };

    const toggleUserStatus = async (user) => {
      try {
        const userRef = doc(db, user.isAdmin ? 'admins' : 'users', user.id);
        
        // Check if 'isOnline' exists, if not initialize it as true
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          throw new Error("User not found.");
        }

        const userData = userDoc.data();
        const newStatus = userData.isOnline !== undefined ? !userData.isOnline : true;

        // Update the user's 'isOnline' status in Firestore
        await updateDoc(userRef, {
          isOnline: newStatus
        });

        console.log(`User ${user.username} status updated to ${newStatus ? 'Active' : 'Inactive'}`);
      } catch (error) {
        console.error('Error toggling user status:', error);
        // Optionally, you could trigger a toast or alert here for user feedback
      }
    };

    onMounted(() => {
      const unsubscribe = fetchUsers();
      return () => unsubscribe();
    });

    return {
      users,
      searchQuery,
      filterRole,
      filteredUsers,
      selectedUser,
      formatLastActive,
      viewUserDetails,
      toggleUserStatus
    };
  }
};
</script>

<style scoped>
/* Optional additional styling */
</style>
