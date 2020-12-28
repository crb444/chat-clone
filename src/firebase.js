import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBaFgaxLnH9ucY_sxKFRKURIgvG5Pc1MrA",
  authDomain: "chat-react-4a444.firebaseapp.com",
  projectId: "chat-react-4a444",
  storageBucket: "chat-react-4a444.appspot.com",
  messagingSenderId: "353227345211",
  appId: "1:353227345211:web:139d59e2674c06b036bb1e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
