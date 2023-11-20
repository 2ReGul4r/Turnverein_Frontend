import { defineStore } from "pinia";
import { Member, Trainer, Course } from "types";
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";

export const useDataStore = defineStore("data", {
  state: () => ({
    memberList: [] as Member[],
    trainerList: [] as Trainer[],
  }),

  getters: {
    getMemberList: (state) => state.memberList,
    getTrainerList: (state) => state.trainerList,
  },

  actions: {
    async fetchMember() {
      await axiosInstance
        .get("member", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { all: true },
        })
        .then((response: AxiosResponse) => {
          this.memberList = response.data.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchTrainer() {
      await axiosInstance
        .get("trainer", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { all: true },
        })
        .then((response: AxiosResponse) => {
          this.trainerList = response.data.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
  },
  persist: true,
});
