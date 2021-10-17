import { initializeApp } from "@firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  signOut,
} from "@firebase/auth";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export default app;
export const auth = getAuth(app);

export const signInWithGoogleRedirect = () => {
  return signInWithRedirect(auth, new GoogleAuthProvider());
};

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export const handleSignOut = () => {
  return signOut(auth);
};
