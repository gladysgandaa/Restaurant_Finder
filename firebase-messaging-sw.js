importScripts("https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBMRTfK_7w3PZ3LfZCdWaqoEaA_CqZM5r4",
  authDomain: "form-50005.firebaseapp.com",
  databaseURL: "https://form-50005.firebaseio.com",
  projectId: "form-50005",
  storageBucket: "form-50005.appspot.com",
  messagingSenderId: "790644686206",
  appId: "1:790644686206:web:f0e8c087bd3ab7e95dc72f",
  measurementId: "G-CR41MFE7Q1",
});

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var obj = JSON.parse(payload.data.notification);
  var notificationTitle = obj.title;
  var notificationOptions = {
    body: obj.body,
    icon: obj.icon,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
