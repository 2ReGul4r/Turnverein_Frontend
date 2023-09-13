<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
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
      <v-main style="height: 500px"></v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'MainHeader',
  methods: {
  },
  data () {
    return {
      drawer: true,
      rail: true,
    }
  },
};
</script>