<template>
  <div class="add-item-form">
    <!-- Type Selector -->
    <div v-if="!selectedType && !addRootNode" class="type-selector">
      <button @click="selectType('folder')" class="type-btn">📁 Folder</button>
      <button @click="selectType('file')" class="type-btn">🗃️ File</button>
    </div>

    <!-- Input Form -->
    <div v-else class="input-container">
      <input
        v-model="name"
        placeholder="Enter name"
        @keyup.enter="submit"
        ref="inputRef"
        class="input"
      />
      <button class="icon-btn confirm" @click="submit">✔️</button>
      <button class="icon-btn cancel" @click="$emit('cancel')">❌</button>
    </div>

    <!-- Error -->
    <p v-if="showError" class="error">⚠️ Name is required</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

// Define emitted events
const emit = defineEmits<{
  (e: 'submit', payload: { id: number; name: string; type: 'file' | 'folder' }): void
  (e: 'cancel'): void
}>()

// Define props
const props = defineProps<{
  addRootNode: boolean
}>()

// Refs
const selectedType = ref<'file' | 'folder' | ''>('')
const name = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const showError = ref(false)

// Auto-select folder if it's a root node
if (props.addRootNode) selectedType.value = 'folder'

// Autofocus when type is selected
watch(
  selectedType,
  async () => {
    await nextTick()
    inputRef.value?.focus()
  },
  { immediate: true },
)

// Handle selection of type
function selectType(type: 'file' | 'folder') {
  selectedType.value = type
}

// Handle form submission
function submit() {
  if (!name.value.trim()) {
    showError.value = true
    return
  }

  const payload = {
    id: Date.now(),
    name: name.value.trim(),
    type: selectedType.value || 'folder',
  }

  emit('submit', payload)

  // Reset form state
  name.value = ''
  showError.value = false
  selectedType.value = props.addRootNode ? 'folder' : ''
}
</script>

<style scoped>
.add-item-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background-color: #f9fafb;
  padding: 12px 16px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 300px;
  font-family: sans-serif;
}

.type-selector {
  display: flex;
  gap: 12px;
}

.type-btn {
  background-color: #e2e8f0;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.type-btn:hover {
  background-color: #cbd5e1;
}

.input-container {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: #3b82f6;
}

.icon-btn {
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px;
  transition: transform 0.1s ease;
}

.icon-btn:hover {
  transform: scale(1.2);
}

.confirm {
  color: #16a34a;
}

.cancel {
  color: #dc2626;
}

.error {
  color: #dc2626;
  font-size: 14px;
  margin: 0;
}
</style>
