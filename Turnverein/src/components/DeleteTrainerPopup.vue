<template>
  <v-dialog v-model="deleteTrainerDialog" activator="parent" width="auto">
    <v-card :loading="loading">
      <v-card-text>
        {{ `Are you sure you want to delete ${trainer.full_name}?` }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteTrainer" class="card_action" variant="tonal"
          >Yes</v-btn
        >
        <v-btn
          @click="deleteTrainerDialog = false"
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
import { AxiosError } from "axios";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useAppStore } from "@/store/app";

export default defineComponent({
  name: "DeleteTrainerPopup",
  props: {
    trainer: {
      type: Object,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapStores(useAppStore),
  },
  methods: {
    async deleteTrainer() {
      this.loading = true;
      await axiosInstance
        .delete("trainer", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { id: this.trainer.id },
        })
        .then(async () => {
          this.appStore.fetchTrainer(this.page);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
      this.deleteTrainerDialog = false;
    },
  },
  data() {
    return {
      loading: false,
      deleteTrainerDialog: false,
    };
  },
});
</script>

<style scoped>
.card_action {
  flex-grow: 1;
}
</style>
