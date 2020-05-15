import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB6e6k7Uc_kbWZxvsc4UxVZFPrhTgifCIM",
  authDomain: "quiz-ea9c3.firebaseapp.com",
  databaseURL: "https://quiz-ea9c3.firebaseio.com",
  projectId: "quiz-ea9c3",
  storageBucket: "quiz-ea9c3.appspot.com",
  messagingSenderId: "29618902322",
  appId: "1:29618902322:web:f7bc6937cdfc4b9162b32b",
};

// Initialize Firebase
firebase.initializeApp(config);

export default firebase;
