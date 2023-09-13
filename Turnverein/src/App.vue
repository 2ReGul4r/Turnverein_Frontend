<template>
  <div id="app">
    <v-app>
      <MainHeader v-if="!isLoginPage">
        <router-view/>
      </MainHeader>
      <router-view v-else/>
    </v-app>
  </div>
</template>

<script lang="ts">
import { useAppStore } from './store/app';

const store = useAppStore;

export default {
  name: 'App',
  computed: {
    isLoginPage() {
      return this.$route.path === '/login';
    },
  },
};

</script>
