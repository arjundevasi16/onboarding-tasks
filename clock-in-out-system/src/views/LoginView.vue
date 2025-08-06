<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%; border-radius: 1rem">
      <h3 class="text-center mb-4">Login</h3>
      <form @submit.prevent="handleSubmit" novalidate>
        <!-- Email -->
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="form.email"
            @blur="validateField('email')"
            :class="['form-control', errors.email && 'is-invalid']"
            type="email"
            placeholder="Enter email"
          />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            v-model="form.password"
            @blur="validateField('password')"
            :class="['form-control', errors.password && 'is-invalid']"
            type="password"
            placeholder="Enter password"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>

        <!-- Submit -->
        <button class="btn btn-primary w-100 mt-2" type="submit">Login</button>

        <!-- Register Link -->
        <div class="text-center mt-3">
          <router-link to="/register">Don't have an account? Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
const router = useRouter()
const store = useAuthStore()
const form = reactive({
  email: '',
  password: '',
})

const errors = reactive<{ email?: string; password?: string }>({})

const validateField = (field: 'email' | 'password') => {
  if (field === 'email') {
    if (!form.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = 'Enter a valid email'
    } else {
      errors.email = ''
    }
  }

  if (field === 'password') {
    if (!form.password) {
      errors.password = 'Password is required'
    } else if (form.password.length < 6) {
      errors.password = 'Minimum 6 characters required'
    } else {
      errors.password = ''
    }
  }
}

const handleSubmit = async () => {
  validateField('email')
  validateField('password')
  if (!errors.email && !errors.password) {
    try {
      store.login(form)
      router.push('/dashboard')
    } catch (error) {
      console.log('error:', error)
    }
  }
}
</script>
