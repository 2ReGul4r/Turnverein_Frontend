<template>
  <v-card
    v-if="sport && trainer"
    :title="sport.name"
    :subtitle="getTrainerName"
    :loading="loading"
    :width="width"
    :style="getComputedStyle"
    class="course_card d-flex flex-column"
    data-testid="course_card-wrapper"
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
        <v-chip class="course_card_chip" prepend-icon="mdi-map-marker">
          {{ hall }}
        </v-chip>
      </v-chip-group>
      <div v-else>
        <v-virtual-scroll
          v-if="!isEmptyMemberList"
          :items="memberList"
          item-height="50"
        >
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-list-item-title>
                {{ `${item.member.first_name} ${item.member.last_name}` }}
              </v-list-item-title>
              <template v-slot:append>
                <v-btn rounded variant="tonal">
                  <RemoveMemberPopup
                    @participantUpdate="fetchMember"
                    :item="item"
                    :title="sport.name"
                  />
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </template>
        </v-virtual-scroll>
        <v-list-item>
          <v-btn block rounded variant="tonal" prepend-icon="mdi-plus">
            <AddParticipantPopup
              @participantUpdate="fetchMember"
              :course-id="id"
              :sport="sport"
              :trainer="trainer"
            ></AddParticipantPopup>
            Add Participant
          </v-btn>
        </v-list-item>
      </div>
    </div>
    <v-spacer></v-spacer>
    <v-card-actions v-if="!hideActions">
      <v-btn v-if="!hideEdit" class="course_card_action" variant="tonal">
        Edit
        <CourseEditPopup
          :id="id"
          :hall="hall"
          :date="date"
          :trainer="trainer"
          :sport="sport"
          :page="page"
          :search-text="searchText"
        />
      </v-btn>
      <v-btn
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
import { Participant } from "../../../types";;
import { defineComponent } from "vue";
import CourseEditPopup from "@/components/PopUps/CourseEditPopup.vue";
import AddParticipantPopup from "@/components/PopUps/AddParticipantPopup.vue";
import RemoveMemberPopup from "@/components/PopUps/RemoveMemberPopup.vue";

export default defineComponent({
  name: "CourseCard",
  components: { CourseEditPopup, RemoveMemberPopup, AddParticipantPopup },
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
    page: {
      type: Number,
      required: true,
    },
    searchText: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTrainerName() {
      return `with ${this.trainer?.full_name}`;
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
    isEmptyMemberList() {
      return !this.memberList.length;
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
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
    },
    async toggleMemberList() {
      if (!this.showMember) {
        await this.fetchMember();
      }
      this.showMember = !this.showMember;
    },
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
  pointer-events: none;
}

.course_card_action {
  flex-grow: 1;
}
</style>
