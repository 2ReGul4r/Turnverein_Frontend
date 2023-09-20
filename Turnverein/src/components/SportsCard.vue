<template>
  <v-card
    v-if="sportdata && trainer"
    :title="getTitle"
    :subtitle="getTrainerName"
  >
    <v-chip prepend-icon="mdi-progress-clock">
      {{ date.course_length }}
    </v-chip>
    <v-chip prepend-icon="mdi-calendar-clock">
      {{ `${date.hour}:${date.minute}` }}
    </v-chip>
    <v-chip v-for="day in getDateDays" prepend-icon="mdi-sun-clock">
      {{ day }}
    </v-chip>
    <v-card-actions>
      <v-btn @click="editSport">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "SportsCard",
  props: {
    sportdata: {
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
    width: {
      type: Number,
      default: 400,
    },
  },
  computed: {
    getTitle() {
      return this.sportdata?.name;
    },
    getTrainerName() {
      return `with ${this.trainer?.first_name} ${this.trainer?.last_name}`;
    },
    getDateDays() {
      let day_list: Array<String> = [];
      let day_code: number = this.date.days;
      const formatter = {
        Saturday: 32,
        Friday: 16,
        Thursday: 8,
        Wednesday: 4,
        Tuesday: 2,
        Monday: 1,
      };
      for (const [day, value] of Object.entries(formatter)) {
        if (day_code >= value) {
          day_list.push(day);
          day_code -= value;
        }
      }
      return day_list;
    },
  },
  methods: {
    editSport() {
      router.push("/course/edit");
    },
  },
});
</script>
