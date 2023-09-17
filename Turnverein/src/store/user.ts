import { defineStore } from 'pinia'
import { Trainer } from 'types'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {} as Trainer,
  }),

  getters: {
    getUserData: (state) => state.userData,
    isAuthenticated: () => localStorage.getItem('token'),
  },
});
