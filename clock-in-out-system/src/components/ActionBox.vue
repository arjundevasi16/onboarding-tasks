<template>
  <div class="card shadow p-4 text-center">
    <h5 class="mb-3">Actions</h5>
    <div class="d-flex justify-content-center flex-wrap gap-3">
      <button class="btn btn-success" @click="clockIn" :disabled="timeStore.isClockedIn">
        Clock In
      </button>
      <button class="btn btn-warning" @click="breakOut" :disabled="timeStore.isOnBreak">
        Break Out
      </button>
      <button class="btn btn-info" @click="breakIn">Break In</button>
      <button class="btn btn-danger" @click="clockOut">Clock Out</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimeStore } from '@/stores/useTimeStore'

const timeStore = useTimeStore()

timeStore.restoreDates()
const clockIn = () => timeStore.clockIn()
const clockOut = () => timeStore.clockOut()
const breakIn = () => timeStore.breakIn()
const breakOut = () => timeStore.breakOut()
</script>
