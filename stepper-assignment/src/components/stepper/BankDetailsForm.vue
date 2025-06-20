<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-center text-h5 mb-4">Bank Details</v-card-title>
    <v-form ref="formRef">
      <v-row dense>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.bank.bankName"
            label="Bank Name *"
            clearable
            :rules="[required]"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.bank.accountHolderName"
            label="Account Holder Name *"
            clearable
            :rules="[required]"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.bank.accountNumber"
            label="Account Number *"
            clearable
            :rules="[required, accountNumberRules]"
            type="number"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.bank.ifscCode"
            label="IFSC Code *"
            clearable
            :rules="[required, ifscRules]"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.bank.aadhaarNumber"
            label="Aadhaar Number *"
            clearable
            :rules="[required, aadharRules]"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.bank.panNumber"
            label="PAN Number *"
            placeholder="ABCDE1234F"
            clearable
            :rules="[required, panRules]"
            density="compact"
            variant="outlined"
          />
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserForm } from '@/composable/useUserForm'

const { formData } = useUserForm()
const formRef = ref()
const form = formData
const required = (value: string): boolean | string => {
  if (value) return true
  return 'Field is required'
}

const panRules = (value: string): boolean | string => {
  if (/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) return true
  return 'Pan-card must be of format ABCDE1234F.'
}

const aadharRules = (value: string): boolean | string => {
  if (/^\d{12}$/.test(value)) return true
  return 'Aadhaar-card must be 12-digit number.'
}

const ifscRules = (value: string): boolean | string => {
  if (/^[A-Z]{4}0\d{6}$/.test(value)) return true
  return 'IFSC number must be format ABCD0123456.'
}

const accountNumberRules = (value: string): boolean | string => {
  if (/^\d{9,18}$/.test(value)) return true
  return 'Account Number must be 9 to 18 digits.'
}

const validator = async () => {
  const result = await formRef.value?.validate()
  return result?.valid
}

defineExpose({ validator })
</script>
