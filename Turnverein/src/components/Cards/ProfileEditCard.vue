<template>
  <div class="profile_wrapper">
    <v-card
      title="Profile Edit"
      class="trainer_card d-flex flex-column"
      variant="tonal"
    >
      <form>
        <v-text-field
          v-model="trainer.birthday"
          @click:prepend="console.log(trainer)"
          type="date"
          prepend-icon="mdi-cake"
        />
        <v-text-field
          v-model="trainer.street"
          prepend-icon="mdi-map-marker"
        />
        <v-text-field
          v-model="trainer.postcode"
          type="number"
          prepend-icon="mdi-home-city"
        />
      </form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/store/user";
import { mapStores } from "pinia";
import { Trainer } from "../../../types";

export default defineComponent({
  name: "ProfileEditCard",
  computed: {
    ...mapStores(useUserStore),
  },
  mounted() {
    this.trainer = this.userStore.getUserData;
  },
  data() {
    return {
      trainer: {} as Trainer,
    };
  },
});
</script>

<style scoped>
.profile_wrapper {
  display: flex;
  justify-content: center;
  margin: 32px;
}
.trainer_card {
  padding: 8px;
  border: 2px solid #888;
  width: clamp(360px, 100%, 1080px)
}
</style>
