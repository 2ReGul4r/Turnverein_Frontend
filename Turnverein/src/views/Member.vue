<template>
  <CardGrid>
    <template #cards>
      <MemberCard
        v-for="member in memberData"
        class="course_card"
        :member="member"
      />
    </template>
    <template #pagination>
      <v-pagination
        v-if="getMemberDataPageCount > 1"
        v-model="page"
        :length="getMemberDataPageCount"
        :style="getPaginationStyleWidth"
        class="card_grid_pagination"
        rounded="circle"
      />
    </template>
  </CardGrid>
</template>

<script lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import MemberCard from "@/components/Cards/MemberCard.vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  name: "MemberView",
  components: {
    CardGrid,
    MemberCard,
  },
  computed: {
    ...mapStores(useAppStore, useUserStore),
    memberData() {
      return this.appStore.getMemberList;
    },
    getMemberDataPageCount() {
      return this.appStore.getMemberListPages;
    },
    getPaginationStyleWidth() {
      const buttonWidth = 48;
      const buttonPadding = 9.6;
      return {
        width:
          (this.getMemberDataPageCount + 3) * (buttonWidth + buttonPadding),
      };
    },
  },
  methods: {
    async updateMemberData() {
      await this.appStore.fetchMember(this.page);
    },
  },
  async mounted() {
    await this.updateMemberData();
  },
  watch: {
    async page() {
      await this.updateMemberData();
    },
  },
  data() {
    return {
      page: 1,
    };
  },
};
</script>
