import { defineStore } from "pinia";
import { City, Member, Trainer, Sport, Course } from "types";
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    cityList: [] as City[],
    memberList: [] as Member[],
    trainerList: [] as Trainer[],
    sportList: [] as Sport[],
    courseList: [] as Course[],
    showHeader: false as boolean,
  }),

  getters: {
    getCityList: (state) => state.cityList,
    getMemberList: (state) => state.memberList,
    getTrainerList: (state) => state.trainerList,
    getSportList: (state) => state.sportList,
    getCourseList: (state) => state.courseList,
    shouldShowHeader: (state) => state.showHeader,
  },

  actions: {
    async fetchMember() {
      await axiosInstance
        .get("member")
        .then((reponse: AxiosResponse) => {
          this.memberList = reponse.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
  },
});
