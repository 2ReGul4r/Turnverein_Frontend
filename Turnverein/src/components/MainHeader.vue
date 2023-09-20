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
          :title="getUserTitle"
          nav
          prepend-icon="mdi-account"
          style="padding: 4px 16px"
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
          <v-list-item
            prepend-icon="mdi-clipboard-text-clock"
            title="Kurse"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group"
            title="Trainer"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-crowd" title="Schüler"></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-edit"
            title="Profil bearbeien"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="userStore.logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="main" style="height: 100%">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { useUserStore } from "../store/user";
import { mapStores } from "pinia";

export default {
  name: "MainHeader",
  computed: {
    ...mapStores(useUserStore),
    getUserTitle() {
      if (!this.userStore.userData) {
        return "";
      }
      return `${this.userStore.userData.first_name} ${this.userStore.userData.last_name}`;
    },
  },
  async mounted() {
    await this.userStore.fetchUserData();
  },
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
};
</script>

<style>
.main {
  display: flex;
  margin: 32px;
}
</style>
