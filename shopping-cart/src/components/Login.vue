<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-card elevation="8" class="pa-6 mt-12" max-width="500" width="100%">
      <v-card-title class="text-h5 text-center">Login</v-card-title>

      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            v-model="loginFormDetails.email"
            label="Email"
            variant="solo"
            clearable
            class="mb-4"
            :rules="[required]"
          />
          <v-text-field
            v-model="loginFormDetails.password"
            label="Password"
            type="password"
            variant="solo"
            clearable
            class="mb-6"
            :rules="[required]"
          />

          <v-btn color="primary" block size="large" class="mb-4" @click="login"> Login </v-btn>

          <div class="text-center">
            <span>Don't have an account?</span>
            <RouterLink
              to="/sign-up"
              class="text-primary text-decoration-none font-weight-medium ms-1"
            >
              Sign Up
            </RouterLink>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="top right">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const formRef = ref()

const loginFormDetails = ref<{ email: string; password: string }>({
  email: '',
  password: '',
})

const required = (value: string) => (value ? true : 'Field is required')

const snackbar = reactive({
  show: false,
  message: '',
  color: 'success',
})

function showSnackbar(message: string, color: 'success' | 'error') {
  snackbar.message = message
  snackbar.color = color
  snackbar.show = true
}

function resetForm() {
  loginFormDetails.value.email = ''
  loginFormDetails.value.password = ''
}

const login = async () => {
  const result = await formRef.value.validate()
  if (!result.valid) return

  try {
    await auth.login(loginFormDetails.value.email, loginFormDetails.value.password)
    showSnackbar('✅ Login successful!', 'success')
    setTimeout(() => router.push('/'), 1500)
    resetForm()
  } catch (error: any) {
    const errorMsg =
      error?.response?.status === 401
        ? '❌ Invalid credentials'
        : error?.response?.data?.message || '❌ Login failed. Try again.'

    showSnackbar(errorMsg, 'error')
    console.error('Login error:', error)
  }
}
</script>
