import { defineStore } from "pinia";
import { Trainer, Course } from "../../types";
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";
import router from "../router";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {} as Trainer,
    userCourses: [] as Course[],
    userCoursePages: 1 as number
  }),

  getters: {
    getUserData: (state) => state.userData,
    getUserCourses: (state) => state.userCourses,
    getUserCoursePages: (state) => state.userCoursePages,
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
          localStorage.setItem("token", response.data.token);
          this.userData = response.data.userdata;
          router.push("/");
        })
        .catch((error: AxiosError) => {
          console.log(error);
          return 0
        });
        return 1
    },
    async logout() {
      await axiosInstance
        .post("logout", { token: localStorage.getItem("token") })
        .then(async (response: AxiosResponse) => {
          await this.$reset();
          await localStorage.removeItem("token");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
        //TODO: investigate why we need a reload and a push does not work.
        router.go(0);
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
