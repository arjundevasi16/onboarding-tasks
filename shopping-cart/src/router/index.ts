import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },

  { path: '/login', name: 'login-route', component: () => import('@/components/Login.vue') },
  { path: '/sign-up', name: 'sign-up-route', component: () => import('@/components/SignUp.vue') },
  {
    path: '/products',
    name: 'products-list',
    meta: { requiresAuth: true },
    component: () => import('@/components/ProductList.vue'),
  },
  {
    path: '/cart',
    name: 'cart-item',
    meta: { requiresAuth: true },
    component: () => import('@/components/CartItem.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }
  if (token && (to.path === '/login' || to.path === '/sign-up' || to.path === '/'))
    return next('/products')
  next()
})
export default router
