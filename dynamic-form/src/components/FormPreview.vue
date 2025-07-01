<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-6 glass-card" min-width="700" elevation="3">
      <v-form v-if="schema" @submit.prevent="handleSubmit" ref="formRef">
        <h2 class="text-h5 font-weight-bold mb-6 text-center">{{ schema.title }}</h2>
        <!-- Form Fields -->
        <div v-for="(field, index) in schema.fields" :key="index" class="mb-4">
          <!-- Text/Email/Number -->
          <v-text-field
            v-if="['text', 'email', 'number', 'date'].includes(field.type)"
            v-model="formData[field.label]"
            :type="field.type"
            :label="field.label"
            :rules="getValidationRules(field)"
            outlined
            dense
          />
          <!-- Textarea -->
          <v-textarea
            v-else-if="field.type === 'textarea'"
            v-model="formData[field.label]"
            :label="field.label"
            :rules="getValidationRules(field)"
            outlined
            dense
          />

          <!-- Select -->
          <v-select
            v-else-if="field.type === 'select'"
            v-model="formData[field.label]"
            :items="field.options || []"
            :label="field.label"
            :rules="getValidationRules(field)"
            outlined
            dense
          />

          <!-- Checkbox -->
          <v-checkbox
            v-else-if="field.type === 'checkbox'"
            v-model="formData[field.label]"
            :label="field.label"
            :rules="getValidationRules(field)"
          />

          <!-- Radio -->
          <div v-else-if="field.type === 'radio'">
            <label class="font-weight-bold mb-2 d-block">{{ field.label }}</label>
            <v-radio-group
              v-model="formData[field.label]"
              :rules="getValidationRules(field)"
              class="ml-2"
            >
              <v-radio
                v-for="(option, i) in field.options || []"
                :key="i"
                :label="option"
                :value="option"
              />
            </v-radio-group>
          </div>

          <!-- File -->
          <v-file-input
            v-else-if="field.type === 'file'"
            v-model="formData[field.label]"
            :label="field.label"
            show-size
            outlined
            dense
            :rules="getValidationRules(field)"
          />

          <!-- Fallback -->
          <v-text-field
            v-else
            v-model="formData[field.label]"
            :label="field.label"
            outlined
            dense
            :rules="getValidationRules(field)"
          />
        </div>

        <!-- Submit Button (1/3 width) -->
        <div class="d-flex justify-center mt-6">
          <v-btn type="submit" color="primary" class="w-100 w-sm-50 w-md-33"> Submit </v-btn>
        </div>
      </v-form>

      <!-- Fallback if schema is null -->
      <v-alert v-else type="error" class="mt-2">Form not found</v-alert>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form-schema'
import type { FormSchema, FormFields } from '@/types/form-types'

const router = useRouter()
const store = useFormStore()
const route = useRoute()
const schema = ref<FormSchema | null>(null)
const formData = ref<Record<string, any>>({})
const formRef = ref()

onMounted(() => {
  const s = store.getSchemas(Number(route.params.id))
  if (s) {
    schema.value = s
    s.fields.forEach((field) => {
      formData.value[field.label] = field.type === 'checkbox' ? false : ''
    })
  }
})

async function handleSubmit() {
  const result = await formRef.value.validate()
  if (result.valid) {
    alert('Form submitted!')
    router.push('/')
  }
}

function getValidationRules(field: FormFields) {
  const rules: ((v: any) => true | string)[] = []
  const { required, minLength, maxLength, pattern } = field.validation || {}

  if (required) rules.push((v) => !!v || 'This field is required')
  if (minLength)
    rules.push((v) =>
      typeof v === 'string' && v.length >= minLength ? true : `Min ${minLength} characters`,
    )
  if (maxLength)
    rules.push((v) =>
      typeof v === 'string' && v.length <= maxLength ? true : `Max ${maxLength} characters`,
    )
  if (pattern) {
    try {
      const regex = new RegExp(pattern)
      rules.push((v) => regex.test(v) || 'Invalid pattern')
    } catch {
      console.warn('Invalid regex:', pattern)
    }
  }

  return rules
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  color: #fff;
}
</style>
