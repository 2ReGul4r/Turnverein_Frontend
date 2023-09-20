<template>
  <div class="login_wrapper">
    <v-card
      :loading="loading"
      class="login_card"
      title="Trainer Login"
    >
      <v-container>
        <v-form @submit.prevent="login" fast-fail id="login-form">
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

        <v-btn @click="login" type="submit" form="login-form">
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
import { isRequired, noSymbols } from "../validations"

export default {
  name: "Login",
  methods: {
    async login() {
      this.loading = true;
      await axiosInstance
        .post("login", { username: this.username, password: this.password })
        .then(async (response: AxiosResponse) => {
          this.showError = false;
          localStorage.setItem("token", response.data.token);
          router.push("/");
        })
        .catch((error: AxiosError) => {
          this.showError = true;
          console.log(error);
        });
      this.loading = false;
    },
  },
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
    showError: false,
    loading: false,
    usernameRules: [isRequired, noSymbols],
  }),
};
</script>

<style scoped>
.login_wrapper {
  display: flex;
  justify-content: center;
  margin: 32px;
}

.login_card {
  width: clamp(240px, 100%, 360px);
}

.stack {
  margin-bottom: 16px;
}
</style>
