<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">Dashboard</h2>

    <div class="row g-4">
      <div class="col-md-6">
        <ClockDisplay />
      </div>

      <div class="col-md-6">
        <SummaryCard />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <ActionBox />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClockDisplay from '@/components/ClockDisplay.vue'
import ActionBox from '@/components/ActionBox.vue'
import SummaryCard from '@/components/SummaryCard.vue'
</script>
