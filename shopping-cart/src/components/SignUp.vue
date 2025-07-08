<template>
  <v-container class="fill-height d-flex align-center justify-center" fluid>
    <v-card elevation="8" class="pa-6 mt-12" max-width="500" width="100%">
      <v-card-title class="text-h5 text-center">Sign Up</v-card-title>

      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            v-model="formData.firstName"
            label="First Name"
            variant="solo"
            :rules="[required]"
            clearable
            class="mb-4"
          />
          <v-text-field
            v-model="formData.lastName"
            label="Last Name"
            variant="solo"
            :rules="[required]"
            clearable
            class="mb-4"
          />
          <v-text-field
            v-model="formData.email"
            label="Email"
            variant="solo"
            :rules="[required]"
            clearable
            class="mb-4"
          />
          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            variant="solo"
            :rules="[required]"
            clearable
            class="mb-6"
          />

          <v-btn color="primary" block size="large" @click="signup">Sign Up</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- ✅ Snackbar Toast -->
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
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const required = (value: string) => (value ? true : 'Field is required')

// ✅ Snackbar state
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
  formData.firstName = ''
  formData.lastName = ''
  formData.email = ''
  formData.password = ''
}
async function signup() {
  const result = await formRef.value.validate()
  if (!result.valid) return

  try {
    await auth.signup(formData)
    showSnackbar('🎉 Signup successful! Please login.', 'success')
    setTimeout(() => router.push('/login'), 1500)
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message ||
      (error?.response?.status === 409
        ? '⚠️ Email already registered.'
        : '❌ Signup failed. Try again.')

    showSnackbar(errorMsg, 'error')
    resetForm()
    console.error('Signup error:', error)
  }
}
</script>
