<template>
  <v-form @submit.prevent="updateCourseData">
    <div class="wrapper">
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
      <v-btn
        variant="tonal"
        height="56px"
        prependIcon="mdi-plus"
        width="192px"
        rounded
      >
        Create Course
        <CourseCreatePopup :page="page" />
      </v-btn>
    </div>
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
      <v-alert v-if="courseData.length === 0" title="Alert" icon="$info">
        At this moment there are no courses. You can create your courses at
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
import { useAppStore } from "@/store/app";
import { mapStores } from "pinia";
import { getPaginationButtonStyles } from "./../../utils";
import CourseCreatePopup from "@/components/PopUps/CourseCreatePopup.vue";

export default {
  name: "CoursesPage",
  components: {
    CardGrid,
    CourseCard,
    CourseCreatePopup,
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
      return getPaginationButtonStyles(this.getUserCoursePageCount);
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

<style scoped>
.wrapper {
  display: flex;
}

.searchBar {
  margin-right: 12px;
}
</style>
