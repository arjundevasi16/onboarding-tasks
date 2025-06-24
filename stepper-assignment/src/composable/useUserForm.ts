import { reactive } from 'vue'
import type { UserDetails } from '@/types/user-details'

const defaultFormData: UserDetails = {
  personal: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    avatar: null,
    addressLine1: '',
    addressLine2: '',
  },
  bank: {
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    aadhaarNumber: '',
    panNumber: '',
  },
  professional: {
    designation: '',
    department: '',
    experience: {
      years: 0,
      months: 0,
    },
    skills: [],
    currentLocation: '',
    resume: null,
  },
  education: [],
  experience: [],
  currentOrganization: {
    joiningDate: '',
    nextAppraisalDate: '',
    currentCTC: 0,
  },
}

const formData = reactive<UserDetails>(structuredClone(defaultFormData))

function resetForm() {
  Object.assign(formData, structuredClone(defaultFormData))//
}

export function useUserForm() {
  return {
    formData,
    resetForm,
  }
}
