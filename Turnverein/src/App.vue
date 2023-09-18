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
import axiosInstance from "./axios-config";
import { AxiosResponse, AxiosError } from "axios";

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
  methods: {
    async fetchUserData() {
      await axiosInstance.get(
        "userdata/"
      ).then(async (response: AxiosResponse) => {

      }).catch((error: AxiosError) => {
        console.log(error);
      });
    },
  },
};

</script>
