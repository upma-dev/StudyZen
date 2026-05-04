import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAriQCyhc4u4yTlxBOmpWjXWw8kxjIwORw",
  authDomain: "studyzen-lvufr.firebaseapp.com",
  projectId: "studyzen-lvufr",
  storageBucket: "studyzen-lvufr.firebasestorage.app",
  messagingSenderId: "10518918729",
  appId: "1:10518918729:web:5ac88af6d69d836565f198"
};
//   measurementId: "G-M6SCHFNBED"
// };

// Initialize Firebase only if not already initialized
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);

export default app;
