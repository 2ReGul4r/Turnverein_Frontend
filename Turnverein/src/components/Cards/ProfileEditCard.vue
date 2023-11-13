<template>
  <div class="profile_wrapper">
    <v-card
      title="Profile Edit"
      class="trainer_card d-flex flex-column"
      variant="tonal"
    >
      <v-dialog
        v-if="datePicker"
        activator="parent"
        width="auto"
      >
        <v-date-picker
          v-model="datePickerDate"
          @click:cancel="datePicker = false"
          @click:save="saveDatePicker"
        />
      </v-dialog>
      <form>
        <v-text-field
          v-model="getDate"
          @click:prepend="datePicker = true"
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
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { defineComponent } from "vue";
import { useUserStore } from "@/store/user";
import { mapStores } from "pinia";
import { Trainer } from "../../../types";

export default defineComponent({
  components: {
    VDatePicker,
  },
  name: "ProfileEditCard",
  computed: {
    ...mapStores(useUserStore),
    getSubTitle() {
      return this.trainer.username;
    },
    getBirthday() {
      const birthday = new Date(this.trainer.birthday);
      return birthday.toLocaleDateString();
    },
    getDate() {
      return (new Date(this.trainer.birthday)).toLocaleDateString();
    }
  },
  methods: {
    saveDatePicker() {
      this.datePicker = false;
      console.log(this.datePickerDate)
      this.trainer.birthday = new Date(this.datePickerDate);
    }
  },
  mounted() {
    this.trainer = this.userStore.getUserData;
    console.log(this.trainer);
  },
  watch: {
    test() {
      console.log(this.test);
    }
  },
  data() {
    return {
      test: "" as any,
      trainer: {} as Trainer,
      datePicker: false,
      datePickerDate: "" as any,
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
