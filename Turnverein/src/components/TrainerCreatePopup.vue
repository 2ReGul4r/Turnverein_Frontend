<template>
  <v-dialog v-model="isActive" activator="parent" class="dialog">
    <v-card title="Create trainer">
      <v-form @submit.prevent="createTrainer">
        <div class="wrapper">
          <v-text-field
            v-model="trainer.username"
            label="Username"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.first_name"
            label="First name"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.last_name"
            label="Last name"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.birthday"
            label="Birthday"
            :rules="isRequired"
            variant="outlined"
            type="date"
          />
          <v-text-field
            v-model="trainer.street"
            label="Street"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.house_number"
            label="House number"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.postcode.postcode"
            label="Postcode"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.postcode.city"
            label="City"
            :rules="isRequired"
            variant="outlined"
          />
          <v-text-field
            v-model="trainer.password"
            label="Password"
            @click:append-inner="showPassword = !showPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'input' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
          />
          <v-text-field
            label="Repeat password"
            :rules="[repeatPasswordRules]"
            variant="outlined"
            @click:append-inner="showRepeatPassword = !showRepeatPassword"
            :append-inner-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showRepeatPassword ? 'input' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
          />
          <v-checkbox
            v-model="trainer.is_staff"
            :append-icon="trainer.is_staff ? 'mdi-crown' : ''"
            label="Is staff trainer ?"
          />
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Save" type="submit"></v-btn>
            <v-btn text="Cancel" @click="isActive = false"></v-btn>
          </v-card-actions>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axiosInstance from "@/axios-config";
import { AxiosError, AxiosResponse } from "axios";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
import { isRequired, minLengthEight } from "@/validations";
import { useAppStore } from "@/store/app";

export default defineComponent({
  name: "TrainerCreatePopup",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapStores(useUserStore, useAppStore),
  },
  methods: {
    async createTrainer() {
      console.log(this.trainer);
      await axiosInstance
        .post(
          "register",
          { ...this.trainer },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async (response: AxiosResponse) => {
          console.log("response:", response);
          this.isActive = false;
          await this.appStore.fetchTrainer(this.page);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    repeatPasswordRules(value: string) {
      return (
        (value === this.trainer.password && value.length >= 8) ||
        "Passwords are not identical"
      );
    },
  },
  data() {
    return {
      isActive: false,
      isFormValid: false,
      isRequired: [isRequired],
      passwordRules: [isRequired, minLengthEight],
      showPassword: false,
      showRepeatPassword: false,
      trainer: {
        username: "" as String,
        first_name: "" as String,
        last_name: "" as String,
        birthday: "" as String,
        street: "" as String,
        house_number: "" as String,
        postcode: {
          postcode: null as Number | null,
          city: "" as String,
        },
        is_staff: false,
        is_active: true,
        password: "" as String,
      },
    };
  },
});
</script>

<style scoped>
.dialog {
  width: clamp(320px, 100%, 640px);
}
.wrapper {
  margin: 32px 32px 0px;
}

.wrapper * {
  margin-bottom: 12px;
}
</style>
