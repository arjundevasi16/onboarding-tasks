import { createApp } from 'vue'
import router from '@/router/index'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.mount('#app')
