import { createApp } from 'vue'
import 'normalize.css'

import App from './App.vue'

import './assets/main.css'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount("#app")