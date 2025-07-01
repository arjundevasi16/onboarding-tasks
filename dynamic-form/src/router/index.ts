import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/add-form', name: 'addForm', component: () => import('@/components/AddForm.vue') },
  {
    path: '/edit-form/:id',
    name: 'editForm',
    component: () => import('@/components/AddForm.vue'),
  },
  {
    path: '/form-builder',
    name: 'formBuilder',
    component: () => import('@/components/FormBuilder.vue'),
  },
  {
    path: '/edit-form-fields',
    name: 'editFormFields',
    component: () => import('@/components/FormBuilder.vue'),
  },
  {
    path: '/preview-form/:id',
    name: 'previewForm',
    component: () => import('@/components/FormPreview.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
