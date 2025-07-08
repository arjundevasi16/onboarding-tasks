<template>
  <v-container class="py-8">
    <!-- Loading state -->
    <v-skeleton-loader v-if="loading" type="table" class="mx-auto" max-width="800" elevation="2" />

    <!-- Empty cart -->
    <div v-else-if="items.length === 0" class="text-center mt-16">
      <v-icon size="56" color="grey lighten-1">mdi-cart-off</v-icon>
      <h3 class="text-h6 mt-2 font-weight-medium">Your cart is empty</h3>
      <v-btn color="primary" class="mt-4" @click="goToHome">
        <v-icon start>mdi-home</v-icon>
        Go to Home
      </v-btn>
    </div>

    <!-- Cart display -->
    <v-card v-else class="pa-4 elevation-3 rounded-lg">
      <v-card-title class="text-h6 font-weight-bold">🛒 Your Cart</v-card-title>
      <v-divider class="mb-4" />

      <v-table density="comfortable">
        <thead>
          <tr>
            <th>Product</th>
            <th class="text-center">Quantity</th>
            <th class="text-right">Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in items" :key="product.productId._id">
            <td>
              <v-row no-gutters align="center">
                <v-col cols="auto">
                  <v-avatar size="64" rounded="lg">
                    <v-img :src="product.productId.image" cover />
                  </v-avatar>
                </v-col>
                <v-col class="ps-4">
                  <div>
                    <div class="text-body-1 font-weight-medium">
                      {{ product.productId.title }}
                    </div>
                    <div class="text-caption text-grey-darken-1">
                      ₹{{ product.productId.price }} per item
                    </div>
                  </div>
                </v-col>
              </v-row>
            </td>

            <td class="text-center">
              <div class="d-inline-flex align-center justify-center border rounded-pill px-1 py-1">
                <v-btn
                  icon
                  @click="updateQuantity(product.productId._id, 'decrement', product.quantity)"
                  size="x-small"
                  variant="text"
                >
                  <v-icon size="16" color="primary">mdi-minus</v-icon>
                </v-btn>

                <div class="mx-2 text-subtitle-2 font-weight-medium" style="min-width: 20px">
                  {{ product.quantity }}
                </div>

                <v-btn
                  icon
                  @click="updateQuantity(product.productId._id, 'increment', product.quantity)"
                  size="x-small"
                  variant="text"
                >
                  <v-icon size="16" color="primary">mdi-plus</v-icon>
                </v-btn>
              </div>
            </td>

            <td class="text-right font-weight-bold text-green-darken-2">
              ₹{{ Math.floor(product.productId.price * product.quantity) }}
            </td>

            <td>
              <v-btn
                icon
                @click="deleteCartItem(product.productId._id)"
                size="x-small"
                variant="text"
              >
                <v-icon size="16" color="red">mdi-delete-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-divider class="my-4" />
      <div class="d-flex justify-end pe-4">
        <div class="text-h6 font-weight-bold">
          Grand Total: ₹{{ Math.floor(cartData?.totalAmount || 0) }}
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { api } from '@/services/api'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const cart = useCartStore()
const { cartData, cartCount } = storeToRefs(cart)
const items = computed(() => cartData.value?.items || [])
const loading = computed(() => !cartData.value)

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const updateQuantity = async (
  productId: string,
  action: 'increment' | 'decrement',
  quantity: number,
) => {
  if (quantity === 1 && action === 'decrement') {
    return await deleteCartItem(productId)
  }
  try {
    await api.post(
      '/addToCart',
      { productId, action },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    await cart.fetchCart()
  } catch (error) {
    console.error('❌ Error updating quantity:', error)
  }
}

const deleteCartItem = async (productId: string) => {
  try {
    await api.delete(`/delete-cart-item/${productId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    await cart.fetchCart()
  } catch (error) {
    console.error('❌ Failed to delete item:', error)
  }
}

onMounted(() => {
  cart.fetchCart()
})
</script>

<style scoped>
.v-table td {
  vertical-align: middle;
  padding-top: 16px;
  padding-bottom: 16px;
}
</style>
