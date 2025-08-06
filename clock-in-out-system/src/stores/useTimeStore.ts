import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useTimeStore = defineStore(
  'time',
  () => {
    const clockInTime = ref<Date | null>(null)
    const clockOutTime = ref<Date | null>(null)
    const breaks = ref<{ start: Date; end?: Date }[]>([])
    const now = ref(new Date())
    let timer: ReturnType<typeof setInterval> | null = null
    const restoreDates = () => {
      if (typeof clockInTime.value === 'string') {
        clockInTime.value = new Date(clockInTime.value)
      }
      if (typeof clockOutTime.value === 'string') {
        clockOutTime.value = new Date(clockOutTime.value)
      }
      breaks.value = breaks.value.map((b) => ({
        start: new Date(b.start),
        end: b.end ? new Date(b.end) : undefined,
      }))
    }
    restoreDates()
    const isClockedIn = computed(() => !!clockInTime.value && !clockOutTime.value)
    const isOnBreak = computed(() => {
      const lastBreak = breaks.value[breaks.value.length - 1]
      return lastBreak && !lastBreak.end
    })

    const totalBreakMs = computed(() => {
      return breaks.value.reduce((acc, b) => {
        if (b.start instanceof Date && (!b.end || b.end instanceof Date)) {
          const start = new Date(b.start).getTime()
          const end = b.end ? new Date(b.end).getTime() : now.value.getTime()
          return acc + (end - start)
        }
        return acc
      }, 0)
    })

    const grossTime = computed(() => {
      if (!(clockInTime.value instanceof Date)) return '00:00:00'
      const end = clockOutTime.value instanceof Date ? clockOutTime.value : now.value
      const duration = end.getTime() - clockInTime.value.getTime()
      return formatDuration(duration)
    })

    const effectiveTime = computed(() => {
      if (!(clockInTime.value instanceof Date)) return '00:00:00'
      const end = clockOutTime.value instanceof Date ? clockOutTime.value : now.value
      const total = end.getTime() - clockInTime.value.getTime()
      const effective = Math.max(0, total - totalBreakMs.value)
      return formatDuration(effective)
    })

    function clockIn() {
      clockInTime.value = new Date()
      clockOutTime.value = null
      breaks.value = []
      startClock()
    }

    function clockOut() {
      clockOutTime.value = new Date()
      stopClock()
    }

    function breakOut() {
      if (!isOnBreak.value) {
        breaks.value.push({ start: new Date() })
      }
    }

    function breakIn() {
      const lastBreak = breaks.value[breaks.value.length - 1]
      if (lastBreak && !lastBreak.end) {
        lastBreak.end = new Date()
      }
    }

    function formatDuration(ms: number): string {
      const sec = Math.floor(ms / 1000)
      const h = Math.floor(sec / 3600)
      const m = Math.floor((sec % 3600) / 60)
      const s = sec % 60
      return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
    }

    function startClock() {
      stopClock()
      timer = setInterval(() => {
        now.value = new Date()
      }, 1000)
    }

    function stopClock() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    // Auto-start clock if already clocked in (after rehydration)
    if (isClockedIn.value) {
      startClock()
    }

    return {
      clockInTime,
      clockOutTime,
      breaks,
      isClockedIn,
      isOnBreak,
      effectiveTime,
      grossTime,
      clockIn,
      clockOut,
      breakOut,
      breakIn,
      restoreDates,
    }
  },
  { persist: true },
)
