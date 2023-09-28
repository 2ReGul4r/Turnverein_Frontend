<template>
  <v-card
    v-if="sport && trainer"
    :title="getTitle"
    :subtitle="getTrainerName"
    :loading="loading"
    :width="width"
    :style="getComputedStyle"
    class="course_card d-flex flex-column"
    variant="tonal"
  >
    <div class="course_card_content">
      <v-chip-group v-if="!showMember">
        <v-chip class="course_card_chip" prepend-icon="mdi-timer-sand">
          {{ date.course_length + " Minutes" }}
        </v-chip>
        <v-chip class="course_card_chip" prepend-icon="mdi-progress-clock">
          {{ `${date.hour}:${String(date.minute).padStart(2, "0")}` }}
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
      <v-virtual-scroll v-else :items="memberList" item-height="50">
        <template v-slot:default="{ item }">
          <v-list-item>
            <v-list-item-title>{{
              `${item.member.first_name} ${item.member.last_name}`
            }}</v-list-item-title>
            <template v-slot:append>
              <v-btn @click="removeMember" rounded variant="tonal">
                <v-icon>mdi-delete</v-icon>
                <v-dialog
                  v-model="removeMemberDialog"
                  activator="parent"
                  width="auto"
                >
                  <v-card :loading="loading">
                    <v-card-text>
                      {{ `Are you sure you want to remove ${item.member.first_name} ${item.member.last_name} from ${getTitle}?` }}
                    </v-card-text>
                    <v-card-actions>
                      <v-btn @click="deleteParticipant" class="course_card_action" variant="tonal">Yes</v-btn>
                      <v-btn @click="removeMemberDialog = false" class="course_card_action" variant="tonal">No</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>
            </template>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </div>
    <v-spacer></v-spacer>
    <v-card-actions v-if="!hideActions">
      <v-btn v-if="!hideEdit" class="course_card_action" variant="tonal">Edit</v-btn>
      <v-btn
        v-if="showMemberListButton"
        @click="toggleMemberList"
        class="course_card_action"
        variant="tonal"
      >
        {{ showMember ? "Show course details" : "Show students" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import { Participant } from "types";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CourseCard",
  props: {
    id: {
      type: Number,
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
    width: {
      type: Number,
      default: 400,
    },
    hideActions: {
      type: Boolean,
    },
    hideEdit: {
      type: Boolean,
    },
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
      return { "min-width": this.width + "px" };
    },
    showMemberListButton() {
      return !!this.memberList.length;
    },
  },
  methods: {
    async fetchMember() {
      this.loading = true;
      await axiosInstance
        .get("participant", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { course: this.id },
        })
        .then((response: AxiosResponse) => {
          this.memberList = response.data.data;
          console.log(this.memberList);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
    },
    async deleteParticipant(participantId: number) {
      this.loading = true;
      await axiosInstance
        .delete("participant", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { id: participantId },
        })
        .then(async (response: AxiosResponse) => {
          await this.fetchMember();
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
      this.removeMemberDialog = false;
    },
    async toggleMemberList() {
      if (!this.showMember) {
        await this.fetchMember();
      }
      this.showMember = !this.showMember;
    },
    async removeMember() {},
  },
  mounted() {
    this.fetchMember();
  },
  data() {
    return {
      showMember: false,
      loading: false,
      memberList: [] as Participant[],
      removeMemberDialog: false,
    };
  },
});
</script>

<style scoped>
.course_card {
  padding: 8px;
  border: 2px solid #888;
}

.course_card_content {
  height: clamp(48px, 100%, 128px);
}

.course_card_chip {
  margin: 4px;
}

.course_card_action {
  flex-grow: 1;
}
</style>
