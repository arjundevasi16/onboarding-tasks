import { defineStore } from 'pinia'
import { ref } from 'vue'
const schemas = ref<FormSchema[]>([])
import type { FormSchema } from '@/types/form-types'
export const useFormStore = defineStore('formStore', () => {
  function addSchemas(schema: FormSchema) {
    schemas.value.push(JSON.parse(JSON.stringify(schema)))
  }
  function deleteSchemas(index: number) {
    schemas.value.splice(index, 1)
  }
  function getSchemas(index: number): FormSchema | undefined {
    const item = schemas.value[index]
    return item ? JSON.parse(JSON.stringify(item)) : undefined
  }

  function updateSchemas(index: number, schema: FormSchema) {
    schemas.value[index] = JSON.parse(JSON.stringify(schema))
    return
  }
  return {
    schemas,
    addSchemas,
    deleteSchemas,
    getSchemas,
    updateSchemas,
  }
})
