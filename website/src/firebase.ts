// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrrYrDAZuauSzG0mY9ElwuX4mn-APoKOs",
  authDomain: "microcms-notification-media.firebaseapp.com",
  projectId: "microcms-notification-media",
  storageBucket: "microcms-notification-media.appspot.com",
  messagingSenderId: "710414085954",
  appId: "1:710414085954:web:23337319417e34929fe2db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export async function requestNotificationPermission() {
  const firestore = getFirestore(app);
  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_WEBPUSH_KEY,
    });

    if (token) {
      console.log(`Notification token: ${token}`);
      await addDoc(collection(firestore, "notification"), { token: token });
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
}
