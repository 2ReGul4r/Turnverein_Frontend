<template>
  <CardGrid>
    <template #cards>
      <TrainerCard
        v-for="trainer in trainerData"
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
        class="card_grid_pagination"
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
      await this.appStore.fetchTrainer(this.page);
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
    };
  },
};
</script>
