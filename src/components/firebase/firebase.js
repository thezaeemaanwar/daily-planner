import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBh-Nbdvr5NE2Vm2qvjnnsHWa5X0WFtSyw",
  authDomain: "students-daily-planner.firebaseapp.com",
  projectId: "students-daily-planner",
  storageBucket: "students-daily-planner.appspot.com",
  messagingSenderId: "346626778242",
  appId: "1:346626778242:web:6937cdb61e5f4d0b34409b",
  measurementId: "G-N658864P2V",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export default firebase;
