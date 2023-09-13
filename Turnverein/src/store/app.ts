import axios from 'axios'
import { defineStore } from 'pinia'
import { City, Member, Trainer, Sport, Coaching } from 'types'

const mainurl: string = "localhost:8000/api/";

export const useAppStore = defineStore('app', {
  state: () => ({
    cityList: [] as City[],
    memberList: [] as Member[],
    trainerList: [] as Trainer[],
    sportList: [] as Sport[],
    coachingList: [] as Coaching[],
    authenticatedUser: false as Boolean,
  }),

  getters: {
    getCityList: (state) => state.cityList,
    getMemberList: (state) => state.memberList,
    getTrainerList: (state) => state.trainerList,
    getSportList: (state) => state.sportList,
    getCoachingList: (state) => state.coachingList,
    isAuthenticated: (state) => state.authenticatedUser,
  },

  actions: {
    async fetchMember() {
      await axios.get(
        `${mainurl}member`
      ).then((reponse) => {
        this.memberList = reponse.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        this.authenticatedUser = true;
      } else {
        this.authenticatedUser = false;
      }
    },
  }, 
});
