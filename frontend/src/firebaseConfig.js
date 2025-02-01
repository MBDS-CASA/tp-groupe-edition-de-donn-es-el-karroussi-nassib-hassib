

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyB0xBgNDjhL6KeBcjXCVODM32gvabpEKog",
authDomain: "reacttp-95cf9.firebaseapp.com",
projectId: "reacttp-95cf9",
storageBucket: "reacttp-95cf9.firebasestorage.app",
messagingSenderId: "723391884351",
appId: "1:723391884351:web:e9166fe38cb5295d951c8a",
measurementId: "G-R49WDEGR7H"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Fetch User Role
const getUserData = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? { email: userDoc.data().email, role: userDoc.data().role } : null;
};

// Register User
const registerUser = async (email, password, role = "STUDENT") => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role in Firestore
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role
    });

    return user;
};

export { auth, provider, db, registerUser, getUserData };
