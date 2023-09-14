import { defineStore } from 'pinia'
import { Trainer } from 'types'
import axiosInstance from '../axios-config'
import { AxiosResponse, AxiosError } from 'axios'

export const useUserStore = defineStore('app', {
  state: () => ({
    userData: {} as Trainer,
  }),

  getters: {
    getUserData: (state) => state.userData,
  },
});
