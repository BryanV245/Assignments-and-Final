import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Oruga from '@oruga-ui/oruga-next'
import { Autocomplete, Sidebar } from '@oruga-ui/oruga-next';





const app = createApp(App)

app.use(router).use(Oruga).use(Autocomplete).use(Sidebar)

app.mount('#app')

