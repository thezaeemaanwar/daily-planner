import React, { useState, useEffect } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "./firebase/firebase";

const Signup = ({ setUser }) => {
  var uiConfig = {
    signInflow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    let isMounted = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (user && isMounted) {
        setUser({
          uid: firebase.auth().currentUser.uid,
          name: firebase.auth().currentUser.displayName,
        });
      } else {
        setUser(null);
      }
    });
    return () => (isMounted = false);
  }, [setUser]);

  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default Signup;
