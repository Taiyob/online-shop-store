// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCWRmpIeMeF417OMj6AaW2guoxRG2gCsc",
  authDomain: "online-shop-46c5f.firebaseapp.com",
  projectId: "online-shop-46c5f",
  storageBucket: "online-shop-46c5f.appspot.com",
  messagingSenderId: "548048603202",
  appId: "1:548048603202:web:c97c4c31399215764945db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;