<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-center text-h5 mb-4">Personal Details</v-card-title>
    <v-form ref="formRef">
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field
            label="First Name *"
            v-model="form.personal.firstName"
            :rules="[required]"
            density="compact"
            variant="outlined"
            clearable
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Middle Name *"
            v-model="form.personal.middleName"
            :rules="[required]"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Last Name *"
            v-model="form.personal.lastName"
            :rules="[required]"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Email *"
            v-model="form.personal.email"
            type="email"
            :rules="[required, emailRules]"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Phone Number *"
            v-model="form.personal.mobile"
            type="text"
            maxlength="10"
            :rules="[validMobile, required]"
            @input="form.personal.mobile = form.personal.mobile.replace(/\D/g, '').slice(0, 10)"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Date of Birth *"
            v-model="form.personal.dob"
            type="date"
            :rules="[required]"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="4">
          {{ form.personal.avatar }}
          <v-file-input
            v-model="form.personal.avatar"
            accept="image/png, image/jpeg, image/bmp"
            label="Photos"
            placeholder="Upload your photos"
            append-inner-icon="mdi-camera"
            prepend-icon=""
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col
          cols="12"
          md="4
      "
        >
          <v-select
            label="Gender *"
            v-model="form.personal.gender"
            :items="['Male', 'Female', 'Other']"
            :rules="[required]"
            clearable
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="form.personal.addressLine1"
            label="Present Address *"
            row-height="15"
            rows="1"
            auto-grow
            :rules="[required]"
            density="compact"
            variant="outlined"
          />
          <v-checkbox
            v-model="copyAddress"
            label="Same as Permanent Address "
            class="mt-2"
            color="primary"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="form.personal.addressLine2"
            label="Permanent Address *"
            row-height="15"
            rows="1"
            auto-grow
            :rules="[required]"
            density="compact"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useUserForm } from '@/composable/useUserForm'
import { ref, watch } from 'vue'

const { formData } = useUserForm()
const form = formData
const copyAddress = ref(false)
const formRef = ref()

watch(copyAddress, () => {
  if (copyAddress.value) {
    formData.personal.addressLine2 = formData.personal.addressLine1
    return
  }
  formData.personal.addressLine2 = ''
})

const required = (value: string): boolean | string => {
  if (value) return true
  return 'Field is required'
}

const emailRules = (value: string): boolean | string => {
  if (/.+@.+\..+/.test(value)) return true
  return 'E-mail must be valid.'
}

const validMobile = (value: string): boolean | string => {
  if (/^\d{10}$/.test(value)) return true
  return 'Mobile number must be 10 digits'
}

const validator = async () => {
  const result = await formRef.value?.validate()
  return result?.valid
}
defineExpose({ validator })
</script>
