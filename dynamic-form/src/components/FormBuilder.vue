<template>
  <v-container fluid>
    <v-row>
      <!-- Left: Add Field -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 glass-card" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-3">Create New Field For: {{ formTitle }}</h3>
          <v-divider class="mb-4" />

          <!-- Type -->
          <v-select
            v-model="newField.type"
            :items="fieldTypes"
            label="Field Type"
            outlined
            dense
            class="mb-3"
          />

          <!-- Label -->
          <v-text-field v-model="newField.label" label="Field Label" outlined dense class="mb-3" />

          <!-- Select Field Options -->
          <div v-if="newField.type === 'select'" class="mb-3">
            <v-text-field
              v-model="optionInput"
              label="Add Option"
              @keyup.enter="addOption"
              outlined
              dense
              class="mb-2"
            />
            <v-btn @click="addOption" :disabled="!optionInput" size="small" color="primary"
              >Add</v-btn
            >

            <div class="d-flex flex-wrap mt-2">
              <v-chip
                v-for="(opt, i) in newField.options"
                :key="i"
                class="ma-1"
                color="blue-lighten-4"
              >
                {{ opt }}
                <template v-slot:close>
                  <v-icon @click.stop="removeOption(i)"> mdi-close </v-icon>
                </template>
              </v-chip>
            </div>
          </div>

          <!-- Validations -->
          <v-checkbox v-model="newField.validation.required" label="Required" class="mb-2" />
          <v-text-field
            v-model.number="newField.validation.minLength"
            label="Min Length"
            type="number"
            outlined
            dense
            class="mb-2"
          />
          <v-text-field
            v-model.number="newField.validation.maxLength"
            label="Max Length"
            type="number"
            outlined
            dense
            class="mb-2"
          />
          <v-text-field
            v-model="newField.validation.pattern"
            label="Regex Pattern"
            outlined
            dense
            class="mb-4"
          />

          <!-- Add / Update Button -->
          <v-btn
            @click="addField"
            :disabled="!newField.label || !newField.type"
            color="primary"
            block
          >
            {{ isEdit ? 'Update Field' : 'Add Field' }}
          </v-btn>

          <v-btn v-if="isEdit" @click="cancelEdit" block class="mt-2" color="grey-darken-1">
            Cancel Edit
          </v-btn>
        </v-card>
      </v-col>

      <!-- Right: Field Preview -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 glass-card" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-3">Added Fields</h3>
          <v-divider class="mb-4" />
          <div v-if="fields.length" class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="(field, index) in fields"
              :key="index"
              color="green-lighten-4"
              class="ma-1"
              label
            >
              <div class="d-flex align-center">
                {{ field.label }} ({{ field.type }})
                <v-icon
                  size="18"
                  class="ms-2"
                  color="blue"
                  style="cursor: pointer"
                  @click.stop="editField(index)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon @click.stop="removeField(index)"> mdi-close </v-icon>
              </div>
            </v-chip>
          </div>

          <div v-else class="text-medium-emphasis">No fields added yet</div>

          <v-divider class="my-4" />

          <v-btn :disabled="fields.length === 0" color="success" block @click="saveSchema">
            Save Form Schema
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form-schema'
import type { FormFields } from '@/types/form-types'

const router = useRouter()
const route = useRoute()
const formStore = useFormStore()
const isEdit = ref(false)
const editFieldIndex = ref<number | null>(null)
const formTitle = String(route.query.title || 'Untitled Form')
const fieldTypes = ['text', 'email', 'number', 'select', 'checkbox', 'date', 'textarea']
const fields = ref<FormFields[]>([])
const optionInput = ref('')
const newField = ref<FormFields>({
  type: '',
  label: '',
  options: [],
  validation: {
    required: false,
    minLength: undefined,
    maxLength: undefined,
    pattern: '',
  },
})

function resetField() {
  newField.value = {
    type: '',
    label: '',
    options: [],
    validation: {
      required: false,
      minLength: undefined,
      maxLength: undefined,
      pattern: '',
    },
  }
}

function addOption() {
  const trimmed = optionInput.value.trim()
  if (!trimmed) return
  newField.value.options = newField.value.options || []
  newField.value.options.push(trimmed)
  optionInput.value = ''
}

function removeOption(index: number) {
  newField.value.options?.splice(index, 1)
}

function addField() {
  const updatedField: FormFields = {
    type: newField.value.type,
    label: newField.value.label,
    options: newField.value.type === 'select' ? [...(newField.value.options || [])] : undefined,
    validation: {
      required: newField.value.validation?.required ?? false,
      minLength: newField.value.validation?.minLength,
      maxLength: newField.value.validation?.maxLength,
      pattern: newField.value.validation?.pattern || '',
    },
  }
  const cloneFields = JSON.parse(JSON.stringify(updatedField))
  if (isEdit.value && editFieldIndex.value !== null) {
    fields.value[editFieldIndex.value] = cloneFields
    isEdit.value = false
    editFieldIndex.value = null
  } else {
    fields.value.push(cloneFields)
  }
  resetField()
}

function cancelEdit() {
  isEdit.value = false
  editFieldIndex.value = null
  resetField()
}

function removeField(index: number) {
  fields.value.splice(index, 1)
}

function editField(index: number) {
  newField.value = JSON.parse(JSON.stringify(fields.value[index]))
  isEdit.value = true
  editFieldIndex.value = index
}

function saveSchema() {
  const cloneFields = JSON.parse(JSON.stringify(fields.value))
  const index = Number(route.query.index)
  if (index >= 0) {
    formStore.updateSchemas(index, {
      id: Date.now(),
      title: formTitle,
      fields: cloneFields,
    })
  } else {
    formStore.addSchemas({
      id: Date.now(),
      title: formTitle,
      fields: cloneFields,
    })
  }

  fields.value = []
  router.push('/')
}

onMounted(() => {
  if (route.name === 'editFormFields') {
    const schema = formStore.getSchemas(Number(route.query.index))
    const cloneFields = JSON.parse(JSON.stringify(schema?.fields))
    fields.value = cloneFields || []
    isEdit.value = true
  }
})
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.text-h5,
.text-h6,
.v-card-title,
.v-btn,
.v-list-item-title {
  color: #fff !important;
}

.v-label,
.v-input input,
.v-select .v-field__input {
  color: #fff !important;
}

.v-input input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
