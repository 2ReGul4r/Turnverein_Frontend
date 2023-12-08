<template>
  <v-form @submit.prevent="updateUserCourseData">
    <v-text-field
      v-model="searchText"
      @click:append-inner="updateUserCourseData"
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
      <CourseCard
        v-for="course in courseData"
        :key="`course-${course.id}`"
        :page="page"
        class="course_card"
        v-bind="course"
      />
      <v-alert v-if="courseData.length === 0" title="Alert" icon="$info">
        At this moment you do not have any courses. You can create your courses
        at
        <a href="/courses"> All Courses </a>
      </v-alert>
    </template>
    <template #pagination>
      <v-pagination
        v-if="getUserCoursePageCount > 1"
        v-model="page"
        :length="getUserCoursePageCount"
        :style="getPaginationStyleWidth"
        rounded="circle"
      />
    </template>
  </CardGrid>
</template>

<script lang="ts">
import CardGrid from "@/components/CardGrid.vue";
import CourseCard from "@/components/Cards/CourseCard.vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { useDataStore } from "@/store/data";
import { mapStores } from "pinia";
import { getPaginationButtonStyles } from "./../../utils";

export default {
  name: "MyCoursesPage",
  components: {
    CourseCard,
    CardGrid,
  },
  computed: {
    ...mapStores(useAppStore, useUserStore, useDataStore),
    courseData() {
      return this.userStore.getUserCourses;
    },
    getUserCoursePageCount() {
      return this.userStore.getUserCoursePages;
    },
    getPaginationStyleWidth() {
      return getPaginationButtonStyles(this.getUserCoursePageCount);
    },
  },
  methods: {
    async updateUserCourseData() {
      this.searchLoading = true;
      await this.userStore.fetchUserCourses(this.page, this.searchText);
      this.searchLoading = false;
    },
    async clearSearchBar() {
      this.searchText = "";
      await this.updateUserCourseData();
    },
  },
  async mounted() {
    await this.userStore.fetchUserCourses(this.page);
    await this.dataStore.fetchMember();
    await this.dataStore.fetchTrainer();
  },
  watch: {
    async page() {
      await this.userStore.fetchUserCourses(this.page);
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
