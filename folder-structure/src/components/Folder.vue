<template>
  <div class="tree-node">
    <div class="node-label" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
      <span>{{ folder.type === 'folder' ? '📂' : '🗃️' }}</span>
      <span>{{ folder.name }}</span>

      <div v-if="isHovered" class="actions">
        <div v-if="isAddFileOrFolder" class="icon-wrapper">
          <span
            v-if="folder.type === 'folder'"
            class="icon add-icon"
            @click="isAddFileOrFolder = !isAddFileOrFolder"
          >
            ➕
          </span>
          <DeleteIcon class="icon delete-icon" @click="removeChild(folder.id)" />
        </div>
        <div v-else>
          <InputForm
            @submit="handelSubmit"
            @cancel="isAddFileOrFolder = true"
            :addRootNode="false"
          />
        </div>
      </div>
    </div>

    <ul v-if="folder.type === 'folder' && folder.children?.length">
      <li v-for="(child, index) in folder.children" :key="index">
        <Folder
          :folder="child"
          @addFolder="(...args) => $emit('addFolder', ...args)"
          @removeNode="(id) => $emit('removeNode', id)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputForm from '@/components/InputForm.vue'
import DeleteIcon from '@/icon/DeleteIcon.vue'
const emits = defineEmits(['addFolder', 'removeNode'])
const props = defineProps({
  folder: {
    type: Object,
    required: true,
  },
  folderIndex: Number,
})
let isAddFileOrFolder = ref(true)
const isHovered = ref(false)
function removeChild(id) {
  emits('removeNode', id)
}
function handelSubmit(newNode) {
  emits('addFolder', props.folder.id, newNode)
  isAddFileOrFolder.value = !isAddFileOrFolder.value
}
</script>

<style scoped>
.tree-node {
  position: relative;
  padding-left: 20px;
  margin-left: 10px;
  border-left: 1px solid #2f2f2f;
}

.node-label {
  position: relative;
  display: flex;
  gap: 8px;
  padding: 4px 0;
}

.node-label::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  width: 20px;
  height: 1px;
  background-color: #2f2f2f;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.actions {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 14px;
  gap: 10px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s;
}

.add-icon:hover {
  color: green;
}

.delete-icon {
  color: red;
}

.delete-icon:hover {
  color: darkred;
}
</style>
