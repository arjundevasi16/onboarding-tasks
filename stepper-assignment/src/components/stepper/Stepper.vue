<template>
  <div>
    <h1 class="text-h5 mb-4">Stepper</h1>

    <!-- Stepper Header -->
    <div class="d-flex justify-space-between align-center mb-6 position-relative stepper-bar">
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
    <div class="ma-6 d-flex justify-end">
      <v-btn variant="outlined" class="me-2" @click="step--" :disabled="step === 0">Back</v-btn>
      <v-btn color="primary" @click="nextStep">
        {{ step === steps.length - 1 ? 'Submit' : 'Next' }}
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BankDetailsForm from './BankDetailsForm.vue'
import CurrentDetailsForm from './CurrentDetailsForm.vue'
import ExperienceDetailsForm from './ExperienceDetailsForm.vue'
import ProfessionalDetailsForm from './ProfessionalDetailsForm.vue'
import PersonalDetailsForm from './PersonalDetailsForm.vue'
import EducationDetailsForm from './EducationDetailsForm.vue'
interface stepComponent {
  validator: () => boolean | Promise<boolean>
}
const step = ref<number>(0)
const stepsRef = ref<stepComponent[]>([])
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

async function nextStep() {
  const currentRefComponent = stepsRef.value[step.value]
  const isValid = await currentRefComponent?.validator?.()
  if (!isValid) {
    if (step.value < steps.length - 1) {
      step.value++
    } else {
      alert('Finished!')
    }
  }
}
</script>

<style scoped>
.stepper-bar {
  padding-top: 12px;
}

.step-circle {
  width: 40px;
  height: 40px;
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
