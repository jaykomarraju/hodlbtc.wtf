import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTycXUg6GbbMPs0mB0ckcHrOuhCcG6Ras",
    authDomain: "hodlbtc-dff01.firebaseapp.com",
    projectId: "hodlbtc-dff01",
    storageBucket: "hodlbtc-dff01.appspot.com",
    messagingSenderId: "513497547107",
    appId: "1:513497547107:web:7dd50e080a3d104c855356",
    measurementId: "G-F4WW17NM72"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };