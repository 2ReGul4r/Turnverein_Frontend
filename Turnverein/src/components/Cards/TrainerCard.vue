<template>
  <v-card
    v-if="trainer"
    :title="getTitle"
    :subtitle="getSubTitle"
    :width="width"
    :style="getComputedStyle"
    class="trainer_card d-flex flex-column"
    variant="tonal"
  >
    <v-card-item prepend-icon="mdi-cake">
      {{ `Birthday: ${getBirthday}` }}
    </v-card-item>
    <v-card-item prepend-icon="mdi-map-marker">
      {{ `Address: ${trainer.street} ${trainer.house_number}` }}
    </v-card-item>
    <v-card-item prepend-icon="mdi-home-city">
      {{ `City: ${trainer.postcode.postcode}, ${trainer.postcode.city}` }}
    </v-card-item>
    <div v-if="isStaffUser">
      <v-spacer/>
      <v-card-actions>
        <v-btn
          variant="tonal"
        >
          Delete
          <DeleteTrainerPopup
            :trainer="trainer"
            :page="page"
          />
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import DeleteTrainerPopup from "@/components/DeleteTrainerPopup.vue";

export default defineComponent({
    name: "TrainerCard",
    components: { DeleteTrainerPopup },
    props: {
        trainer: {
            type: Object,
            required: true,
        },
        width: {
            type: Number,
            default: 400,
        },
        page: {
            type: Number,
            required: true,
        },
    },
    computed: {
        ...mapStores(useUserStore),
        getTitle() {
            return `${this.trainer?.first_name} ${this.trainer?.last_name}`;
        },
        getSubTitle() {
            return this.trainer.username;
        },
        getComputedStyle() {
            return { "min-width": this.width + "px" };
        },
        getBirthday() {
            const birthday = new Date(this.trainer?.birthday);
            return birthday.toLocaleDateString();
        },
        isStaffUser() {
            return this.userStore.getUserData.is_staff;
        }
    },
});
</script>

<style scoped>
.trainer_card {
  padding: 8px;
  border: 2px solid #888;
}
</style>
