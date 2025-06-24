<template>
  <div class="container">
    <h1>Bingo Board</h1>
    <h2 v-if="randomNumber !== null">Drawn Number: {{ randomNumber }}</h2>

    <div class="bingoBoardCard">
      <div
        v-for="number in bingoBoardNumbers"
        :key="number"
        class="card"
        :class="{ match: checked.includes(number) }"
      >
        {{ number }}
      </div>
    </div>

    <div class="controls">
      <button @click="startGame" :disabled="Boolean(timer) || winner">Start</button>
      <button @click="resetGame">Reset</button>
    </div>

    <div v-if="winner" class="winner-banner">🎉 BINGO! You matched all numbers!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const randomNumber = ref<number | null>(null)
const timer = ref<number | null>(null)
const bingoBoardNumbers = ref<number[]>([])
const checked = ref<number[]>([])
const winner = ref(false)

const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 100)
}

function createBingoBoardNumbers() {
  bingoBoardNumbers.value = []
  while (bingoBoardNumbers.value.length < 25) {
    const number = randomNumberGenerator()
    if (!bingoBoardNumbers.value.includes(number)) {
      bingoBoardNumbers.value.push(number)
    }
  }
}

function startGame() {
  timer.value = setInterval(() => {
    const next = randomNumberGenerator()
    randomNumber.value = next

    if (bingoBoardNumbers.value.includes(next) && !checked.value.includes(next)) {
      checked.value.push(next)
    }

    if (checked.value.length === 25) {
      declareWinner()
    }
  }, 500)
}

function declareWinner() {
  winner.value = true
  if (timer.value) clearInterval(timer.value)
  timer.value = null
}

function resetGame() {
  if (timer.value) clearInterval(timer.value)
  timer.value = null
  randomNumber.value = null
  checked.value = []
  winner.value = false
  createBingoBoardNumbers()
}

onMounted(() => {
  createBingoBoardNumbers()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  margin: 10px 0;
}

.bingoBoardCard {
  display: grid;
  grid-template-columns: repeat(5, 80px);
  gap: 10px;
  padding: 20px;
  border: 2px solid #333;
  background-color: #fafafa;
  border-radius: 8px;
}

.card {
  background-color: aliceblue;
  padding: 15px 0;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  border-radius: 6px;
  transition: all 0.3s;
  border: 1px solid #ccc;
}

.card.match {
  background-color: greenyellow;
  color: white;
  border-color: #2e7d32;
}

.controls {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.winner-banner {
  margin-top: 20px;
  font-size: 24px;
  color: #388e3c;
  font-weight: bold;
  background-color: #dcedc8;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: 0 0 10px #9ccc65;
}
</style>
