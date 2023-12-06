<template>
  <v-form @submit.prevent="updateMemberData">
    <div class="wrapper">
    <v-text-field
      v-model="searchText"
      @click:append-inner="updateMemberData"
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
      variant="tonal"
      height="56px"
      prependIcon="mdi-plus"
      width="192px" 
      rounded 
    >
      Create Member
    </v-btn>
  </div>
  </v-form>
  <CardGrid>
    <template #cards>
      <MemberCard
        v-for="member in memberData"
        :key="member.id"
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
import { getPaginationButtonStyles } from "./../../utils";

export default {
  name: "MemberPage",
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
      return getPaginationButtonStyles(this.getMemberDataPageCount);
    },
  },
  methods: {
    async updateMemberData() {
      this.searchLoading = true;
      await this.appStore.fetchMember(this.page, this.searchText);
      this.searchLoading = false;
    },
    async clearSearchBar() {
      this.searchText = "";
      await this.updateMemberData();
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
