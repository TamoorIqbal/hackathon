import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD2giPE4RbjHoT4foybJ62oG8Ri8XK4TFc",
  authDomain: "hackathon-e7398.firebaseapp.com",
  projectId: "hackathon-e7398",
  storageBucket: "hackathon-e7398.appspot.com",
  messagingSenderId: "727391204370",
  appId: "1:727391204370:web:3a490a7faa36cad0f8d4cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

// apiKey: process.env.REACT_APP_API_KEY,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_APP_ID,
