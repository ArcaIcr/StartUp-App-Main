import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Function to register a new user
export async function register(username, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
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
      auth,
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

// Function to save assessment data to Firestore
export async function saveAssessmentToFirestore(userId, assessmentData) {
  try {
    const assessmentRef = doc(db, "assessments", userId);
    await setDoc(assessmentRef, assessmentData);
  } catch (error) {
    throw new Error("Error saving assessment: " + error.message);
  }
}
