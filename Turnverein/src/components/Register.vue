<template>
  <div class="register_wrapper">
    <v-card
      :loading="loading"
      class="register_card"
      title="Create Trainer-account"
      variant="tonal"
    >
      <v-container>
        <v-form @submit.prevent="register" fast-fail id="register-form">
          <v-text-field
            v-model="first_name"
            :rules="nameRules"
            autocomplete="given-name"
            class="stack"
            label="Firstname"
            variant="outlined"
          />
          <v-text-field
            v-model="last_name"
            :rules="nameRules"
            autocomplete="family-name"
            class="stack"
            label="Lastname"
            variant="outlined"
          />
          <v-text-field
            v-model="street"
            :rules="required"
            autocomplete="street-address"
            class="stack"
            label="Lastname"
            variant="outlined"
          />
          <v-text-field
            v-model="house_number"
            autocomplete="family-name"
            class="stack"
            label="Lastname"
            variant="outlined"
          />
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            autocomplete="username"
            class="stack"
            label="Username"
            variant="outlined"
          />
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            autocomplete="username"
            class="stack"
            label="Username"
            variant="outlined"
          />
          <v-text-field
            v-model="password"
            @click:append-inner="showPassword = !showPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'input' : 'password'"
            autocomplete="current-password"
            label="Password"
            variant="outlined"
          />
        </v-form>
        <v-alert
          v-if="showError"
          @click:close="showError = false"
          closable
          text="The username or password you entered was incorrect. Please try again."
          title="Wrong credentials"
          type="error"
          variant="tonal"
        />
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="register" type="submit" form="register-form">
          Login
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";
import router from "../router";
import { isRequired, noSymbols, minLengthFive } from "../validations";

export default {
  name: "Login",
  methods: {
    async register() {
      this.loading = true;
      //axios call
      this.loading = false;
    },
  },
  data: () => ({
    first_name: "",
    last_name: "",
    street: "",
    house_number: "",
    city: "",
    postcode: "",
    username: "",
    password: "",
    showPassword: false,
    showError: false,
    loading: false,
    usernameRules: [isRequired, noSymbols, minLengthFive],
    nameRules: [isRequired, noSymbols],
    required: [isRequired],
  }),
};
</script>

<style scoped>
.register_wrapper {
  display: flex;
  justify-content: center;
  margin: 32px;
}

.register_card {
  width: clamp(240px, 100%, 360px);
}

.stack {
  margin-bottom: 16px;
}
</style>
