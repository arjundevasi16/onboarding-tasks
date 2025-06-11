<template>
  <nav class="navbar">
    <span>Folder Structure</span>
  </nav>

  <div class="add-root-folder" @click="isAdd = !isAdd">
    <span>Add folder at root</span>
  </div>

  <ul class="folder-list">
    <Folder
      :folder="folder"
      v-for="(folder, index) in folders"
      :key="index"
      :folderIndex="index"
      @addFolder="addChildren"
      @removeNode="removeNode"
    />
  </ul>
  <div v-if="isAdd" class="add-folder-form">
    <InputForm @submit="AddRootFolder" @cancel="isAdd = !isAdd" :addRootNode="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import InputForm from '@/components/InputForm.vue'
import Folder from '@/components/Folder.vue'

interface FileNode {
  id: number
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

const folders = reactive<FileNode[]>([])

const isAdd = ref(false)

function addChildren(parentId: number, child: FileNode) {
  const addRecursively = (nodes: FileNode[]): boolean => {
    for (const node of nodes) {
      if (node.id === parentId) {
        if (!node.children) node.children = []
        node.children.push({ ...child, children: [] })
        return true
      }
      if (node.children && addRecursively(node.children)) {
        return true
      }
    }
    return false
  }

  addRecursively(folders)
}

function removeNode(idToRemove: number) {
  const removeRecursively = (nodes: FileNode[]): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === idToRemove) {
        nodes.splice(i, 1)
        return true
      }
      if (nodes[i].children && removeRecursively(nodes[i].children as FileNode[])) {
        return true
      }
    }
    return false
  }

  removeRecursively(folders)
}

function AddRootFolder(node: FileNode) {
  folders.push({ ...node, type: 'folder', children: [] })
  isAdd.value = false
}
</script>

<style scoped>
/* Navigation bar */
.navbar {
  text-align: center;
  background-color: #1f2937; /* dark gray */
  color: white;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
}

/* Root Add Folder Button */
.add-root-folder {
  margin: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  width: fit-content;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.add-root-folder:hover {
  background-color: #2563eb;
}

/* Folder List */
.folder-list {
  list-style: none;
  padding-left: 24px;
  margin-top: 16px;
}

/* Folder Item */
.folder-list li {
  display: flex;
  align-items: flex-start;
  margin: 8px 0;
}

.folder-list li div {
  margin-left: 12px;
}

.add-folder-form input {
  padding: 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  font-size: 14px;
  width: 200px;
}

.add-folder-form input:focus {
  border-color: #3b82f6;
}

/* Action Icons */
.icon {
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.15s;
}

.confirm {
  color: #16a34a;
}

.cancel {
  color: #dc2626;
}

.icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
