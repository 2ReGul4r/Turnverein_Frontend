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
              ></v-text-field>
              <v-combobox
                  chips
                  multiple
                  label="Trainer"
                  :items="['Bennit Vesely', 'Charlotte Kohl']"
                  prepend-icon="mdi-account"
                  variant="outlined"
              ></v-combobox>
              <v-combobox
                  chips
                  multiple
                  label="Course length"
                  :items="['30','45', '60', '90', '120']"
                  prepend-icon="mdi-timer-sand"
                  variant="outlined"
              ></v-combobox>
              <v-text-field
                  v-model="timeEdit"
                  label="Time"
                  type="time"
                  prepend-icon="mdi-progress-clock"
                  variant="outlined"
              ></v-text-field>
              <v-combobox
                  chips
                  multiple
                  label="Day"
                  :items="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
                  prepend-icon="mdi-calendar-week"
                  variant="outlined"
              ></v-combobox>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  text="Save"
                  @click="isActive.value = false"
                  type="submit"
              ></v-btn>
              <v-btn
                  text="Cancel"
                  @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </template>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import {mapStores} from "pinia";
import {useUserStore} from "@/store/user";

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
    ...mapStores(useUserStore),
  },
  methods: {
    async save() {
      const test = this.prepareData();
      console.log(test)
      await axiosInstance
          .put("course", {
            ...this.prepareData(),
          },{ headers: { Authorization: `Token ${localStorage.getItem("token")}` }})
          .then(async(response: AxiosResponse) => {
            await this.userStore.fetchUserCourses(this.page);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          })
    },
    prepareData() {
      const [ hour, minute ] = this.timeEdit.split(":");
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
          days: this.daysEdit || this.date.days,
        },
        hall: this.hallEdit || this.hall,
      }
    },
  },
  mounted() {
    this.sportEdit = this.sport.name;
    this.trainerEdit = this.trainer.id;
    this.courseLengthEdit = this.date.course_length;
    this.timeEdit = `${this.date.hour}:${this.date.minute.toString().padStart(2, "0")}`
    this.daysEdit = this.date.days;
    this.hallEdit = this.hall;
  },
  watch: {
    test() {
      console.log(this.test);
    }
  },
  data() {
    return {
      sportEdit: "" as string,
      trainerEdit: 0 as number,
      courseLengthEdit: 0 as number,
      timeEdit: "" as string,
      daysEdit: 0 as number,
      hallEdit: "" as string,
    }
  }
})
</script>

<style scoped>
.dialog {
  width: clamp(320px, 100%, 480px);
}
.combobox_wrapper {
  margin: 32px 32px 0px;
}

</style>
