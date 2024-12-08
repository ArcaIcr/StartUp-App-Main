import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Initialize auth variable properly
const authInstance = getAuth(); // Initialize it here

// Function to register a new user
export async function register(username, email, password, isAdmin = false) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    const user = userCredential.user;

    // Determine the collection based on user type
    const collectionName = isAdmin ? "admins" : "users";

    await setDoc(doc(db, collectionName, user.uid), {
      username,
      email,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      isOnline: true,
      // Additional admin-specific or user-specific fields can be added here
      ...(isAdmin ? { adminLevel: 'standard' } : {})
    });

    return { ...user, username, isAdmin, collectionName };
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
}

// Function to login a user
export async function login(email, password) {
  try {
    console.log('Attempting Firebase authentication...');
    const userCredential = await signInWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    console.log('Firebase authentication successful');
    
    const user = userCredential.user;
    if (!user) {
      console.error('No user data in userCredential');
      throw new Error('Authentication failed');
    }

    console.log('Attempting to find user document for UID:', user.uid);

    // Check both users and admins collections
    let userData = null;
    let collectionName = null;

    // First, try users collection
    const usersDocRef = doc(db, 'users', user.uid);
    const adminsDocRef = doc(db, 'admins', user.uid);

    try {
      const usersDocSnap = await getDoc(usersDocRef);
      if (usersDocSnap.exists()) {
        userData = usersDocSnap;
        collectionName = 'users';
        console.log('User found in users collection');
      }
    } catch (usersError) {
      console.warn('Error checking users collection:', usersError);
    }

    // If not in users, try admins collection
    if (!userData) {
      try {
        const adminsDocSnap = await getDoc(adminsDocRef);
        if (adminsDocSnap.exists()) {
          userData = adminsDocSnap;
          collectionName = 'admins';
          console.log('User found in admins collection');
        }
      } catch (adminsError) {
        console.warn('Error checking admins collection:', adminsError);
      }
    }

    // If still no user data, log all details for debugging
    if (!userData) {
      console.error('Detailed user info:', {
        uid: user.uid,
        email: user.email,
        providerId: user.providerId
      });
      throw new Error(`User document not found for UID: ${user.uid}`);
    }

    const userDetails = userData.data();

    // Attempt to update last active timestamp, but don't fail if it doesn't work
    try {
      await updateDoc(userData.ref, {
        lastActive: new Date().toISOString(),
        isOnline: true
      });
    } catch (updateError) {
      console.warn('Could not update user last active status:', updateError);
    }

    return { 
      ...user, 
      ...userDetails, 
      collectionName 
    };
  } catch (error) {
    console.error('Login error details:', {
      code: error.code,
      message: error.message,
      name: error.name
    });
    throw new Error(error.message || 'Login failed');
  }
}

// Reset Password
export const sendPasswordResetEmail = async (email) => {
  return await firebaseSendPasswordResetEmail(authInstance, email);
};

// Function to save assessment data to Firestore
export async function saveAssessmentToFirestore(userId, assessmentData) {
  try {
    const assessmentRef = doc(db, "assessments", userId);
    await setDoc(assessmentRef, assessmentData);
  } catch (error) {
    throw new Error("Error saving assessment: " + error.message);
  }
}

// Function to save payment information to Firestore
export async function savePaymentInfo(userId, paymentInfo) {
  try {
    const paymentRef = doc(db, "payments", userId); // Create or overwrite payment document
    await setDoc(paymentRef, paymentInfo);
  } catch (error) {
    throw new Error("Error saving payment information: " + error.message);
  }
}
