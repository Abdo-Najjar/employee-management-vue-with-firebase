import firebase from  'firebase';
import 'firebase/firebase';
import firebaseConfig from './firebaseConfig'

export default firebase.initializeApp(firebaseConfig).firestore();

