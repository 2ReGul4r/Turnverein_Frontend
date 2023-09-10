import axios from 'axios'
import { defineStore } from 'pinia'
import { City, Member, Trainer, Sport, Coaching } from 'types'

const mainurl: string = "localhost:8000/api/"

export const useAppStore = defineStore('app', {
  state: () => ({
    cityList: [] as City[],
    memberList: [] as Member[],
    trainerList: [] as Trainer[],
    sportList: [] as Sport[],
    coachingList: [] as Coaching[]
  }),

  actions: {
    async fetchMember() {
      try {
        const data = await axios.get(
          "${mainurl}member"
        );
        this.memberList = data.data
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  }, 

  getters: {
    getCityList: (state) => state.cityList,
    getMemberList: (state) => state.memberList,
    getTrainerList: (state) => state.trainerList,
    getSportList: (state) => state.sportList,
    getCoachingList: (state) => state.coachingList,
  },
})
