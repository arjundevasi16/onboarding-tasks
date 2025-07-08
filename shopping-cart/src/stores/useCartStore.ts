import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { api } from '../services/api'
interface ProductInCart {
  productId: {
    _id: string
    title: string
    image: string
    price: number
    rating: {
      rate: number
      count: number
    }
    description: string
    category: string
  }
  price: number
  quantity: number
  _id: string
}

interface FullCartData {
  _id: string
  userId: string
  items: ProductInCart[]
  totalAmount: number
}

export const useCartStore = defineStore('cart', () => {
  const cartData = ref<FullCartData | null>(null)

  const cartCount = computed(() => cartData.value?.items.length || 0)

  const fetchCart = async () => {
    try {
      const res = await api.get('/getCart', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      cartData.value = res.data as FullCartData
    } catch (err) {
      console.error('❌ Failed to fetch cart:', err)
      cartData.value = null
    }
  }
  const addToCart = async (productId: string) => {
    try {
      await api.post(
        '/addToCart',
        { productId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      await fetchCart()
    } catch (error) {
      console.error('❌ Failed to add to cart:', error)
      throw error
    }
  }
  const clearCart = () => {
    cartData.value = null
  }

  return {
    cartData,
    cartCount,
    fetchCart,
    addToCart,
    clearCart,
  }
})
