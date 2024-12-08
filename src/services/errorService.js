import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig';

class ErrorService {
  constructor() {
    this.errorLog = ref([]);
    this.maxErrorLogSize = 100;
  }

  // Log error to local state and Firestore
  async logError(error, context = {}) {
    const errorObject = {
      message: error.message || 'Unknown error',
      code: error.code || 'UNKNOWN',
      timestamp: new Date(),
      context: {
        ...context,
        userId: auth.currentUser?.uid || 'anonymous',
        userEmail: auth.currentUser?.email || 'anonymous'
      },
      stack: error.stack || 'No stack trace'
    };

    // Add to local error log
    this.errorLog.value.push(errorObject);

    // Trim error log if it exceeds max size
    if (this.errorLog.value.length > this.maxErrorLogSize) {
      this.errorLog.value.shift();
    }

    try {
      // Log to Firestore for admin review
      await addDoc(collection(db, 'systemErrors'), errorObject);
    } catch (firestoreError) {
      console.error('Failed to log error to Firestore:', firestoreError);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Logged Error:', errorObject);
    }

    return errorObject;
  }

  // Centralized error handler for async operations
  async handleError(asyncFn, context = {}) {
    try {
      return await asyncFn();
    } catch (error) {
      return this.logError(error, context);
    }
  }

  // Get formatted error message
  getErrorMessage(error) {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email address.',
      'auth/user-disabled': 'This user account has been disabled.',
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'Email is already registered.',
      'permission-denied': 'You do not have permission to perform this action.',
      'not-found': 'The requested resource was not found.',
      'network-error': 'Network error. Please check your connection.',
      'UNKNOWN': 'An unexpected error occurred.'
    };

    return errorMessages[error.code] || error.message || errorMessages['UNKNOWN'];
  }

  // Clear error log
  clearErrorLog() {
    this.errorLog.value = [];
  }
}

export default new ErrorService();
