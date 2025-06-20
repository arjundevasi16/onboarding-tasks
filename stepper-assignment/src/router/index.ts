import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Stepper from '@/components/stepper/Stepper.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/add-user', name: 'AddUser', component: Stepper },
  { path: '/edit-user/:id', name: 'EditUser', component: Stepper },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
