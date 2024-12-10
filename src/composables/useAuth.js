import { ref, computed } from 'vue';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

export function useAuth() {
    const user = ref(null);
    const userRole = ref('user'); // Default role

    // Watch auth state changes
    onAuthStateChanged(auth, (userData) => {
        if (userData) {
            user.value = userData;
            // Here you would typically fetch the user's role from your database
            // For now, we'll use a simple check
            checkUserRole(userData.uid);
        } else {
            user.value = null;
            userRole.value = 'user';
        }
    });

    // Check user role from database
    const checkUserRole = async (uid) => {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                userRole.value = docSnap.data().role || 'user';
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            userRole.value = 'user';
        }
    };

    // Computed properties
    const isAuthenticated = computed(() => !!user.value);
    const isMaker = computed(() => userRole.value === 'maker');
    const isUser = computed(() => userRole.value === 'user');

    return {
        user,
        userRole,
        isAuthenticated,
        isMaker,
        isUser
    };
}
