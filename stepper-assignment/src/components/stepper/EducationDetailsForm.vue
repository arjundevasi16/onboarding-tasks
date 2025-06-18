<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-center text-h5 mb-3">Education Details</v-card-title>
    <div class="d-flex justify-end mb-4">
      <v-btn
        prepend-icon="mdi-plus"
        class="bg-orange text-white"
        @click="isAddEducation = true"
        :disabled="isEditing || isAddEducation"
      >
        {{ isEditing ? 'Edit' : 'Add' }} Education
      </v-btn>
    </div>
    <v-row dense class="font-weight-bold text-center mb-2">
      <v-col>Education Name</v-col>
      <v-col>University Name</v-col>
      <v-col>Result</v-col>
      <v-col>Year Of Passing</v-col>
      <v-col>Action</v-col>
    </v-row>
    <!-- Education Records List -->
    <div v-if="educationList.length || isAddEducation">
      <v-row
        v-for="(list, index) in educationList"
        :key="index"
        dense
        class="text-center align-center mb-2"
      >
        <v-col>{{ list.qualification }}</v-col>
        <v-col>{{ list.university }}</v-col>
        <v-col>{{ list.result }}</v-col>
        <v-col>{{ list.passingYear }}</v-col>
        <v-col>
          <v-btn icon="mdi-pencil" @click="startEdit(index)" />
          <v-btn icon="mdi-delete" color="error" @click="removeEdu(index)" />
        </v-col>
      </v-row>
    </div>

    <!-- No Record Message -->
    <div v-else class="text-grey text-center my-4">
      <v-icon size="28" class="mb-2" color="grey">mdi-information-outline</v-icon>
      <div>No education records found.</div>
    </div>

    <v-form v-if="isAddEducation" ref="formRef">
      <v-row>
        <v-col>
          <v-text-field type="text" v-model="addEducation.qualification" :rules="[required]" />
        </v-col>
        <v-col>
          <v-text-field type="text" v-model="addEducation.university" :rules="[required]" />
        </v-col>
        <v-col>
          <v-text-field type="text" v-model="addEducation.result" :rules="[required]" />
        </v-col>
        <v-col>
          <v-text-field type="text" v-model="addEducation.passingYear" :rules="[required]" />
        </v-col>
        <v-col>
          <v-btn icon="mdi-pencil" color="orange" v-if="isEditing"></v-btn>
          <v-btn icon="mdi-delete" color="error" @click="isAddEducation = false"></v-btn>

          <v-btn icon="mdi-content-save" color="success" @click="saveEducation" />
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { EducationDetails } from '@/types/user-details'
import { useUserForm } from '@/composable/useUserForm'
const { formData } = useUserForm()
const formRef = ref()
const isAddEducation = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const addEducation = reactive<EducationDetails>({
  qualification: '',
  university: '',
  result: '',
  passingYear: 0,
})
const required = (value: string): boolean | string => {
  if (value) return true
  return 'filed is required'
}
const educationList = formData.education

async function saveEducation() {
  const result = await formRef?.value?.validate()
  console.log('result:', result)
  console.log('formData:', formData)
  if (result?.valid) {
    formData.education.push({ ...addEducation })
  }
  isAddEducation.value = false
}
function startEdit(index: number) {
  isEditing.value = !isAddEducation.value
  // const form = addEducation[index]
}
function removeEdu(index: number) {
  educationList.splice(index, 1)
}
</script>
