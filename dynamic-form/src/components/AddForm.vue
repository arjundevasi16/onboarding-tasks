<template>
  <v-container class="pa-4">
    <v-card class="pa-6" max-width="600" elevation="3">
      <v-card-title class="text-h5">Create a New Form</v-card-title>
      <v-card-text>
        <v-text-field
          label="Form Title"
          v-model="formTitle"
          :rules="[(v) => !!v || 'Title is required']"
          required
        />
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
        <v-btn color="primary" :disabled="!formTitle" @click="goToFormBuilder">
          <v-icon size="20" color="primary">mdi-plus</v-icon>
          Add Input Field
        </v-btn>
        <v-btn color="secondary" @click="goToFormList"> 📄 View Form List </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFormStore } from '@/stores/form-schema'
const formStore = useFormStore()
const isEdit = ref(false)
let index: number | null = null
const formTitle = ref('')
const router = useRouter()
const route = useRoute()

function goToFormBuilder() {
  if (isEdit.value) {
    router.push({
      name: 'editFormFields',
      query: { index: index, title: formTitle.value },
    })
    isEdit.value = false
    index = null
    return
  }
  router.push({ name: 'formBuilder', query: { title: formTitle.value } })
}

function goToFormList() {
  router.push('/')
}
onMounted(() => {
  if (route.params.id !== undefined) {
    index = Number(route.params.id)
    isEdit.value = true
    formTitle.value = formStore.schemas[index].title
    return
  }
  isEdit.value = false
  index = null
})
</script>
