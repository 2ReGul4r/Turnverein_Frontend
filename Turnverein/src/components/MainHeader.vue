<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        @click="rail = false"
        :rail="rail"
        :style="{ position: 'fixed' }"
        permanent
      >
        <v-list-item
          @click="navigate('/profile')"
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
            @click="navigate('/')"
            :active="isActiveRoute('/')"
            prepend-icon="mdi-clipboard-text-clock"
            title="My Courses"
          ></v-list-item>
          <v-list-item
            v-if="isStaffUser"
            @click="navigate('/courses')"
            :active="isActiveRoute('/courses')"
            prepend-icon="mdi-dots-grid"
            title="All Courses"
          ></v-list-item>
          <v-list-item
            v-if="isStaffUser"
            @click="navigate('/trainer')"
            :active="isActiveRoute('/trainer')"
            prepend-icon="mdi-account-group"
            title="Trainer"
          ></v-list-item>
          <v-list-item
            @click="navigate('/member')"
            :active="isActiveRoute('/member')"
            prepend-icon="mdi-crowd"
            title="Students"
          ></v-list-item>
          <v-list-item
            @click="navigate('/profile')"
            :active="isActiveRoute('/profile')"
            prepend-icon="mdi-account-edit"
            title="Edit my profile"
          ></v-list-item>
          <v-list-item
            @click="navigate('/register')"
            :active="isActiveRoute('/register')"
            prepend-icon="mdi-account-plus"
            title="Register new Trainer"
          ></v-list-item>
          <v-list-item
            @click="userStore.logout"
            prepend-icon="mdi-logout"
            title="Logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main
        @click="rail = true"
      >
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
    isStaffUser() {
      return this.userStore.userData.is_staff;
    },
    isActiveRoute() {
      return (route: string) => {
        return this.$route.path === route;
      }
    }
  },
  methods: {
    navigate(route: string) {
      this.$router.push(route);
    }
  },
  data() {
    return {
      drawer: true,
      rail: true,
    };
  },
};
</script>
