import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<ID-del-proyecto>.firebaseapp.com",
  projectId: "<ID-del-proyecto>",
  storageBucket: "<ID-del-proyecto>.firebasestorage.app",
  messagingSenderId: "<SENDER_ID>",
  appId: "<APP_ID>"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);