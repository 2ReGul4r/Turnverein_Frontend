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
            v-model="username"
            :rules="usernameRules"
            autocomplete="username"
            class="stack"
            label="Username"
            variant="outlined"
          />
          <v-row>
            <v-text-field
              v-model="street"
              :rules="required"
              autocomplete="street-address"
              class="v-col-7"
              label="Street"
              variant="outlined"
            />
            <v-text-field
              v-model="house_number"
              :rules="nameRules"
              autocomplete="house-number"
              class="v-col-auto"
              label="House number"
              variant="outlined"
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="city"
              :rules="required"
              autocomplete="city"
              class="stack v-col-7"
              label="City"
              variant="outlined"
            />
            <v-text-field
              v-model="postcode"
              :rules="postcodeRules"
              autocomplete="postcode"
              class="stack v-col-auto"
              label="Postcode"
              maxlength="5"
              variant="outlined"
            />
          </v-row>
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
          Register
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
import { 
  isRequired,
  noSymbols,
  minLengthFive,
  onlyDigits,
  fiveLength,
} from "../validations";

export default {
  name: "Login",
  methods: {
    async register() {
      this.loading = true;
      await axiosInstance
        .post("register", { 
          ...this.buildDataJson(),
        })
        .then(async (response: AxiosResponse) => {
          
        })
        .catch((error: AxiosError) => {
          this.showError = true;
          console.log(error);
        });
      this.loading = false;
    },
    buildDataJson() {
      return {
        "first_name": this.first_name,
        "last_name": this.last_name,
        "street": this.street,
        "house_number": this.house_number,
        "city": this.city,
        "postcode": this.postcode,
        "username": this.username,
        "password": this.password,
      }
    }
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
    postcodeRules: [isRequired, onlyDigits, fiveLength],
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
  width: clamp(240px, 100%, 480px);
}

.stack {
  margin-bottom: 16px;
}

.v-row + .v-row {
  margin-top: unset;
}
</style>
