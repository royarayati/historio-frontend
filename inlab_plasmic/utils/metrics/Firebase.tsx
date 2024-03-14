// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, setUserProperties, Analytics} from "firebase/analytics";
import { logForDev } from "../CommonUtils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX5HsY-fhaH_N0vqpPY0VkLhXu_-xcow4",
  authDomain: "new-inlab.firebaseapp.com",
  projectId: "new-inlab",
  storageBucket: "new-inlab.appspot.com",
  messagingSenderId: "1093327307637",
  appId: "1:1093327307637:web:96591eb9a34573ae9b493c",
  measurementId: "G-QLDY8FQWH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
isSupported().then(yes => {
  if (yes) {
    analytics = getAnalytics(app);
    setUserProperties(analytics, { namespace: localStorage.getItem('inlab_user_namespace_id') });
    logForDev("Firebase: Analytics initialized");
  }
})

export { analytics }
