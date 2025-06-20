<template>
  <v-sheet rounded>
    <v-data-table
      :headers="headers"
      :items="userDataList"
      :hide-default-footer="userDataList.length < 11"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon icon="mdi-account-group" size="x-small" start></v-icon>
            Employee List
          </v-toolbar-title>
          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add Employee"
            @click="addEmployee"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.avatar="{ item }">
        <v-avatar size="30" color="info">
          <v-img :src="getAvatarSrc(item.personal.avatar)" alt="Avatar" />
        </v-avatar>
      </template>

      <template v-slot:item.fullName="{ item }">
        {{ item.personal.firstName }} {{ item.personal.middleName }} {{ item.personal.lastName }}
      </template>

      <template v-slot:item.designation="{ item }">
        {{ item.professional.designation }}
      </template>

      <template v-slot:item.department="{ item }">
        {{ item.professional.department }}
      </template>

      <template v-slot:item.mobile="{ item }">
        {{ item.personal.mobile }}
      </template>

      <template v-slot:item.resume="{ item }">
        <div v-if="getResumeHref(item.professional.resume)">
          <a :href="getResumeHref(item.professional.resume)" target="_blank" download> Download </a>
        </div>
        <div v-else>Not Uploaded</div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon color="primary" icon="mdi-pencil" size="small" @click="edit(item)"></v-icon>
          <v-icon color="red" icon="mdi-delete" size="small" @click="remove(item)"></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script setup lang="ts">
import { useUserList } from '@/composable/useUserList'
import { useRouter } from 'vue-router'

const defaultAvatar = 'https://cdn.vuetifyjs.com/images/john.jpg'
const { userList, deleteUser } = useUserList()
const router = useRouter()
const userDataList = userList

interface HeadersInterface {
  title: string
  key: string
}
const headers: HeadersInterface[] = [
  { title: 'Avatar', key: 'avatar' },
  { title: 'Full Name', key: 'fullName' },
  { title: 'Designation', key: 'designation' },
  { title: 'Department', key: 'department' },
  { title: 'Mobile', key: 'mobile' },
  { title: 'Resume', key: 'resume' },
  { title: 'Actions', key: 'actions' },
]

function getAvatarSrc(avatar: unknown): string {
  if (typeof avatar === 'string') return avatar
  if (avatar instanceof File) return URL.createObjectURL(avatar)
  return defaultAvatar
}

function getResumeHref(resume: unknown): string | undefined {
  if (typeof resume === 'string') return resume
  if (resume instanceof File) return URL.createObjectURL(resume)
  return undefined
}

function addEmployee() {
  router.push({ name: 'AddUser' })
}

function edit(item: any) {
  const index = userDataList.indexOf(item)
  router.push({ name: 'EditUser', params: { id: index } })
}

function remove(item: any) {
  const index = userDataList.indexOf(item)
  if (index !== -1) deleteUser(index)
}
</script>
