<template>
  <div id="app">
    <v-app>
      <MainHeader></MainHeader>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script setup lang="ts">
  import MainHeader from './components/MainHeader.vue';
</script>
