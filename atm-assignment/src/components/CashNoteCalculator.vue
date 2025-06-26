<template>
  <div class="container">
    <h2>Cash Note Calculator</h2>

    <input type="number" placeholder="Enter amount" v-model="amount" class="input" />

    <p class="note">Note: Please enter value in multiple of 10 (excluding 10 and 30).</p>

    <button class="btn" @click="calculateCashNotes(amount)">Check</button>

    <div class="results">
      <div class="row">
        <span>No. of ₹20 notes:</span>
        <span>20 × {{ count20 }} =</span>
        <span class="value">₹{{ 20 * count20 }}</span>
      </div>
      <div class="row">
        <span>No. of ₹50 notes:</span>
        <span>50 × {{ count50 }} =</span>
        <span class="value">₹{{ 50 * count50 }}</span>
      </div>
      <div class="row">
        <span>No. of ₹100 notes:</span>
        <span>100 × {{ count100 }} =</span>
        <span class="value">₹{{ 100 * count100 }}</span>
      </div>
    </div>

    <div class="total">
      Total Amount: <strong>₹{{ totalAmount }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const amount = ref<number>(0)
const count20 = ref<number>(0)
const count50 = ref<number>(0)
const count100 = ref<number>(0)

const totalAmount = computed(() => 20 * count20.value + 50 * count50.value + 100 * count100.value)

function calculateCashNotes(value: number) {
  count20.value = 0
  count50.value = 0
  count100.value = 0

  function distribute(amount: number) {
    if (amount === 0 || amount === 10 || amount === 30) {
      alert('Invalid amount. Please avoid 10 or 30.')
      return
    }

    if (amount >= 100 && amount % 100 !== 10 && amount % 100 !== 30) {
      count100.value = Math.floor(amount / 100)
      amount -= count100.value * 100
      distribute(amount)
    } else if (amount % 50 === 0) {
      count50.value = Math.floor(amount / 50)
    } else if (amount % 20 === 0) {
      count20.value = Math.floor(amount / 20)
    } else {
      count20.value++
      distribute(amount - 20)
    }
  }

  distribute(value)
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 12px;
  background-color: #fefefe;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.note {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #2196f3;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 24px;
  font-size: 16px;
}

.btn:hover {
  background-color: #1976d2;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #f9f9f9;
  font-size: 15px;
  flex-wrap: wrap;
}

.row span {
  min-width: 100px;
  text-align: left;
}

.value {
  font-weight: bold;
  color: #333;
  min-width: 80px;
  text-align: right;
}

.total {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #222;
}
</style>
