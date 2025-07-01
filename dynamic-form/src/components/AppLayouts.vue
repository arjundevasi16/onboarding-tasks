<template>
  <div class="layout-wrapper">
    <div class="background"></div>
    <v-app>
      <v-main class="pa-0">
        <div class="content-wrapper">
          <slot />
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>
.layout-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background {
  position: absolute;
  inset: 0;
  background-image: url('https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_960_720.png'); /* Make sure this image exists */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: move-bg 20s linear infinite alternate;
  z-index: 0;
}

@keyframes move-bg {
  0% {
    background-position: center top;
  }
  100% {
    background-position: center bottom;
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
</style>
