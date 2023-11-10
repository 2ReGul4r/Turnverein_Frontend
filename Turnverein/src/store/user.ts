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
      console.log('userdata');
      await axiosInstance
        .get("userdata", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        })
        .then((response: AxiosResponse) => {
          this.userData = response.data.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
      console.log('userdata fertig');
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
          return 1
        });
        return 0
    },
    async logout() {
      await axiosInstance
        .post("logout", { token: localStorage.getItem("token") })
        .then(async (response: AxiosResponse) => {
          this.userData = {} as Trainer;
          await localStorage.removeItem("token");
          router.push("/login");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchUserCourses(page: number = 1) {
      await axiosInstance
        .get("course", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { trainer: this.getUserData.id, page: page },
        })
        .then((response: AxiosResponse) => {
          console.log(response.data)
          this.userCourses = response.data.data;
          this.userCoursePages = response.data.page_count;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
        console.log('params fertig', this.getUserData.id, page)
    },
  },
});
