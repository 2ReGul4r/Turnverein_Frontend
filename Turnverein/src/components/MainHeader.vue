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
          <v-list-item prepend-icon="mdi-list-box" title="Meine Kurse" value="myCourses"></v-list-item>
          <v-list-item prepend-icon="mdi-list-box" title="Alle Kurse" value="allCourses"></v-list-item>
          <v-list-item prepend-icon="mdi-account-edit" title="Profil bearbeien" value="profile"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Trainer" value="trainer"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Schüler" value="pupil"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="main" style="height: 100%">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { useUserStore } from "../store/user"
import { Trainer } from "types"

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
  mounted () {
    const userStore = useUserStore();
    this.userData = userStore.getUserData;
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
}
</style>