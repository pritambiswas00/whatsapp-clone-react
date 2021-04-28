// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAym8ZMvQzMP36_AJTXL6mZg9QNfKinFQE",
    authDomain: "whatsapp-clone-4cf7b.firebaseapp.com",
    projectId: "whatsapp-clone-4cf7b",
    storageBucket: "whatsapp-clone-4cf7b.appspot.com",
    messagingSenderId: "785116332221",
    appId: "1:785116332221:web:3ef8409932892b88b437d4",
    measurementId: "G-FKPBNT171C"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const DB = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default DB;