<template>
  <v-dialog v-model="addParticipantDialog" activator="parent" class="dialog" data-testid="participant_popup-dialog">
    <v-card :title="getTitle" :loading="loading">
      <v-form @submit.prevent="addParticipant">
        <div class="wrapper">
          <v-select
            v-model="participantIds"
            label="Members"
            :items="getParticipants"
            :return-object="false"
            :rules="isRequired"
            item-title="full_name"
            item-value="id"
            prepend-icon="mdi-account"
            variant="outlined"
            multiple
          />
        </div>
      </v-form>
      <v-card-actions>
        <v-btn
          @click="addParticipant"
          type="submit"
          class="card_action"
          variant="tonal"
        >
          Add
        </v-btn>
        <v-btn
          @click="addParticipantDialog = false"
          class="card_action"
          variant="tonal"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axiosInstance from "@/axios-config";
import { AxiosError } from "axios";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useDataStore } from "@/store/data";
import { isRequired } from "@/validations";

export default defineComponent({
  name: "AddParticipantPopup",
  props: {
    courseId: {
      type: Number,
      required: true,
    },
    sport: {
      type: Object,
    },
    trainer: {
      type: Object,
    },
  },
  computed: {
    ...mapStores(useDataStore),
    getParticipants() {
      return this.dataStore.getMemberList;
    },
    getTitle() {
      return this.sport && this.trainer
        ? `Add members to ${this.sport.name} by ${this.trainer.full_name}`
        : "Add members to course";
    },
  },
  methods: {
    async addParticipant() {
      this.loading = true;
      await axiosInstance
        .post(
          "participant",
          { course_id: this.courseId, members: this.participantIds },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async () => {
          this.$emit("participantUpdate");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
      this.addParticipantDialog = false;
    },
  },
  data() {
    return {
      loading: false,
      addParticipantDialog: false,
      participantIds: [] as number[],
      isRequired: [isRequired],
    };
  },
});
</script>

<style scoped>
.dialog {
  width: clamp(320px, 100%, 640px);
}

.wrapper {
  margin: 32px 32px 0px;
}

.wrapper * {
  margin-bottom: 12px;
}
.card_action {
  flex-grow: 1;
}
</style>
