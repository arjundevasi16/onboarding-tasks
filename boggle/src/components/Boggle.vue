<template>
  <div class="game-container">
    <h1>Boggle Game</h1>

    <div class="controls">
      <button @click="startGame">Start Game</button>
      <button @click="endGame">End Game</button>
    </div>

    <div class="scoreboard">
      <p><strong>Score:</strong> {{ score }}</p>
    </div>

    <div class="grid">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div
          v-for="(letter, colIndex) in row"
          :key="colIndex"
          :class="[founded(letter) ? 'foundedCell' : 'notFound', 'cell']"
        >
          {{ letter.toUpperCase() }}
        </div>
      </div>
    </div>

    <div class="word-input">
      <input type="text" v-model="textValidate" placeholder="Enter word" />
      <button @click="validateText">Validate</button>
    </div>

    <div class="found-words">
      <p><strong>Found Words:</strong></p>
      <ul>
        <li v-for="(word, index) in foundWords" :key="index">
          {{ word.toUpperCase() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// local reactive state
const grid = ref<string[][]>([]);
const textValidate = ref("");
const score = ref(0);
const foundWords = ref<string[]>([]);
const selectedWords = ref<string[]>([]);

const wordList = [
  "play",
  "cold",
  "game",
  "bake",
  "time",
  "lamp",
  "hard",
  "soft",
];

function startGame() {
  // Reset everything
  grid.value = [];
  score.value = 0;
  foundWords.value = [];
  selectedWords.value = [];

  // Pick 4 random unique words
  while (selectedWords.value.length < 4) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    if (!selectedWords.value.includes(randomWord)) {
      selectedWords.value.push(randomWord);
    }
  }

  // Extract letters and shuffle
  const letterPool = selectedWords.value.flatMap((word) => word.split(""));
  const shuffled = [...letterPool];
  shuffle(shuffled);

  // Fill grid
  for (let i = 0; i < 4; i++) {
    grid.value.push(shuffled.slice(i * 4, i * 4 + 4));
  }
}

function shuffle(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function validateText() {
  const word = textValidate.value.toLowerCase();

  if (selectedWords.value.includes(word) && !foundWords.value.includes(word)) {
    foundWords.value.push(word);
    score.value += 1;
    textValidate.value = "";

    if (foundWords.value.length === 4) {
      alert("🎉 You found all words!");
    }
  } else {
    alert("Invalid or already found word.");
  }
}
function founded(letter: string) {
  return !!foundWords.value.find((word) => {
    return word.split("").includes(letter);
  });
}
function endGame() {
  grid.value = [];
  score.value = 0;
  foundWords.value = [];
  selectedWords.value = [];
  textValidate.value = "";
}

onMounted(() => {
  startGame();
});
</script>

<style scoped>
.game-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
  background: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.controls {
  margin-bottom: 15px;
}
.scoreboard {
  margin-bottom: 15px;
  font-size: 18px;
}
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
}
.cell {
  width: 50px;
  height: 50px;
  margin: 5px;

  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 20px;
}
.notFound {
  background-color: #222;
}
.foundedCell {
  background-color: #07dd23;
}
.word-input {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}
input {
  padding: 8px;
  border-radius: 4px;
  width: 140px;
}
.found-words {
  text-align: left;
  padding: 0 20px;
}
</style>
