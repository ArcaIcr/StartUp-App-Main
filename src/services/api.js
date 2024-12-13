import axios from 'axios';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection 
} from 'firebase/firestore';
import { app, auth, db } from '@/firebaseConfig';

const API_BASE_URL = 'https://startup-compass-api.onrender.com';

// Create axios instance with timeout and retry logic
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  async error => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Check if it's a timeout error
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    // Handle specific error cases
    if (error.response?.status === 500) {
      throw new Error('Server error. Using fallback data.');
    }

    throw error;
  }
);

export const authService = {
  // Register a regular user
  async registerUser(email, password, userData) {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore regular users collection
      const userDocRef = doc(db, 'users', 'regular', user.uid);
      await setDoc(userDocRef, {
        ...userData,
        email,
        createdAt: new Date(),
        status: 'active',
        role: 'user'
      });

      return user;
    } catch (error) {
      console.error('User registration error:', error);
      throw error;
    }
  },

  // Register an admin user
  async registerAdmin(email, password, adminData, adminCode) {
    // Validate admin registration code
    if (adminCode !== 'ADMIN123') {
      throw new Error('Invalid admin registration code');
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore admin users collection
      const adminDocRef = doc(db, 'users', 'admin', user.uid);
      await setDoc(adminDocRef, {
        ...adminData,
        email,
        createdAt: new Date(),
        status: 'active',
        role: 'admin'
      });

      // Set custom admin claim
      // Note: This would typically be done server-side with Firebase Cloud Functions
      // For now, we'll simulate it by adding a token
      await user.getIdToken(true);

      return user;
    } catch (error) {
      console.error('Admin registration error:', error);
      throw error;
    }
  },

  // Login method (works for both regular and admin users)
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user exists in either regular or admin collection
      const regularUserRef = doc(db, 'users', 'regular', user.uid);
      const adminUserRef = doc(db, 'users', 'admin', user.uid);

      const [regularUserSnap, adminUserSnap] = await Promise.all([
        getDoc(regularUserRef),
        getDoc(adminUserRef)
      ]);

      if (regularUserSnap.exists()) {
        return { 
          ...regularUserSnap.data(), 
          uid: user.uid, 
          isAdmin: false 
        };
      }

      if (adminUserSnap.exists()) {
        return { 
          ...adminUserSnap.data(), 
          uid: user.uid, 
          isAdmin: true 
        };
      }

      throw new Error('User not found in any collection');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout method
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  }
};

export const getIndustryInsights = async (industry, businessScale) => {
  try {
    const response = await api.post('/api/industry-insights', {
      industry,
      businessScale
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching industry insights:', error);
    // Return fallback data
    return {
      overview: `${industry} industry analysis - Currently showing static data due to server issues.`,
      opportunities: [
        'Digital transformation',
        'Market expansion',
        'Process optimization'
      ],
      recommendations: [
        'Focus on core business strengths',
        'Invest in digital capabilities',
        'Build customer relationships'
      ],
      marketGrowth: 8.5,
      growthTrend: 5,
      marketShare: 3.2,
      shareTrend: 1.5
    };
  }
};

export const getGrowthPredictions = async (businessData) => {
  try {
    const response = await api.post('/api/predictions/growth', businessData);
    return response.data;
  } catch (error) {
    console.error('Error fetching growth predictions:', error);
    throw error;
  }
};

export const getRecommendations = async (assessmentData) => {
  try {
    const response = await api.post('/api/business-recommendations', assessmentData);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Return fallback data
    return {
      challenges: [
        {
          name: 'Market Competition',
          priority: 'High',
          description: 'Increasing competition requires strategic positioning',
          recommendedActions: [
            'Conduct competitor analysis',
            'Develop unique value proposition',
            'Focus on customer retention'
          ]
        },
        {
          name: 'Operational Efficiency',
          priority: 'Medium',
          description: 'Streamlining operations can improve profit margins',
          recommendedActions: [
            'Implement automation tools',
            'Optimize business processes',
            'Train staff on efficiency'
          ]
        },
        {
          name: 'Digital Presence',
          priority: 'Medium',
          description: 'Enhanced online presence needed for growth',
          recommendedActions: [
            'Develop digital marketing strategy',
            'Improve online presence',
            'Implement analytics tracking'
          ]
        }
      ]
    };
  }
};

export const getMarketAnalysis = async (industry, location) => {
  try {
    const response = await api.post('/api/market-analysis', {
      industry,
      location
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market analysis:', error);
    // Return fallback data
    return {
      marketGrowth: 8.5,
      growthTrend: 5,
      marketShare: 3.2,
      shareTrend: 1.5
    };
  }
};

export const getCompetitorAnalysis = async (industry, location, businessScale) => {
  try {
    const response = await api.get(`/api/competitor-analysis/${industry}/${location}/${businessScale}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competitor analysis:', error);
    throw error;
  }
};
