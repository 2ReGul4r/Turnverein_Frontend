<template>
  <v-dialog v-model="deleteMemberDialog" activator="parent" width="auto" data-testid="delete_member_popup-dialog">
    <v-card :loading="loading">
      <v-card-text>
        {{ `Are you sure you want to delete ${member.full_name}?` }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteMember" class="card_action" variant="tonal"
          >Yes</v-btn
        >
        <v-btn
          @click="deleteMemberDialog = false"
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
  name: "DeleteMemberPopup",
  props: {
    member: {
      type: Object,
      required: true,
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
    ...mapStores(useAppStore),
  },
  methods: {
    async deleteMember() {
      this.loading = true;
      await axiosInstance
        .delete("member", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { id: this.member.id },
        })
        .then(async () => {
          this.appStore.fetchMember(this.page, this.searchText);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      this.loading = false;
      this.deleteMemberDialog = false;
    },
  },
  data() {
    return {
      loading: false,
      deleteMemberDialog: false,
    };
  },
});
</script>

<style scoped>
.card_action {
  flex-grow: 1;
}
</style>
