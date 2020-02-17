import * as firebase from "firebase";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyCLBouxyv1mLEsbvPdkuQqUGtW4EmKJkLg",
  authDomain: "dnd-codex.firebaseapp.com",
  databaseURL: "https://dnd-codex.firebaseio.com",
  projectId: "dnd-codex",
  storageBucket: "dnd-codex.appspot.com",
});

ReactDOM.render(<App />, document.getElementById("root"));
