<template>
  <v-dialog v-model="removeMemberDialog" activator="parent" width="auto">
    <v-card :loading="loading">
      <v-card-text>
        {{
          `Are you sure you want to remove ${item.member.first_name} ${item.member.last_name} from ${title}?`
        }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="deleteParticipant(item.id)"
          class="card_action"
          variant="tonal"
          >Yes</v-btn
        >
        <v-btn
          @click="removeMemberDialog = false"
          class="card_action"
          variant="tonal"
          >No</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "RemoveMemberPopup",
  props: {
    item: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    async deleteParticipant(participantId: number) {
      console.log(participantId);
      this.loading = true;
      await axiosInstance
        .delete("participant", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { id: participantId },
        })
        .then(async (response: AxiosResponse) => {
          this.$emit('participantUpdate');
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
      this.removeMemberDialog = false;
    },
  },
  data() {
    return {
      loading: false,
      removeMemberDialog: false,
    }
  }
});
</script>

<style scoped>
.card_action {
  flex-grow: 1;
}
</style>
