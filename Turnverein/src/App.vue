<template>
  <div id="app">
    <v-app>
      <MainHeader v-if="showHeader">
        <div style="padding: 32px">
          <router-view />
        </div>
      </MainHeader>
      <router-view v-else />
    </v-app>
  </div>
</template>

<script lang="ts">
import { mapStores } from "pinia";
import MainHeader from "./components/MainHeader.vue";
import { useAppStore } from "./store/app";
import { useUserStore } from "./store/user";

export default {
  name: "App",
  components: {
    MainHeader,
  },
  computed: {
    ...mapStores(useAppStore, useUserStore),
    showHeader() {
      return this.appStore.shouldShowHeader;
    },
  },
};
</script>
