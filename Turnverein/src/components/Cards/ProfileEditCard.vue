<template>
  <div class="editprofile">
    <v-card title="Edit profile" class="editprofile-card stack" variant="tonal">
      <v-form @submit.prevent="editTrainer">
        <div class="wrapper">
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
        </div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Save" type="submit"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card title="Change password" class="editprofile-card noFullHeight" variant="tonal">
      <v-form>
        <div class="wrapper">
          <v-text-field
            v-model="old_password"
            label="Old password"
            @click:append-inner="showOldPassword = !showOldPassword"
            :append-inner-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showOldPassword ? 'input' : 'password'"
            autocomplete="current-password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
          />
          <v-text-field
            v-model="new_password"
            label="New password"
            @click:append-inner="showNewPassword = !showNewPassword"
            :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showNewPassword ? 'input' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
          />
          <v-text-field
            label="Repeat new password"
            :rules="[repeatPasswordRules]"
            variant="outlined"
            @click:append-inner="showRepeatPassword = !showRepeatPassword"
            :append-inner-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showRepeatPassword ? 'input' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
          />
        </div>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Save" type="submit"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
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
  name: "ProfileEditCard",
  computed: {
    ...mapStores(useUserStore, useAppStore),
  },
  methods: {
    async editTrainer() {
      await axiosInstance
        .put(
          "trainer",
          { ...this.trainer },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async (response: AxiosResponse) => {
          await this.userStore.fetchUserData();
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async changePassword() {
      await axiosInstance
        .put(
          "changePassword",
          { old_password: this.old_password, new_password: this.new_password },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(async (response: AxiosResponse) => {
          await this.userStore.logout();
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    repeatPasswordRules(value: string) {
      return value === this.new_password && value.length >= 8 || "Passwords are not identical";
    }
  },
  mounted() {
    this.trainer = this.userStore.getUserData;
    console.log(this.trainer)
  },
  data() {
    return {
      old_password: "" as String,
      new_password: "" as String,
      showOldPassword: false,
      showNewPassword: false,
      showRepeatPassword: false,
      isRequired: [isRequired],
      passwordRules: [isRequired, minLengthEight],
      trainer: {
        username: "" as String,
        first_name: "" as String,
        last_name: "" as String,
        birthday: "" as String,
        street: "" as String,
        house_number: "" as String,
        postcode: {
          postcode: 0 as Number,
          city: "" as String,
        },
      }
    };
  },
});
</script>

<style scoped>

.editprofile {
  column-gap: 16px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin-bottom: 32px;
  row-gap: 16px;
}
.wrapper {
  margin: 32px 32px 0px;
}

.wrapper * {
  margin-bottom: 12px;
}

.editprofile-card {
  width: clamp(320px, 100%, 640px);
}

.stack {
  margin-bottom: 24px;
}

.noFullHeight {
  height: fit-content;
}

</style>
