<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-center text-h5 mb-4">Education Details</v-card-title>

    <!-- Add Button -->
    <div class="d-flex justify-end mb-4">
      <v-btn
        prepend-icon="mdi-plus"
        class="bg-orange text-white"
        @click="openAddForm"
        :disabled="isAddEducation"
      >
        Add Education
      </v-btn>
    </div>

    <!-- Table Header -->
    <v-row dense class="font-weight-bold text-center mb-2 bg-grey-lighten-4 rounded">
      <v-col>Education Name</v-col>
      <v-col>University Name</v-col>
      <v-col>Result</v-col>
      <v-col>Year Of Passing</v-col>
      <v-col>Action</v-col>
    </v-row>

    <!-- Education List -->
    <div v-if="educationList.length">
      <template v-for="(list, index) in educationList" :key="index">
        <!-- Edit Row -->
        <v-form v-if="editingIndex === index" :ref="(el) => (editFormRefs[index] = el)">
          <v-row dense class="text-center align-center">
            <v-col>
              <v-text-field
                v-model="addEducation.qualification"
                :rules="[required]"
                density="compact"
                variant="outlined"
                placeholder="Qualification"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="addEducation.university"
                :rules="[required]"
                density="compact"
                variant="outlined"
                placeholder="University"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="addEducation.result"
                :rules="[required]"
                density="compact"
                variant="outlined"
                placeholder="Result"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model.number="addEducation.passingYear"
                :rules="[required, yearRule]"
                density="compact"
                variant="outlined"
                placeholder="Year"
                type="number"
              />
            </v-col>
            <v-col>
              <v-icon color="success" class="me-2" @click="saveEducation(index)"
                >mdi-content-save</v-icon
              >
              <v-icon color="grey" @click="cancelForm">mdi-close</v-icon>
            </v-col>
          </v-row>
        </v-form>

        <!-- Display Row -->
        <template v-else>
          <v-row dense class="text-center align-center">
            <v-col>{{ list.qualification }}</v-col>
            <v-col>{{ list.university }}</v-col>
            <v-col>{{ list.result }}</v-col>
            <v-col>{{ list.passingYear }}</v-col>
            <v-col class="mb-4">
              <v-icon class="me-2" @click="startEdit(index)" color="primary">mdi-pencil</v-icon>
              <v-icon @click="removeEdu(index)" color="error">mdi-delete</v-icon>
            </v-col>
          </v-row>
        </template>
      </template>
    </div>
    <div v-else class="text-grey text-center my-4">
      <v-icon size="28" class="mb-2" color="grey">mdi-information-outline</v-icon>
      <div>No experience records found.</div>
    </div>

    <!-- Add Form Row -->
    <v-form v-if="isAddEducation" ref="addFormRef" class="mt-2">
      <v-row dense class="text-center align-center">
        <v-col>
          <v-text-field
            v-model="addEducation.qualification"
            :rules="[required]"
            placeholder="Enter Qualification"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="addEducation.university"
            :rules="[required]"
            placeholder="Enter University"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="addEducation.result"
            :rules="[required]"
            placeholder="Enter Result"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="addEducation.passingYear"
            :rules="[required, yearRule]"
            placeholder="Year"
            type="number"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col class="mb-4">
          <v-icon color="success" class="me-2" @click="saveEducation()">mdi-content-save</v-icon>
          <v-icon color="grey" @click="cancelForm">mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { EducationDetails } from '@/types/user-details'
import { useUserForm } from '@/composable/useUserForm'

const { formData } = useUserForm()
const addFormRef = ref()
const editFormRefs = ref<any[]>([])
const isAddEducation = ref(false)
const editingIndex = ref<number | null>(null)
const educationList = formData.education
const addEducation = ref<EducationDetails>({
  qualification: '',
  university: '',
  result: '',
  passingYear: 0,
})

function resetAddEducation() {
  addEducation.value = {
    qualification: '',
    university: '',
    result: '',
    passingYear: 0,
  }
}

function openAddForm() {
  resetAddEducation()
  isAddEducation.value = true
  editingIndex.value = null
}

function cancelForm() {
  resetAddEducation()
  isAddEducation.value = false
  editingIndex.value = null
}

async function saveEducation(index?: number) {
  const formToValidate = index !== undefined ? editFormRefs.value[index] : addFormRef.value
  const result = await formToValidate?.validate()

  if (!result?.valid) return

  const newEntry = { ...addEducation.value }
  if (index !== undefined) {
    formData.education.splice(index, 1, newEntry)
  } else {
    formData.education.push(newEntry)
  }
  cancelForm()
}

function startEdit(index: number) {
  addEducation.value = { ...educationList[index] }
  editingIndex.value = index
  isAddEducation.value = false
}

function removeEdu(index: number) {
  educationList.splice(index, 1)
}

const required = (value: string) => (value ? true : 'Field is required')

const yearRule = (value: number | string): boolean | string => {
  const year = Number(value)
  return Number.isInteger(year) && year > 1900 && year <= new Date().getFullYear()
    ? true
    : 'Enter a valid year'
}

const validator = () => {
  return formData.education.length >= 1
}
defineExpose({ validator })
</script>
