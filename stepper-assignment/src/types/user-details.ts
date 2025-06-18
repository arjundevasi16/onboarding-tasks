export interface UserDetails {
  personal: PersonalDetails
  bank: BankDetails
  professional: ProfessionalDetails
  education: EducationDetails[]
  experience: ExperienceDetails[]
  currentOrganization: CurrentOrganizationDetails
}

// ------------------ Personal ------------------

export interface PersonalDetails {
  firstName: string
  middleName?: string
  lastName: string
  email: string
  mobile: string
  dob: string
  gender: string
  avatar: File | null
  addressLine1: string
  addressLine2?: string
}

// ------------------ Bank ------------------

export interface BankDetails {
  bankName: string
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  aadhaarNumber: string
  panNumber: string
}

// ------------------ Professional ------------------

export interface ProfessionalDetails {
  designation: string
  department: string
  experience: {
    years: number
    months: number
  }
  skills: string[]
  currentLocation: string
  resume: File | null
}

// ------------------ Education ------------------

export interface EducationDetails {
  qualification: string
  university: string
  result: string
  passingYear: number
}

// ------------------ Experience ------------------

export interface ExperienceDetails {
  companyName: string
  position: string
  totalYears: number
  lastCTC: number
}

// ------------------ Current Organization ------------------

export interface CurrentOrganizationDetails {
  joiningDate: string
  nextAppraisalDate: string
  currentCTC: number
}
