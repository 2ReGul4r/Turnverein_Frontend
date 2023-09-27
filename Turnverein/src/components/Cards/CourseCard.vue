<template>
  <v-card
    v-if="sport && trainer"
    :title="getTitle"
    :subtitle="getTrainerName"
    :width="width"
    :style="getComputedStyle"
    class="course_card d-flex flex-column"
    variant="tonal"
  >
    <v-chip-group>
      <v-chip class="course_card_chip" prepend-icon="mdi-timer-sand">
        {{ date.course_length + " Minutes"}}
      </v-chip>
      <v-chip class="course_card_chip" prepend-icon="mdi-progress-clock">
        {{ `${date.hour}:${String(date.minute).padStart(2, '0')}` }}
      </v-chip>
      <v-chip
        v-for="day in getDateDays"
        :key="`${day}`"
        class="course_card_chip"
        prepend-icon="mdi-calendar-week"
      >
        {{ day }}
      </v-chip>
    </v-chip-group>
    <v-spacer></v-spacer>
    <v-card-actions v-if="!hideActions">
      <v-btn v-if="!hideEdit" class="course_card_action" variant="tonal">Edit</v-btn>
      <v-btn class="course_card_action" variant="tonal">Show students</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CourseCard",
  props: {
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
    width: {
      type: Number,
      default: 400,
    },
    hideActions: {
      type: Boolean
    },
    hideEdit: {
      type: Boolean
    }
  },
  computed: {
    getTitle() {
      return this.sport?.name;
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
      return day_list.reverse();
    },
    getComputedStyle() {
      return {"min-width": this.width+"px"}
    }
  },
});
</script>

<style scoped>
.course_card {
  padding: 8px;
  border: 2px solid #888;
}

.course_card_chip {
  margin: 4px;
}

.course_card_action {
  flex-grow: 1;
}
</style>
