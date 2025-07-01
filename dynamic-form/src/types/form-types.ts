export interface FormFields {
  type: string
  label: string
  options?: string[]
  validation: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: string
    customMessage?: string
  }
}
export interface FormSchema {
  id: number
  title: string
  fields: FormFields[]
}
