import { defineStore } from "pinia"
import { Trainer } from "../../types"
import axiosInstance from "../axios-config"
import { AxiosResponse, AxiosError } from "axios"
import router from "../router";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {} as Trainer,
  }),

  getters: {
    getUserData: (state) => state.userData,
  },

  actions: {
    async fetchUserData() {
      await axiosInstance.get(
        "userdata",
        { headers: { "Authorization": `Token ${localStorage.getItem("token")}` }}
      ).then(async (response: AxiosResponse) => {
        this.userData = response.data.data;
      }).catch((error: AxiosError) => {
        console.log(error);
      });
    },
    async logout() {
      await axiosInstance.post(
        "logout",
        { "token": localStorage.getItem("token") }
      ).then(async (response: AxiosResponse) => {
        await localStorage.removeItem("token");
        router.push("/login")
      }).catch((error: AxiosError) => {
        console.log(error);
      });
    }
  },
});
