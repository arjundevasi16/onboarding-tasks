<template>
  <v-container fluid class="fill-height d-flex align-center justify-center bg-grey-lighten-5">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="8" class="pa-8 rounded-xl text-center">
          <v-icon size="60" color="primary" class="mb-4">mdi-storefront</v-icon>
          <h1 class="text-h4 font-weight-bold mb-2">Welcome to MyShop</h1>
          <p class="text-body-1 text-grey-darken-1 mb-6">
            Explore the best products from all categories. Please log in to view and shop.
          </p>
          <RouterLink to="/login">
            <v-btn color="primary" size="large" class="px-8" rounded>Login to Continue</v-btn>
          </RouterLink>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.bg-grey-lighten-5 {
  background-color: #f5f5f5;
}
</style>
