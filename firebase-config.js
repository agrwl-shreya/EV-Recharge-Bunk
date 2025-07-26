// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyBzS7eqMs05HRljMNhqAuCQ01bf4o5GkAM",
  authDomain: "ev-project-64bd4.firebaseapp.com",
  projectId: "ev-project-64bd4",
  storageBucket: "ev-project-64bd4.appspot.com",  // Fixed the typo here too
  messagingSenderId: "457301153962",
  appId: "1:457301153962:web:2889d4772eaf085d7018d3",
  measurementId: "G-L9LQ7JZRL7"
};

// ✅ Initialize Firebase using compat style
firebase.initializeApp(firebaseConfig);

// ✅ Make services available globally
const db = firebase.firestore();
const auth = firebase.auth();
window.db = db;
window.auth = auth;
