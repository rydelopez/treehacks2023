import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBNCZpxR1-x63GqB0scStVuz6NVULwMT28",
	authDomain: "certiflow-nft.firebaseapp.com",
	projectId: "certiflow-nft",
	storageBucket: "certiflow-nft.appspot.com",
	messagingSenderId: "518423014075",
	appId: "1:518423014075:web:21812162788469efcb979e",
	measurementId: "G-3XJ5JY834C",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const usernamesRef = collection(db, "usernames");
export const auth = getAuth();
