import { defineStore } from "pinia";
import { City, Member, Trainer, Sport, Course } from "../../../types";;
import axiosInstance from "../axios-config";
import { AxiosResponse, AxiosError } from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    cityList: [] as City[],
    memberList: [] as Member[],
    memberListPages: 1 as number,
    trainerList: [] as Trainer[],
    trainerListPages: 1 as number,
    sportList: [] as Sport[],
    courseList: [] as Course[],
    courseListPages: 1 as number,
    showHeader: false as boolean,
  }),

  getters: {
    getCityList: (state) => state.cityList,
    getMemberList: (state) => state.memberList,
    getMemberListPages: (state) => state.memberListPages,
    getTrainerList: (state) => state.trainerList,
    getTrainerListPages: (state) => state.trainerListPages,
    getSportList: (state) => state.sportList,
    getCourseList: (state) => state.courseList,
    getCourseListPages: (state) => state.courseListPages,
    shouldShowHeader: (state) => state.showHeader,
  },

  actions: {
    async fetchMember(page: number, name: string = "") {
      await axiosInstance
        .get("member", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { page: page, name: name },
        })
        .then((response: AxiosResponse) => {
          this.memberList = response.data.data;
          this.memberListPages = response.data.page_count;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchTrainer(page: number, name: string = "") {
      await axiosInstance
        .get("trainer", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { page: page, name: name },
        })
        .then((response: AxiosResponse) => {
          this.trainerList = response.data.data;
          this.trainerListPages = response.data.page_count;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchCourses(page: number = 1, sport: string = "") {
      await axiosInstance
        .get("course", {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          params: { page: page, sport: sport },
        })
        .then((response: AxiosResponse) => {
          this.courseList = response.data.data;
          this.courseListPages = response.data.page_count;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
  },
});
