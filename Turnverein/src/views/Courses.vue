<template>
  <CardGrid>
    <template #cards>
      <CourseCard
        v-for="course in courseData"
        class="course_card"
        v-bind="course"
      />
    </template>
    <template #pagination>
      <v-pagination
        v-if="getUserCoursePageCount > 1"
        v-model="page"
        :length="getUserCoursePageCount"
        :style="getPaginationStyleWidth"
        class="card_grid_pagination"
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
  name: "CourseGrid",
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
      await this.appStore.fetchCourses(this.page);
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
    };
  },
};
</script>
