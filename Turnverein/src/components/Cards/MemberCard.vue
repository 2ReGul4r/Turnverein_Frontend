<template>
  <v-card
    v-if="member"
    :title="getTitle"
    :width="width"
    :style="getComputedStyle"
    class="member_card d-flex flex-column"
    variant="tonal"
  >
    <v-card-item prepend-icon="mdi-cake">
      {{ `Birthday: ${getBirthday}` }}
    </v-card-item>
    <v-card-item prepend-icon="mdi-map-marker">
      {{ `Address: ${member.street} ${member.house_number}` }}
    </v-card-item>
    <v-card-item prepend-icon="mdi-home-city">
      {{ `City: ${member.postcode.postcode}, ${member.postcode.city}` }}
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MemberCard",
  props: {
    member: {
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
      return `${this.member?.first_name} ${this.member?.last_name}`;
    },
    getComputedStyle() {
      return { "min-width": this.width + "px" };
    },
    getBirthday() {
      const birthday = new Date(this.member?.birthday);
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
