import { reactive, watch } from 'vue'
import type { UserDetails } from '@/types/user-details'

const userList = reactive<UserDetails[]>([])
const stored = localStorage.getItem('userList')

if (stored) {
  userList.push(...JSON.parse(stored))
}

watch(
  userList,
  () => {
    localStorage.setItem('userList', JSON.stringify(userList))
  },
  { deep: true },
)

export function useUserList() {
  function addUser(user: UserDetails) {
    userList.push({ ...user })
  }

  function resetUserList() {
    userList.splice(0)
  }
  function updateUserDetails(index: number, details: UserDetails) {
    userList[index] = structuredClone(details)
  }
  function deleteUser(index: number) {
    userList.splice(index, 1)
  }
  function getUserDetails(index: number) {
    return userList[index]
  }
  return {
    userList,
    addUser,
    resetUserList,
    updateUserDetails,
    deleteUser,
  }
}
