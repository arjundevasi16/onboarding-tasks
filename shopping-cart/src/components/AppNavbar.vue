<template>
  <v-app-bar app color="primary" dark elevation="4">
    <v-container class="d-flex justify-space-between align-center">
      <RouterLink to="/" class="text-h6 text-white text-decoration-none">MyShop</RouterLink>

      <div class="d-flex gap-4 align-center">
        <RouterLink to="/cart" class="text-white text-decoration-none position-relative">
          <v-badge
            v-if="cartCount > 0"
            :content="cartCount"
            color="red"
            overlap
            offset-x="4"
            offset-y="4"
          >
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <template v-else>
            <v-icon>mdi-cart</v-icon>
          </template>
          <span class="ms-1">Cart</span>
        </RouterLink>

        <div v-if="!token">
          <RouterLink to="/login" class="text-white text-decoration-none mr-2">Login</RouterLink>
          <RouterLink to="/sign-up" class="text-white text-decoration-none">Sign Up</RouterLink>
        </div>

        <div v-else>
          <v-btn
            color="white"
            variant="text"
            class="text-white text-decoration-none"
            @click="handleLogout"
          >
            <v-icon start size="18">mdi-logout</v-icon>
            Logout
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const cart = useCartStore()
const auth = useAuthStore()

const { cartCount } = storeToRefs(cart)
const { token } = storeToRefs(auth)

cart.fetchCart()

const handleLogout = () => {
  auth.logout()
  cart.clearCart()
  router.push('/login')
}
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
.position-relative {
  position: relative;
}
</style>
