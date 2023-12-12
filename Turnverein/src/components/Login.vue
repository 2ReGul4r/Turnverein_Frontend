<template>
  <div class="login_wrapper">
    <v-card
      :loading="loading"
      class="login_card"
      title="Trainer Login"
      variant="tonal"
    >
      <v-container>
        <v-form @submit.prevent="login" fast-fail id="login-form">
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            autocomplete="username"
            class="stack"
            label="Username"
            prepend-inner-icon="mdi-account"
            variant="outlined"
          />
          <v-text-field
            v-model="password"
            @click:append-inner="showPassword = !showPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="showPassword ? 'input' : 'password'"
            autocomplete="current-password"
            label="Password"
            prepend-inner-icon="mdi-lock-outline"
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
import {
  isRequired,
  noSymbols,
  minLengthFive,
  minLengthEight,
} from "../validations";
import { useUserStore } from "@/store/user";
import { mapStores } from "pinia";
import router from "../router";

export default {
  name: "Login",
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
    async login() {
      this.loading = true;
      const hasError = !(await this.userStore.login(
        this.username,
        this.password
      ));
      this.loading = false;
      if (hasError) {
        this.showError = true;
        return;
      }
      router.push("/");
    },
  },
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
    showError: false,
    loading: false,
    usernameRules: [isRequired, noSymbols, minLengthFive],
    passwordRules: [isRequired, minLengthEight],
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
  width: clamp(240px, 100%, 480px);
}

.stack {
  margin-bottom: 16px;
}
</style>
