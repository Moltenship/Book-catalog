import firebase from 'firebase'
import firebaseConfig from '../utils/firebaseConfig'


const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()