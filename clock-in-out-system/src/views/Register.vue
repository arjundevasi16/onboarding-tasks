<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%; border-radius: 1rem">
      <h3 class="text-center mb-4">Register</h3>
      <form @submit.prevent="handleSubmit" novalidate>
        <!-- Name -->
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            v-model="form.name"
            @blur="validateField('name')"
            :class="['form-control', errors.name && 'is-invalid']"
            type="text"
            placeholder="Enter full name"
          />
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>

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
        <div class="mb-3">
          <label class="form-label">Mobile</label>
          <input
            v-model="form.mobile"
            type="text"
            class="form-control"
            placeholder="Enter mobile number"
          />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            v-model="form.password"
            @blur="validateField('password')"
            :class="['form-control', errors.password && 'is-invalid']"
            type="password"
            placeholder="Create password"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>

        <!-- Submit -->
        <button class="btn btn-success w-100 mt-2" type="submit">Register</button>

        <!-- Login Link -->
        <div class="text-center mt-3">
          <router-link to="/login">Already have an account? Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  mobile: '',
  password: '',
})

const errors = reactive<{ name?: string; email?: string; password?: string }>({})

const validateField = (field: 'name' | 'email' | 'password') => {
  switch (field) {
    case 'name':
      errors.name = form.name ? '' : 'Name is required'
      break
    case 'email':
      errors.email = !form.email
        ? 'Email is required'
        : !/\S+@\S+\.\S+/.test(form.email)
          ? 'Enter a valid email'
          : ''
      break
    case 'password':
      errors.password = !form.password
        ? 'Password is required'
        : form.password.length < 6
          ? 'Minimum 6 characters required'
          : ''
      break
  }
}

const handleSubmit = async () => {
  validateField('name')
  validateField('email')
  validateField('password')

  if (!errors.name && !errors.email && !errors.password) {
    try {
      const response = await api.post('/auth/sign-up', form)
      console.log('Registration successful:', response.data)
      router.push('/login')
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error)
      alert('Registration failed. Check console for details.')
    }
  }
}
</script>
