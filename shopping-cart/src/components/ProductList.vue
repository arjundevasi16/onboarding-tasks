<template>
  <v-container class="py-8">
    <!-- 🔍 Search Input -->
    <div class="search-wrapper mb-6">
      <v-text-field
        v-model="search"
        placeholder="Search by product category..."
        clearable
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        class="search-input"
        @click:clear="search = ''"
      />
    </div>

    <!-- 🛍️ Product Grid -->
    <v-row justify="center" align="stretch" dense>
      <v-col
        v-for="(product, index) in filteredProducts"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="rounded-lg elevation-3 d-flex flex-column h-100 pa-3"
          style="min-height: 240px"
        >
          <!-- Image -->
          <v-img
            :src="product.image"
            :alt="product.title"
            height="160"
            cover
            class="rounded-t-lg mb-2"
          />

          <!-- Content -->
          <v-card-text class="pb-0 flex-grow-1 d-flex flex-column justify-space-between">
            <div class="product-info">
              <h3 class="text-subtitle-2 font-weight-bold mb-1">
                {{ product.title }}
              </h3>
              <div class="text-caption text-grey mb-1">Category: {{ product.category }}</div>
              <div class="text-caption text-grey-darken-1 mb-3 truncate-2-lines">
                {{ product.description }}
              </div>
            </div>

            <v-row justify="space-between" align="center">
              <v-col cols="6" class="pa-0">
                <v-rating
                  v-model="product.rating.rate"
                  color="amber"
                  background-color="grey-lighten-2"
                  dense
                  readonly
                  half-increments
                  size="14"
                />
                <div class="text-caption mt-1">
                  {{ product.rating.rate }} ({{ product.rating.count }})
                </div>
              </v-col>

              <v-col cols="6" class="text-right pa-0">
                <div class="text-subtitle-2 font-weight-bold text-green-darken-2">
                  ₹{{ product.price }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Actions -->
          <v-card-actions class="justify-end px-2 pb-2 pt-0">
            <v-btn color="primary" size="small" @click="handleAddToCart(product)" rounded>
              <v-icon start size="18">mdi-cart</v-icon>
              Add
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { api } from '@/services/api'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'

const router = useRouter()
const cart = useCartStore()

interface Product {
  _id?: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const productData = ref<Product[]>([])
const search = ref('')

const filteredProducts = computed(() => {
  return productData.value.filter((product) =>
    product.category.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const handleAddToCart = async (product: Product) => {
  if (!product._id) return
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    await cart.addToCart(product._id)
    router.push('/cart')
  } catch (err) {
    console.error('❌ Could not add to cart:', err)
  }
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const res = await api.get('/getProductList', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      productData.value = res.data
    } catch (error) {
      console.error('❌ Failed to fetch products:', error)
    }
  } else {
    console.log('token not valid')
  }
})
</script>

<style scoped>
.truncate-2-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-info {
  min-height: 100px;
}

.search-wrapper {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 100%;
}

@media (min-width: 600px) {
  .search-input {
    max-width: 33%;
  }
}
</style>
