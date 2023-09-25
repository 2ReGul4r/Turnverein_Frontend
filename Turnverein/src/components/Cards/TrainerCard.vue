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
    <v-card-item>
      {{ `Birthday: ${getBirthday}` }}
    </v-card-item>
    <v-card-item>
      {{ `Adress: ${trainer.street} ${trainer.house_number}` }}
    </v-card-item>
    <v-card-item>
      {{ `City: ${trainer.postcode.postcode}, ${trainer.postcode.city}` }}
    </v-card-item>
    <v-spacer></v-spacer>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TrainerCard",
  props: {
    trainer: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
      default: 400,
    },
  },
  computed: {
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
      return birthday.toLocaleDateString()
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
