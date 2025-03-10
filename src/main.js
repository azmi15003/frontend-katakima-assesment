import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createStore } from 'vuex'
import store from './store'


const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')