<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-center text-h5 mb-4"> Current Organization Details </v-card-title>

    <v-form ref="formRef">
      <v-row class="text-center align-center">
        <!-- Joining Date -->
        <v-col>
          <v-text-field
            label="Joining Date"
            type="date"
            :rules="[required]"
            v-model="form.currentOrganization.joiningDate"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <!-- Next Appraisal Date -->
        <v-col>
          <v-text-field
            label="Next Appraisal Date"
            type="date"
            :rules="[required]"
            v-model="form.currentOrganization.nextAppraisalDate"
            density="compact"
            variant="outlined"
          />
        </v-col>

        <!-- Current CTC -->
        <v-col>
          <v-text-field
            label="Current CTC"
            type="number"
            placeholder="120000"
            :rules="[required]"
            v-model="form.currentOrganization.currentCTC"
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
import { ref } from 'vue'

const { formData } = useUserForm()
const formRef = ref()
const form = formData

const required = (value: string): boolean | string => {
  if (value) return true
  return 'Field is required'
}

const validator = async () => {
  const result = await formRef.value?.validate()
  return result?.valid
}
defineExpose({ validator })
</script>
