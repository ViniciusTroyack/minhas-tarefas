import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2Ju_HGh8VlhX4_IUfiHXqIf8ECiG0-Kc",
  authDomain: "minhas-tarefas-b4a02.firebaseapp.com",
  projectId: "minhas-tarefas-b4a02",
  storageBucket: "minhas-tarefas-b4a02.appspot.com",
  messagingSenderId: "405861611973",
  appId: "1:405861611973:web:e349c7277452f87e0673ac",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
