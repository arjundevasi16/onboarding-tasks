<template>
  <v-app>
    <AppNavbar />
    <v-main class="app-main">
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>
<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.app-main {
  min-height: calc(100vh - 64px - 56px); /* Adjust if app-bar/footer height changes */
  background-color: #f5f5f5; /* light grey background */
}
</style>
