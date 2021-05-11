import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import installElementPlus from './plugins/element'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyA21y5o2PjkBD4O47DXRp07otfvUtYvuzI',
  authDomain: 'book-catalog-2ccd2.firebaseapp.com',
  projectId: 'book-catalog-2ccd2',
  storageBucket: 'book-catalog-2ccd2.appspot.com',
  messagingSenderId: '1051865204183',
  appId: '1:1051865204183:web:03490dcb3357d947dcf792',
  measurementId: 'G-YYG5DJV0LM',
}

firebase.initializeApp(firebaseConfig)
// firebase.analytics()

const app = createApp(App)
installElementPlus(app)
app.use(store).mount('#app')
