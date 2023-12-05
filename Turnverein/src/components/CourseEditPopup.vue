<template>
  <v-dialog activator="parent" class="dialog">
    <template v-slot:default="{ isActive }">
      <v-card title="Edit Course">
        <v-form @submit.prevent="save">
          <div class="combobox_wrapper">
            <v-text-field
              v-model="sportEdit"
              label="Sport"
              prepend-icon="mdi-basketball"
              variant="outlined"
            />
            <v-combobox
              v-model="trainerEdit"
              label="Trainer"
              :items="getTrainer"
              :return-object="false"
              item-title="full_name"
              item-value="id"
              prepend-icon="mdi-account"
              variant="outlined"
            />
            <v-select
              v-model="courseLengthEdit"
              label="Course length"
              :items="courseLengthItems"
              :return-object="false"
              item-title="name"
              item-value="length"
              prepend-icon="mdi-timer-sand"
              variant="outlined"
              chips
            />
            <v-text-field
              v-model="timeEdit"
              label="Time"
              type="time"
              prepend-icon="mdi-progress-clock"
              variant="outlined"
            />
            <v-combobox
              v-model="daysEdit"
              label="Day"
              :items="daysItems"
              :return-object="false"
              item-title="name"
              item-value="value"
              prepend-icon="mdi-calendar-week"
              variant="outlined"
              chips
              multiple
            />
            <v-text-field
              v-model="hallEdit"
              label="Hall"
              prepend-icon="mdi-map-marker"
              variant="outlined"
            />
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Save"
              @click="isActive.value = false"
              type="submit"
            ></v-btn>
            <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import { useDataStore } from "@/store/data";

export default defineComponent({
  name: "CourseEditPopup",
  props: {
    id: {
      type: Number,
      required: true,
    },
    sport: {
      type: Object,
      required: true,
    },
    trainer: {
      type: Object,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
    hall: {
      type: String,
      required: true,
    },
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
    async save() {
      await axiosInstance
        .put("course", {...this.prepareData()},
          { headers: { Authorization: `Token ${localStorage.getItem("token")}` }}
        )
        .then(async (response: AxiosResponse) => {
          await this.userStore.fetchUserCourses(this.page);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    prepareData() {
      const [hour, minute] = this.timeEdit.split(":");
      // Counts the values in the daysEdit obj together
      let days: number = this.daysEdit.map(item => item).reduce((a, b) => a + b, 0);
      return {
        id: this.id,
        sport: {
          name: this.sportEdit || this.sport.name,
        },
        trainer_id: this.trainerEdit || this.trainer.id,
        date: {
          course_length: this.courseLengthEdit || this.date.course_length,
          hour: hour || this.date.hour,
          minute: minute || this.date.minute,
          days: days || this.date.days,
        },
        hall: this.hallEdit || this.hall,
      };
    },
    setDays() {
      let days = this.date.days;
      const items = [...this.daysItems];
      items.reverse().forEach((item) => {
        if(days >= item.value) {
          this.daysEdit.push(item.value);
          days -= item.value;
        }
      });
      this.daysEdit.reverse();
    },
  },
  mounted() {
    this.sportEdit = this.sport.name;
    this.trainerEdit = this.trainer.id;
    this.courseLengthEdit = this.date.course_length;
    this.timeEdit = `${this.date.hour}:${this.date.minute.toString().padStart(2, "0")}`;
    this.hallEdit = this.hall;
    this.setDays();
  },
  watch: {
    daysEdit() {
      console.log(this.daysEdit);
    }
  },
  data() {
    return {
      sportEdit: "" as string,
      trainerEdit: 0 as number,
      courseLengthEdit: 0 as number,
      timeEdit: "" as string,
      daysEdit: [] as number[],
      hallEdit: "" as string,
      courseLengthItems: [
        {"length": 30, "name": "30 Minutes"},
        {"length": 45, "name": "45 Minutes"},
        {"length": 60, "name": "60 Minutes"},
        {"length": 90, "name": "90 Minutes"},
        {"length": 120, "name": "120 Minutes"},
      ],
      daysItems: [
        {"value": 1, "name": "Monday"},
        {"value": 2, "name": "Tuesday"},
        {"value": 4, "name": "Wednesday"},
        {"value": 8, "name": "Thursday"},
        {"value": 16, "name": "Friday"},
        {"value": 32, "name": "Saturday"},
      ],
    };
  },
});
</script>

<style scoped>
.dialog {
  width: clamp(320px, 100%, 480px);
}
.combobox_wrapper {
  margin: 32px 32px 0px;
}
</style>
