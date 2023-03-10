// main.ts
import { createApp } from 'vue'
import router from './router/index'
import './assets/css/reset.css'
import App from './App.vue'
const app = createApp(App)
app.use(router).mount('#app')
