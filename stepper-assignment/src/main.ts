import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from '@/App.vue'
import router from '@/router/index'

const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
