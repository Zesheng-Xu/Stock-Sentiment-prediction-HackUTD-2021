// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA6txu9kVgp7upSs66uQHb0lYi-0SlfrCc",
  authDomain: "hackutd-viii-2021.firebaseapp.com",
  databaseURL: "https://hackutd-viii-2021-default-rtdb.firebaseio.com",
  projectId: "hackutd-viii-2021",
  storageBucket: "hackutd-viii-2021.appspot.com",
  messagingSenderId: "852147345583",
  appId: "1:852147345583:web:20050860cce6f63d019c5a",
};

// if a Firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the database service
export const db = firebase.database();

export default firebase;
