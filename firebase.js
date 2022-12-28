import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCniSz06Xw_szHq8_0k5iK9PPguJBwj4KU",
    authDomain: "twitter-clone-3083c.firebaseapp.com",
    projectId: "twitter-clone-3083c",
    storageBucket: "twitter-clone-3083c.appspot.com",
    messagingSenderId: "740677189310",
    appId: "1:740677189310:web:b2bfd296f634b9223828ef"
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };