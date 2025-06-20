<template>
  <v-card flat class="pa-4">
    <v-card-title class="text-center text-h5 mb-4">Experience Details</v-card-title>

    <!-- Add Button -->
    <div class="d-flex justify-end mb-4">
      <v-btn
        prepend-icon="mdi-plus"
        class="bg-orange text-white"
        @click="openAddForm"
        :disabled="isAddExperience"
      >
        Add Experience
      </v-btn>
    </div>

    <!-- Table Header -->
    <v-row dense class="font-weight-bold text-center mb-2 bg-grey-lighten-4 rounded">
      <v-col>Company Name</v-col>
      <v-col>Position</v-col>
      <v-col>Total Years</v-col>
      <v-col>Last CTC</v-col>
      <v-col>Action</v-col>
    </v-row>

    <!-- Experience List -->
    <div v-if="experienceList.length">
      <template v-for="(item, index) in experienceList" :key="index">
        <!-- Edit Row -->
        <v-form v-if="editingIndex === index" :ref="(el) => (editFormRefs[index] = el)">
          <v-row dense class="text-center align-center">
            <v-col>
              <v-text-field
                v-model="addExperience.companyName"
                :rules="[required]"
                density="compact"
                placeholder="Company"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="addExperience.position"
                :rules="[required]"
                density="compact"
                variant="outlined"
                placeholder="Position"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model.number="addExperience.totalYears"
                type="number"
                :rules="[required]"
                density="compact"
                variant="outlined"
                placeholder="Years"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model.number="addExperience.lastCTC"
                type="number"
                :rules="[required]"
                density="compact"
                variant="outlined"
                placeholder="Last CTC"
              />
            </v-col>
            <v-col class="mb-4">
              <v-icon color="success" class="me-2" @click="saveExperience(index)"
                >mdi-content-save</v-icon
              >
              <v-icon color="grey" @click="cancelForm">mdi-close</v-icon>
            </v-col>
          </v-row>
        </v-form>

        <!-- Display Row -->
        <template v-else>
          <v-row dense class="text-center align-center">
            <v-col>{{ item.companyName }}</v-col>
            <v-col>{{ item.position }}</v-col>
            <v-col>{{ item.totalYears }}</v-col>
            <v-col>{{ item.lastCTC }}</v-col>
            <v-col>
              <v-icon class="me-2" color="primary" @click="startEdit(index)">mdi-pencil</v-icon>
              <v-icon color="error" @click="removeExperience(index)">mdi-delete</v-icon>
            </v-col>
          </v-row>
        </template>
      </template>
    </div>

    <!-- No Records -->
    <div v-else class="text-grey text-center my-4">
      <v-icon size="28" class="mb-2" color="grey">mdi-information-outline</v-icon>
      <div>No experience records found.</div>
    </div>

    <!-- Add Row -->
    <v-form v-if="isAddExperience" ref="addFormRef" class="mt-2">
      <v-row dense class="text-center align-center">
        <v-col>
          <v-text-field
            v-model="addExperience.companyName"
            :rules="[required]"
            placeholder="Company Name"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="addExperience.position"
            :rules="[required]"
            placeholder="Position"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="addExperience.totalYears"
            :rules="[required]"
            type="number"
            placeholder="Years"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model.number="addExperience.lastCTC"
            :rules="[required]"
            type="number"
            placeholder="Last CTC"
            density="compact"
            variant="outlined"
          />
        </v-col>
        <v-col class="mb-4">
          <v-icon color="success" class="me-2" @click="saveExperience()">mdi-content-save</v-icon>
          <v-icon color="grey" @click="cancelForm">mdi-close</v-icon>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserForm } from '@/composable/useUserForm'
import type { ExperienceDetails } from '@/types/user-details'

const { formData } = useUserForm()
const experienceList = formData.experience

const addFormRef = ref()
const editFormRefs = ref<any[]>([])

const isAddExperience = ref(false)
const editingIndex = ref<number | null>(null)

const addExperience = ref<ExperienceDetails>({
  companyName: '',
  position: '',
  totalYears: 0,
  lastCTC: 0,
})

const required = (v: string | number) => !!v || 'Field is required'

function resetForm() {
  addExperience.value = {
    companyName: '',
    position: '',
    totalYears: 0,
    lastCTC: 0,
  }
}

function openAddForm() {
  resetForm()
  isAddExperience.value = true
  editingIndex.value = null
}

function cancelForm() {
  resetForm()
  isAddExperience.value = false
  editingIndex.value = null
}

async function saveExperience(index?: number) {
  const formToValidate = index !== undefined ? editFormRefs.value[index] : addFormRef.value
  const result = await formToValidate?.validate()

  if (!result?.valid) return

  const newEntry = { ...addExperience.value }
  if (index !== undefined) {
    experienceList.splice(index, 1, newEntry)
  } else {
    experienceList.push(newEntry)
  }
  cancelForm()
}

function startEdit(index: number) {
  addExperience.value = { ...experienceList[index] }
  editingIndex.value = index
  isAddExperience.value = false
}

function removeExperience(index: number) {
  experienceList.splice(index, 1)
}

const validator = () => {
  return formData.experience.length >= 1
}
defineExpose({ validator })
</script>
