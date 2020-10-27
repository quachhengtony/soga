import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1IGg_0RSwub1DI1J8EiPtiF3GSp7q-ng",
    authDomain: "soga-7120a.firebaseapp.com",
    databaseURL: "https://soga-7120a.firebaseio.com",
    projectId: "soga-7120a",
    storageBucket: "soga-7120a.appspot.com",
    messagingSenderId: "405174960922",
    appId: "1:405174960922:web:4bf6e633daaa20671d62a3",
    measurementId: "G-YFXEB6ZPCK"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;