import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Initialize auth variable properly
const authInstance = getAuth(); // Initialize it here

// Function to register a new user
export async function register(username, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message || "Registration failed");
  }
}

// Function to login a user
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      authInstance,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...user, ...userDoc.data() };
    } else {
      return user;
    }
  } catch (error) {
    throw new Error(error.message || "Login failed");
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
