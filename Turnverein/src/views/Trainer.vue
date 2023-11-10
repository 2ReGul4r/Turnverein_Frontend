<template>
  <v-form @submit.prevent="updateTrainerData">
    <v-text-field
      v-model="searchText"
      @click:append-inner="updateTrainerData"
      @click:append="clearSearchBar"
      :loading="searchLoading"
      append-inner-icon="mdi-magnify"
      append-icon="mdi-close-circle-outline"
      class="searchBar"
      label="Search"
      single-line
      variant="outlined"
    />
  </v-form>
  <CardGrid>
    <template #cards>
      <TrainerCard
        v-for="trainer in trainerData"
        :key="trainer.id"
        class="course_card"
        :trainer="trainer"
      />
    </template>
    <template #pagination>
      <v-pagination
        v-if="getTrainerDataPageCount > 1"
        v-model="page"
        :length="getTrainerDataPageCount"
        :style="getPaginationStyleWidth"
        rounded="circle"
      />
    </template>
  </CardGrid>
</template>

<script lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import TrainerCard from "@/components/Cards/TrainerCard.vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  name: "TrainerView",
  components: {
    CardGrid,
    TrainerCard,
  },
  computed: {
    ...mapStores(useAppStore, useUserStore),
    trainerData() {
      return this.appStore.getTrainerList;
    },
    getTrainerDataPageCount() {
      return this.appStore.getTrainerListPages;
    },
    getPaginationStyleWidth() {
      const buttonWidth = 48;
      const buttonPadding = 9.6;
      return {
        width:
          (this.getTrainerDataPageCount + 3) * (buttonWidth + buttonPadding),
      };
    },
  },
  methods: {
    async updateTrainerData() {
      this.searchLoading = true;
      await this.appStore.fetchTrainer(this.page, this.searchText);
      this.searchLoading = false;
    },
    async clearSearchBar() {
      this.searchText = "";
      await this.updateTrainerData();
    },
  },
  async mounted() {
    await this.updateTrainerData();
  },
  watch: {
    async page() {
      await this.updateTrainerData();
    },
  },
  data() {
    return {
      page: 1,
      searchText: "",
      searchLoading: false,
    };
  },
};
</script>

<style scoped>
.searchBar {
  margin: 16px;
}
</style>
