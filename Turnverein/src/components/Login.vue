<template>
    <div class="login_wrapper">
        <v-card
            class="mx-auto"
            max-width="360"
            title="Trainer Login"
        >
            <v-container>
                <form v-on:submit.prevent="login">
                    <v-text-field
                        v-model="username"
                        autocomplete="username"
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
                </form>
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

            <v-btn @click="login">
                Login
                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import axiosInstance from "../axios-config"
import { AxiosResponse, AxiosError } from "axios"
import router from "../router"
import { useUserStore } from "../store/user"
export default {
    name: "Login",
    methods: {
        async login() {
            const userStore = useUserStore();
            await axiosInstance.post(
                "login/",
                { "username": this.username, "password": this.password },
            ).then(async (response: AxiosResponse) => {
                localStorage.setItem("token", response.data.token);
                await userStore.fetchUserData(this.username);
                router.push("/");
            }).catch((error: AxiosError) => {
                console.log(error);
            })
        },
    },
    data () {
        return {
            username: "",
            password: "",
            showPassword: false,
            showError: false,
        }
  },
};
</script>
