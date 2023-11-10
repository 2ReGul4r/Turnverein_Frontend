<template>
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
        v-model="test"
        @click:cancel="datePicker = false"
        @click:save="saveDatePicker"
      />
    </v-dialog>
    <form>
      <v-text-field
        v-model="test"
        @click:prepend="datePicker = true"
        prepend-icon="mdi-cake"
      />
      <v-text-field
        v-model="trainer.street"
        prepend-icon="mdi-map-marker"
      />
      <v-text-field
        v-model="trainer.postcode.postcode"
        type="number"
        prepend-icon="mdi-home-city"
      />
    </form>
  </v-card>
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
  },
  methods: {
    saveDatePicker() {

      this.datePicker = false;
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
    };
  },
});
</script>

<style scoped>
.trainer_card {
  padding: 8px;
  border: 2px solid #888;
  width: clamp(360px, 100%, 1440px)
}
</style>
