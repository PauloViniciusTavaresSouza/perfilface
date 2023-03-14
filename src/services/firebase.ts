import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAFKUNeG_q1MFPSSh8XDsq5ar1JpZpMGTU",
  authDomain: "auth-face-6b5ff.firebaseapp.com",
  projectId: "auth-face-6b5ff",
  storageBucket: "auth-face-6b5ff.appspot.com",
  messagingSenderId: "68963567777",
  appId: "1:68963567777:web:5dc3889e1796965bf2c8e0"
};

 
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)