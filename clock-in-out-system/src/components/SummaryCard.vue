<template>
  <div class="card shadow p-4 text-center summary-card">
    <h5 class="mb-3">Summary</h5>
    <div class="row">
      <div class="col-6">
        <h6>Gross Time</h6>
        <p class="lead">{{ timeStore.grossTime }}</p>
      </div>
      <div class="col-6">
        <h6>Effective Time</h6>
        <p class="lead">{{ timeStore.effectiveTime }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimeStore } from '@/stores/useTimeStore'
const timeStore = useTimeStore()
</script>

<style scoped>
.summary-card {
  min-height: 160px;
}
</style>
