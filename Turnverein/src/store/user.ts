import { defineStore } from 'pinia'
import { Trainer } from 'types'

export const useUserStore = defineStore('app', {
  state: () => ({
    userData: {} as Trainer,
  }),

  getters: {
    getUserData: (state) => state.userData,
  },
});
