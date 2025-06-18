<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-h6 mb-4">Personal Details</v-card-title>
    <v-form ref="formRef">
      <v-row dense>
        <v-col cols="12" md="4">
          <v-text-field
            label="First Name *"
            v-model="form.personal.firstName"
            :rules="[required]"
            clearable
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Middle Name *"
            v-model="form.personal.middleName"
            :rules="[required]"
            clearable
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            label="Last Name *"
            v-model="form.personal.lastName"
            :rules="[required]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Email *"
            v-model="form.personal.email"
            type="email"
            :rules="[required, emailRules]"
            clearable
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
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="Date of Birth *"
            v-model="form.personal.dob"
            type="date"
            :rules="[required]"
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            label="Photos"
            placeholder="Upload your photos"
            append-inner-icon="mdi-camera"
            prepend-icon=""
            multiple
          ></v-file-input>
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
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            v-model="form.personal.addressLine2"
            label="Permanent Address *"
            row-height="15"
            rows="1"
            auto-grow
            :rules="[required]"
          ></v-textarea>
        </v-col>
        <v-col cols="4">
          <v-checkbox
            v-model="copyAddress"
            label="Same as Permanent Address "
            class="mt-2"
            color="primary"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useUserForm } from '@/composable/useUserForm'

import type { UserDetails } from '@/types/user-details'
import { reactive, ref } from 'vue'
const { formData } = useUserForm()
const form = reactive<UserDetails>(formData)
const copyAddress = ref(false)
const formRef = ref()
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
