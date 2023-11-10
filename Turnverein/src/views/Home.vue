<template>
  <CardGrid>
    <template #cards>
      <CourseCard 
        v-for="course in courseData"
        :key="`course-${course.id}`"
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
import { mapStores } from "pinia";

export default {
  name: "MyCoursesPage",
  components: {
    CourseCard,
    CardGrid
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
      const buttonWidth = 48;
      const buttonPadding = 9.6
      return {"width": (this.getUserCoursePageCount + 3) * (buttonWidth + buttonPadding)}
    },
  },
  async mounted() {
    await this.userStore.fetchUserCourses(this.page);
  },
  watch: {
    async page() {
      await this.userStore.fetchUserCourses(this.page);
    },
  },
  data() {
    return {
      page: 1,
    }
  }
};
</script>