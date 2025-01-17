<template>
  <v-form @submit.prevent="updateTrainerData">
    <div class="wrapper">
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
      <v-btn
        v-if="isStaffUser"
        variant="tonal"
        height="56px"
        prependIcon="mdi-plus"
        width="192px"
        rounded
      >
        Create Trainer
        <TrainerCreatePopup :page="page" />
      </v-btn>
    </div>
  </v-form>
  <CardGrid>
    <template #cards>
      <TrainerCard
        v-for="trainer in trainerData"
        :key="trainer.id"
        class="course_card"
        :trainer="trainer"
        :page="page"
      />
      <v-alert v-if="trainerData.length === 0" title="Alert" icon="$info">
        <div v-if="searchText.length === 0">
          At this moment there are no trainers.
        </div>
        <div v-else>
          No trainers found with that name.
        </div>
      </v-alert>
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
import { getPaginationButtonStyles } from "./../../utils";
import TrainerCreatePopup from "@/components/PopUps/TrainerCreatePopup.vue";

export default {
  name: "TrainerView",
  components: {
    CardGrid,
    TrainerCard,
    TrainerCreatePopup,
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
      return getPaginationButtonStyles(this.getTrainerDataPageCount);
    },
    isStaffUser() {
      return this.userStore.getUserData.is_staff;
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
.wrapper {
  display: flex;
}
.searchBar {
  margin-right: 12px;
}
</style>
