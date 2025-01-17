import { defineStore } from "pinia";
import { Trainer, Course } from "../../types";
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";
import router from "../router";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {} as Trainer,
    userCourses: [] as Course[],
    userCoursePages: 1 as number,
    loginError: false as boolean,
  }),

  getters: {
    getUserData: (state) => state.userData,
    getUserCourses: (state) => state.userCourses,
    getUserCoursePages: (state) => state.userCoursePages,
    getLoginError: (state) => state.loginError,
  },

  actions: {
    async fetchUserData() {
      await axiosInstance
        .get("trainer", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response: AxiosResponse) => {
          this.userData = response.data.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async login(username: string, password: string) {
      await axiosInstance
        .post("login", { username: username, password: password })
        .then(async (response: AxiosResponse) => {
          this.loginError = false;
          await localStorage.setItem("token", response.data.token);
          this.userData = response.data.userdata;
          await this.fetchUserCourses();
        })
        .catch((error: AxiosError) => {
          console.log(error);
          this.loginError = true;
        });
    },
    async logout() {
      await axiosInstance
        .post("logout", { token: localStorage.getItem("token") })
        .then(async () => {
          await localStorage.removeItem("token");
          router.push("/login");
          await this.$reset();
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchUserCourses(page: number = 1, sport: string = "") {
      await axiosInstance
        .get("course", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { trainer: this.getUserData.id, page: page, sport: sport },
        })
        .then((response: AxiosResponse) => {
          this.userCourses = response.data.data;
          this.userCoursePages = response.data.page_count;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
  },
  persist: true,
});
