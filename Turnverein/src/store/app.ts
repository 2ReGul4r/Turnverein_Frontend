import { mande } from 'mande'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    memberData: null,
  }),

  actions: {
    async getAllMembers() {
      const api = mande('/api/member')
      try {
        this.memberData = await api.get()
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }
})
