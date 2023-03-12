importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBrrYrDAZuauSzG0mY9ElwuX4mn-APoKOs",
  authDomain: "microcms-notification-media.firebaseapp.com",
  projectId: "microcms-notification-media",
  storageBucket: "microcms-notification-media.appspot.com",
  messagingSenderId: "710414085954",
  appId: "1:710414085954:web:23337319417e34929fe2db",
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
