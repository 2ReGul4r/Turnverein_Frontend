<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        @click="rail = false"
        :rail="rail"
        permanent
      >
        <v-list-item
          prepend-icon="mdi-account"
          :title="getUserTitle"
          nav
        >
          <template v-slot:append>
            <v-btn
              @click.stop="rail = !rail"
              icon="mdi-chevron-left"
              variant="text"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-clipboard-text-clock" title="Kurse"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group" title="Trainer"></v-list-item>
          <v-list-item prepend-icon="mdi-crowd" title="Schüler"></v-list-item>
          <v-list-item prepend-icon="mdi-account-edit" title="Profil bearbeien"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="main" style="height: 100%">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Trainer } from 'types';
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";
import router from '@/router';

export default {
  name: "MainHeader",
  computed: {
    getUserTitle() {
      if(!this.userData) {
        return ""
      }
      return `${this.userData.first_name} ${this.userData.last_name}`
    }
  },
  methods: {
    async fetchUserData() {
      await axiosInstance.get(
        "userdata",
        { headers: { "Authorization": `Token ${localStorage.getItem("token")}` }}
      ).then(async (response: AxiosResponse) => {
        this.userData = response.data.data;
      }).catch((error: AxiosError) => {
        console.log(error);
      });
    },
    async logout() {
      await axiosInstance.post(
        "logout",
        { "token": localStorage.getItem("token") }
      ).then(async (response: AxiosResponse) => {
        localStorage.removeItem("token");
        router.push("/login")
      }).catch((error: AxiosError) => {
        console.log(error);
      });
    }
  },
  async mounted() {
    await this.fetchUserData();
  },
  data () {
    return {
      drawer: true,
      rail: true,
      userData: {} as Trainer,
    }
  },
};
</script>

<style>
.main {
  display: flex;
  margin: 32px;
}
</style>