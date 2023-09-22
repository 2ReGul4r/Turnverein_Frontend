<template>
  <div class="course_grid_wrapper">
    <CourseCard 
      v-for="course in courseData"
      class="course_card"
      v-bind="course"
    />
  </div>
  <div class="course_grid_bot_bar">
    <v-pagination 
      v-model="page"
      :length="getUserCoursePageCount"
      :style="getPaginationStyleWidth"
      class="course_grid_pagination"
      rounded="circle"
    />
  </div>
</template>

<script lang="ts">
import CourseCard from "./CourseCard.vue";
import { useUserStore } from "../store/user";
import { useAppStore } from "@/store/app";
import { mapStores } from "pinia";

export default {
  name: "CourseGrid",
  components: {
    CourseCard,
  },
  computed: {
    ...mapStores(useAppStore, useUserStore),
    courseData() {
      return this.userStore.getUserCourses;
    },
    getUserCoursePageCount() {
      return this.userStore.getUserCoursePages;
    },
    getPaginationStyleWidth() {
      return {"width": (this.getUserCoursePageCount + 3) * (48 + 9.6)}
    }
  },
  methods: {
    async updateCourseData() {
      await this.userStore.fetchUserCourses(this.page);
    }
  },
  async mounted() {
    await this.updateCourseData();
  },
  watch: {
    async page() {
      await this.updateCourseData();
    }
  },
  data() {
    return {
      page: 1,
    }
  }
};
</script>

<style scoped>
.course_grid_wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-bottom: 32px;
  row-gap: 16px;
}

.course_grid_bot_bar {
  display: flex;
  justify-content: center;
}

.course_grid_pagination {
  bottom: 8px;
  position: fixed;
  width: 100%;
}
</style>