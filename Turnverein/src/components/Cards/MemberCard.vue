<template>
  <v-card
    v-if="member"
    :title="member.full_name"
    :width="width"
    :style="getComputedStyle"
    class="member_card d-flex flex-column"
    data-testid="member_card-wrapper"
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
    <v-spacer />
    <v-card-actions>
      <v-btn v-if="isStaffUser" variant="tonal">
        Delete
        <DeleteMemberPopup :member="member" :page="page" />
      </v-btn>
      <v-btn class="member_card_action" variant="tonal">
        Edit
        <MemberEditPopup :member-original="member" :page="page" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MemberEditPopup from "@/components/PopUps/MemberEditPopup.vue";
import DeleteMemberPopup from "@/components/PopUps/DeleteMemberPopup.vue";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";

export default defineComponent({
  name: "MemberCard",
  components: {
    MemberEditPopup,
    DeleteMemberPopup,
  },
  props: {
    member: {
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
    getComputedStyle() {
      return { "min-width": this.width + "px" };
    },
    getBirthday() {
      const birthday = new Date(this.member?.birthday);
      return birthday.toLocaleDateString();
    },
    isStaffUser() {
      return this.userStore.getUserData.is_staff;
    },
  },
});
</script>

<style scoped>
.trainer_card {
  padding: 8px;
  border: 2px solid #888;
}

.member_card_action {
  flex-grow: 1;
}
</style>
