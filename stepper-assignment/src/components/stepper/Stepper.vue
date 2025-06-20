<template>
  <div>
    <v-snackbar v-model="showToast" :timeout="3000" color="orange" location="top right">
      Please enter at least one record
    </v-snackbar>
    <!-- Stepper Header -->
    <div class="d-flex justify-space-between align-center stepper-bar">
      <div
        v-for="(label, index) in labels"
        :key="index"
        class="text-center position-relative"
        style="flex: 1"
      >
        <!-- Circle -->
        <div
          class="mx-auto mb-1 step-circle"
          :class="[
            step === index
              ? 'bg-primary text-white'
              : index < step
                ? 'bg-primary text-white'
                : 'bg-grey-lighten-2 text-grey-darken-2',
          ]"
        >
          <v-icon icon=" mdi-check" v-if="index < step"></v-icon>
          <span v-else>{{ index + 1 }}</span>
        </div>

        <!-- Label -->
        <div :class="step === index ? 'text-primary font-weight-bold' : ''">
          {{ label }}
        </div>

        <!-- Connector Line -->
        <div
          v-if="index < labels.length - 1"
          class="step-line"
          :class="{ 'step-line-active': index < step }"
        ></div>
      </div>
    </div>

    <!-- Current Step Form -->
    <component :is="steps[step]" :ref="(ele) => (stepsRef[step] = ele)" />

    <!-- Navigation Buttons -->
    <div class="d-flex justify-end navBtn">
      <v-btn class="me-2" @click="step--" :disabled="step === 0">Back</v-btn>
      <v-btn color="primary" @click="nextStep">
        {{ step === steps.length - 1 ? 'Submit' : 'Next' }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserForm } from '@/composable/useUserForm'
import { useUserList } from '@/composable/useUserList'
import BankDetailsForm from './BankDetailsForm.vue'
import CurrentDetailsForm from './CurrentDetailsForm.vue'
import ExperienceDetailsForm from './ExperienceDetailsForm.vue'
import ProfessionalDetailsForm from './ProfessionalDetailsForm.vue'
import PersonalDetailsForm from './PersonalDetailsForm.vue'
import EducationDetailsForm from './EducationDetailsForm.vue'

const router = useRouter()
const route = useRoute()
const { formData, resetForm } = useUserForm()
const { addUser, updateUserDetails, deleteUser, getUserDetails } = useUserList()
const showToast = ref(false)
const step = ref<number>(0)
const stepsRef = ref<any[]>([])
const isEditMode = ref<boolean>(false)
const editIndex = ref<number | null>(null)
const labels = [
  'Personal',
  'Bank Details',
  'Professional',
  'Education',
  'Experience',
  'Current Details',
]

const steps = [
  PersonalDetailsForm,
  BankDetailsForm,
  ProfessionalDetailsForm,
  EducationDetailsForm,
  ExperienceDetailsForm,
  CurrentDetailsForm,
]

onMounted(() => {
  const id = route.params.id
  if (id !== undefined) {
    editIndex.value = Number(id)
    const user = getUserDetails(editIndex.value)
    if (user) {
      Object.assign(formData, { ...user })
      isEditMode.value = true
    }
  } else {
    resetForm()
  }
})

function submitForm() {
  if (isEditMode.value && editIndex.value !== null) {
    updateUserDetails(editIndex.value, formData)
  } else {
    addUser(formData)
  }
  resetForm()
  router.push({ name: 'Home' })
}
async function nextStep() {
  const currentRefComponent = stepsRef.value[step.value]
  const isValid = await currentRefComponent?.validator?.()
  if (isValid) {
    if (step.value === 5) {
      submitForm()
      return
    }
    step.value++
  } else {
    if (step.value === 3 || step.value === 4) {
      showToast.value = true
      return
    }
  }
}
</script>

<style scoped>
.navBtn {
  width: 100vw;
  position: fixed;
  z-index: 1000;
  bottom: 0;
  padding: 8px 20px 8px 0;
  border-top: 1px solid #ccc;
  background: white;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.1);
}
.stepper-bar {
  padding-top: 8px;
  position: sticky;
  z-index: 1000;
  background-color: white;
  top: 0;
}

.step-circle {
  width: 35px;
  height: 35px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: relative;
}

.step-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: #ccc;
  z-index: 0;
  transform: translateX(20px); /* half circle size */
}

.step-line-active {
  background-color: #1976d2;
}
</style>
