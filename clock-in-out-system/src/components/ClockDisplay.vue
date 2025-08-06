<template>
  <div class="card shadow text-center p-3">
    <h5>Real-Time Clock</h5>
    <h3 class="text-primary">{{ currentTime }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentTime = ref('')
let interval: number

const updateClock = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
}

onMounted(() => {
  updateClock()
  interval = setInterval(updateClock, 1000)
})

onBeforeUnmount(() => clearInterval(interval))
</script>
