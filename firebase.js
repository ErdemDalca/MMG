import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAtWDtqnO95C3JoxX7sji3Rj_RrxfmSvk8",
  authDomain: "mmgame-19f84.firebaseapp.com",
  databaseURL: "https://mmgame-19f84-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mmgame-19f84",
  storageBucket: "mmgame-19f84.appspot.com",
  messagingSenderId: "435877732710",
  appId: "1:435877732710:web:f6d908f079b3ea27f128a7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getDatabase(app);
const storage = getStorage(app); 

export { auth, db, storage };
