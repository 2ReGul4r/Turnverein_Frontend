<template>
    <v-app-bar :elevation="8" rounded>
        <template v-slot:prepend>
            <v-app-bar-nav-icon
                @click="navIconClick()"
            />
        </template>
        <template v-slot:default>
            <v-app-bar-title>Vereinsverwaltung</v-app-bar-title>
        </template>
        <template v-slot:append>
            <v-btn icon="mdi-account-cog"></v-btn>

            <v-btn icon="mdi-magnify"></v-btn>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
export default {
  name: 'MainHeader',
  methods: {
    navIconClick() {
      alert('Button wurde geklickt!');
    },
  },
};
</script>