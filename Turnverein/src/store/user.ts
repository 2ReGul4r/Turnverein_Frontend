import { defineStore } from "pinia"
import { Trainer } from "types"
import axiosInstance from "../axios-config"
import { AxiosResponse, AxiosError } from "axios"

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {} as Trainer,
  }),

  getters: {
    getUserData: (state) => state.userData,
  },

  actions: {
    async fetchUserData(username: string) {
      const userStore = useUserStore();
      await axiosInstance.get(
          "trainer",
          { 
              params: { "username": username },
              headers: { "Authorization": `Token ${localStorage.getItem("token")}` } 
          },
      ).then((response: AxiosResponse) => {
          console.log(response);
          if(response.data.data.length) {
              userStore.userData = response.data.data[0];
          }
      }).catch((error: AxiosError) => {
          console.log(error);
      });
  },
  }
});
