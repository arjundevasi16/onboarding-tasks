<template>
  <div class="container">
    <h1>Tic Tac Toe</h1>

    <div v-if="winner" class="winner-box">
      <span v-if="winner === 'draw'">It's a Draw!</span>
      <span v-else
        >Winner: <strong>{{ winner.toUpperCase() }}</strong></span
      >
    </div>

    <div class="tic-tac-toe">
      <button
        v-for="(value, index) in board"
        :key="index"
        @click="setValue(index)"
        :disabled="board[index] !== '' || !!winner"
        :class="{ win: winningPattern.includes(index) }"
      >
        {{ value }}
      </button>
    </div>

    <button class="reset-btn" @click="resetGame">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const board = ref<string[]>(Array(9).fill(''))
const currentPlayer = ref<string>('x')
const winner = ref<string | null>(null)
const winningPattern = ref<number[]>([])

function setValue(index: number) {
  if (board.value[index] !== '' || winner.value) return

  board.value[index] = currentPlayer.value
  const result = checkWinner()

  if (result) {
    winner.value = result.winner
    winningPattern.value = result.pattern
  } else if (board.value.every((cell) => cell !== '')) {
    winner.value = 'draw'
  } else {
    currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
  }
}

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function checkWinner(): { winner: string; pattern: number[] } | null {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    const val = board.value[a]
    if (val && val === board.value[b] && val === board.value[c]) {
      return { winner: val, pattern }
    }
  }
  return null
}

function resetGame() {
  board.value = Array(9).fill('')
  currentPlayer.value = 'x'
  winner.value = null
  winningPattern.value = []
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #e0f7fa, #fff);
  min-height: 100dvh;
  padding-top: 40px;
  gap: 20px;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 10px;
}

.tic-tac-toe {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 10px;
}

button {
  height: 80px;
  width: 80px;
  font-size: 32px;
  font-weight: bold;
  border-radius: 10px;
  border: 2px solid #555;
  background-color: #fafafa;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:enabled {
  background-color: #cce7ff;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

button.win {
  background-color: #81c784 !important;
  color: white;
  border-color: #388e3c;
}

.reset-btn {
  padding: 10px;
  height: 40px;
  font-size: 16px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.reset-btn:hover {
  background-color: #1565c0;
}

.winner-box {
  font-size: 20px;
  padding: 10px 20px;
  background-color: #f0f4c3;
  color: #666;
  border-radius: 8px;
  border: 1px solid #cddc39;
}
</style>
