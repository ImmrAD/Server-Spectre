// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  addDoc,
  serverTimestamp,
  enableIndexedDbPersistence
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKhO8MFnT6tVehbHn2mPB-i2-V7-4Si5Y",
    authDomain: "serverspectres-bbd1c.firebaseapp.com",
    projectId: "serverspectres-bbd1c",
    storageBucket: "serverspectres-bbd1c.appspot.com",
    messagingSenderId: "725545782441",
    appId: "1:725545782441:web:e12fe3382076f93964edb8",
    measurementId: "G-DJ0HNBY7J9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore with settings to handle offline persistence and error handling
const db = getFirestore(app, {
  cacheSizeBytes: 50 * 1024 * 1024, // 50MB cache size
  experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: true,
  cache: 'persistent' // Enable persistent caching
});
const storage = getStorage(app);

// Authentication functions
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password, userData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Save additional user data
  await setDoc(doc(db, "users", user.uid), {
    ...userData,
    role: userData.role || "student",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  return userCredential;
};

export const logoutUser = () => {
  return signOut(auth);
};

// User data functions
export const getUserProfile = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User profile not found");
  }
};

export const updateUserProfile = async (userId, data) => {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// Scenario functions
export const getScenarios = async (filters = {}) => {
  let scenariosQuery = collection(db, "scenarios");
  
  if (filters.difficulty) {
    scenariosQuery = query(
      scenariosQuery, 
      where("difficulty", "==", filters.difficulty)
    );
  }
  
  if (filters.category) {
    scenariosQuery = query(
      scenariosQuery, 
      where("category", "==", filters.category)
    );
  }
  
  const querySnapshot = await getDocs(scenariosQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getScenario = async (scenarioId) => {
  const docRef = doc(db, "scenarios", scenarioId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } else {
    throw new Error("Scenario not found");
  }
};

export const createScenario = async (scenarioData) => {
  return addDoc(collection(db, "scenarios"), {
    ...scenarioData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

// Progress tracking functions
export const getUserProgress = async (userId) => {
  const progressQuery = query(
    collection(db, "progress"),
    where("userId", "==", userId)
  );
  
  const querySnapshot = await getDocs(progressQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateUserProgress = async (userId, scenarioId, interactions) => {
  // Check if progress document exists
  const progressQuery = query(
    collection(db, "progress"),
    where("userId", "==", userId),
    where("scenarioId", "==", scenarioId)
  );
  
  const querySnapshot = await getDocs(progressQuery);
  
  if (querySnapshot.empty) {
    // Create new progress document
    return addDoc(collection(db, "progress"), {
      userId,
      scenarioId,
      interactions,
      completionPercentage: calculateCompletionPercentage(interactions),
      lastUpdated: serverTimestamp()
    });
  } else {
    // Update existing progress document
    const progressDoc = querySnapshot.docs[0];
    return updateDoc(doc(db, "progress", progressDoc.id), {
      interactions,
      completionPercentage: calculateCompletionPercentage(interactions),
      lastUpdated: serverTimestamp()
    });
  }
};

// Helper function to calculate progress
const calculateCompletionPercentage = (interactions) => {
  // This would depend on your specific logic for calculating progress
  // For example, number of unique interactions / total required interactions
  return Math.min(100, Math.floor((interactions.length / 10) * 100));
};

export { auth, db, storage };