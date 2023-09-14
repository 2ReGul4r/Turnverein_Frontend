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
                    <v-alert
                        v-if="errors"
                        @click:close="errors = false"
                        closable
                        text="The username or password you entered was incorrect. Please try again."
                        title="Wrong credentials"
                        type="error"
                        variant="tonal"
                    />
                </form>
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
            await axiosInstance.post(
                "login/",
                { "username": this.username, "password": this.password },
            ).then(async (response: AxiosResponse) => {
                console.log(response);
                this.errors = false;
                localStorage.setItem("token", response.data.token);
                await this.fetchUserData(this.username);
                router.push("/");
            }).catch((error: AxiosError) => {
                console.log(error);
                this.errors = true;
            })
        },
        async fetchUserData(username: string) {
            const userStore = useUserStore();
            await axiosInstance.get(
                "member",
                { 
                    params: { "username": username },
                    headers: { 'Authorization': `Token ${localStorage.getItem("token")}` } 
                },
            ).then((reponse: AxiosResponse) => {
                userStore.userData = reponse.data;
            }).catch((error: AxiosError) => {
                console.log(error);
                this.errors = true;
            });
        },
    },
    data () {
        return {
            username: "",
            password: "",
            errors: false,
            showPassword: false,
        }
  },
};
</script>

<style>
.login_wrapper {
    margin: 32px;
}
</style>