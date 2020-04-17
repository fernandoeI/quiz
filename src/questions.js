import firebase from "./utils/firebase";
const db = firebase.firestore();
const questions = () => {
  db.collection("questions").onSnapshot((snapshot) => {
    const questionData = [];
    snapshot.forEach((doc) => questionData.push({ ...doc.data(), id: doc.id }));
  });
};
export default questions;
