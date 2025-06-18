<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-h6 mb-4 text-center">Professional Details</v-card-title>
    <v-form ref="formRef">
      <v-row dense>
        <!-- Designation -->
        <v-col cols="12" md="6">
          <v-text-field
            label="Designation"
            v-model="form.professional.designation"
            :rules="[required]"
            clearable
          />
        </v-col>

        <!-- Department -->
        <v-col cols="12" md="6">
          <v-text-field
            label="Department"
            v-model="form.professional.department"
            :rules="[required]"
            clearable
          />
        </v-col>

        <!-- Experience: Years -->
        <v-col cols="12" md="2" class="d-flex align-center justify-center h-100">
          <span class="text-subtitle-1 font-weight-medium">Experience:</span>
        </v-col>

        <v-col cols="6" md="2">
          <v-text-field
            label="Years"
            v-model="form.professional.experience.years"
            type="number"
            :rules="[required, isNumber]"
            clearable
          />
        </v-col>

        <v-col cols="6" md="2">
          <v-text-field
            label="Months"
            v-model="form.professional.experience.months"
            type="number"
            :rules="[required, isNumber]"
            clearable
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            label="Current Location"
            v-model="form.professional.currentLocation"
            :rules="[required]"
            clearable
          />
        </v-col>

        <!-- Skills (Multi-select) -->
        <v-col cols="6">
          <v-select
            v-model="form.professional.skills"
            label="Skills"
            :items="availableSkills"
            multiple
            chips
            clearable
            :rules="[required]"
          />
        </v-col>

        <!-- Resume Upload -->
        <v-col cols="12" md="6">
          <v-file-input
            v-model="form.professional.resume"
            label="Upload Resume (PDF)"
            accept=".pdf"
            append-inner-icon="mdi-paperclip"
            prepend-icon=""
            :rules="[required]"
            clearable
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
const formRef = ref()
const availableSkills = [
  'JavaScript',
  'Vue.js',
  'React',
  'Node.js',
  'TypeScript',
  'HTML',
  'CSS',
  'Python',
  'Java',
  'SQL',
]

// Rules
const required = (v: string | number | null) => !!v || 'This field is required'
const isNumber = (v: any) => !isNaN(v) || 'Must be a number'
const validator = async () => {
  const result = await formRef?.value?.validate()
  return result.valid
}
defineExpose({ validator })
</script>
