<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(form, index) in formStore.schemas" :key="index" cols="12" md="6" lg="4">
        <v-card class="glass-card pa-5" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-2">{{ form.title }}</h3>
          <p class="text-caption mb-4">Fields: {{ form.fields.length }}</p>

          <!-- Actions -->
          <div class="d-flex ga-4">
            <v-btn size="small" color="primary" @click="previewForm(index)">
              <v-icon start icon="mdi-eye" /> Preview
            </v-btn>

            <v-btn size="small" color="green" @click="editForm(index)">
              <v-icon start icon="mdi-pencil" /> Edit
            </v-btn>

            <v-btn size="small" color="red" @click="deleteForm(index)">
              <v-icon start icon="mdi-delete" /> Delete
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Floating Add Button -->
    <div class="position-fixed bottom-0 right-0">
      <v-btn
        icon="mdi-plus"
        size="x-large"
        class="add-btn mb-14 mr-10 elevation-8"
        @click="addForm"
      >
        <v-icon color="primary" size="36" icon="mdi-plus" />
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form-schema'

const router = useRouter()
const formStore = useFormStore()

function addForm() {
  router.push({ name: 'addForm' })
}

function previewForm(index: number) {
  router.push({ name: 'previewForm', params: { id: index } })
}

function editForm(index: number) {
  router.push({ name: 'editForm', params: { id: index } })
}

function deleteForm(index: number) {
  formStore.schemas.splice(index, 1)
}
</script>

<style scoped>
.add-btn {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-radius: 50%;
}

.add-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.glass-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.v-card-title,
.text-h6,
.text-caption {
  color: #fff !important;
}
</style>
