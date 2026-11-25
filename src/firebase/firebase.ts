import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfYXa01GqTtCi97BexexQ9NdjTsfjbwDc",
  authDomain: "data-repository-932c1.firebaseapp.com",
  databaseURL: "https://data-repository-932c1-default-rtdb.firebaseio.com",
  projectId: "data-repository-932c1",
  storageBucket: "data-repository-932c1.firebasestorage.app",
  messagingSenderId: "480604246375",
  appId: "1:480604246375:web:c80c87796f9137e1e19fc2"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);