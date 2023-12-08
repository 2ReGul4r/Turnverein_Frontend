<template>
  <v-dialog v-model="isActive" activator="parent" class="dialog">
    <v-card title="Create Course">
      <v-form v-model="isFormValid" @submit.prevent="create">
        <div class="wrapper">
          <v-text-field
            v-model="sport"
            label="Sport"
            :rules="isRequired"
            prepend-icon="mdi-basketball"
            variant="outlined"
          />
          <v-combobox
            v-model="trainer"
            label="Trainer"
            :items="getTrainer"
            :return-object="false"
            :rules="isRequired"
            item-title="full_name"
            item-value="id"
            prepend-icon="mdi-account"
            variant="outlined"
          />
          <v-select
            v-model="courseLength"
            label="Course length"
            :items="courseLengthItems"
            :return-object="false"
            :rules="isRequired"
            item-title="name"
            item-value="length"
            prepend-icon="mdi-timer-sand"
            variant="outlined"
            chips
          />
          <v-text-field
            v-model="time"
            label="Time"
            :rules="isRequired"
            type="time"
            prepend-icon="mdi-progress-clock"
            variant="outlined"
          />
          <v-combobox
            v-model="days"
            label="Day"
            :items="daysItems"
            :return-object="false"
            :rules="notEmptyArray"
            item-title="name"
            item-value="value"
            prepend-icon="mdi-calendar-week"
            variant="outlined"
            chips
            multiple
          />
          <v-text-field
            v-model="hall"
            label="Hall"
            :rules="isRequired"
            prepend-icon="mdi-map-marker"
            variant="outlined"
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Save" type="submit"></v-btn>
          <v-btn text="Cancel" @click="isActive = false"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import { useDataStore } from "@/store/data";
import { isRequired, notEmptyArray } from "@/validations";

export default defineComponent({
  name: "CourseCreatePopup",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapStores(useUserStore, useDataStore),
    getTrainer() {
      return this.dataStore.getTrainerList;
    },
  },
  methods: {
    async create() {
      if (!this.isFormValid) {
        return;
      }
      await axiosInstance
        .post(
          "course",
          { ...this.prepareData() },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async (response: AxiosResponse) => {
          await this.userStore.fetchUserCourses(this.page);
          this.isActive = false;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    prepareData() {
      const [hour, minute] = this.time.split(":");
      // Counts the values in the days obj together
      let days: number = this.days
        .map((item) => item)
        .reduce((a, b) => a + b, 0);
      return {
        sport: {
          name: this.sport,
        },
        trainer_id: this.trainer,
        date: {
          course_length: this.courseLength,
          hour: hour,
          minute: minute,
          days: days,
        },
        hall: this.hall,
      };
    },
  },
  data() {
    return {
      isActive: false,
      sport: "" as string,
      trainer: null as number | null,
      courseLength: null as number | null,
      time: "" as string,
      days: [] as number[],
      hall: "" as string,
      courseLengthItems: [
        { length: 30, name: "30 Minutes" },
        { length: 45, name: "45 Minutes" },
        { length: 60, name: "60 Minutes" },
        { length: 90, name: "90 Minutes" },
        { length: 120, name: "120 Minutes" },
      ],
      daysItems: [
        { value: 1, name: "Monday" },
        { value: 2, name: "Tuesday" },
        { value: 4, name: "Wednesday" },
        { value: 8, name: "Thursday" },
        { value: 16, name: "Friday" },
        { value: 32, name: "Saturday" },
      ],
      isFormValid: false,
      isRequired: [isRequired],
      notEmptyArray: [notEmptyArray],
    };
  },
});
</script>

<style scoped>
.dialog {
  width: clamp(320px, 100%, 480px);
}
.wrapper {
  margin: 32px 32px 0px;
}

.wrapper * {
  margin-bottom: 12px;
}
</style>
