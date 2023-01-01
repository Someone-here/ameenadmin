import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRq5TrFxPGbPckJFdStzkwM_YZnWRGNH4",
  authDomain: "ameen-security.firebaseapp.com",
  projectId: "ameen-security",
  storageBucket: "ameen-security.appspot.com",
  messagingSenderId: "876454143376",
  appId: "1:876454143376:web:fefa240518d8abfc907f15",
  measurementId: "G-KCLE2WB6VN"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);