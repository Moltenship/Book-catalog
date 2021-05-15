import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import installElementPlus from './plugins/element'
import firebase from 'firebase'


const app = createApp(App)
installElementPlus(app)
app.use(store).mount('#app')
