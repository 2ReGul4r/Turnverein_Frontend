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
import MainHeader from "./components/MainHeader.vue";

export default {
  name: "App",
  components: {
    MainHeader,
  },
  computed: {
    isLoginPage() {
      return this.$route.path === "/login";
    },
  },
};

</script>
