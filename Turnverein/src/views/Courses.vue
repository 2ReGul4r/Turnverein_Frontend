<template>
  <v-form @submit.prevent="updateCourseData">
    <v-text-field
      v-model="searchText"
      @click:append-inner="updateCourseData"
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
        :key="course.id"
        :page="page"
        class="course_card"
        v-bind="course"
        hideEdit
      />
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
import { useAppStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  name: "CoursesPage",
  components: {
    CardGrid,
    CourseCard,
  },
  computed: {
    ...mapStores(useAppStore),
    courseData() {
      return this.appStore.getCourseList;
    },
    getUserCoursePageCount() {
      return this.appStore.getCourseListPages;
    },
    getPaginationStyleWidth() {
      const buttonWidth = 48;
      const buttonPadding = 9.6;
      return {
        width:
          (this.getUserCoursePageCount + 3) * (buttonWidth + buttonPadding),
      };
    },
  },
  methods: {
    async updateCourseData() {
      this.searchLoading = true;
      await this.appStore.fetchCourses(this.page, this.searchText);
      this.searchLoading = false;
    },
    async clearSearchBar() {
      this.searchText = "";
      await this.updateCourseData();
    },
  },
  async mounted() {
    await this.updateCourseData();
  },
  watch: {
    async page() {
      await this.updateCourseData();
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
