// src/store/modules/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userInfo',
  state: () => {
    return {
      name: 'Tom',
      age: '',
    }
  },
  getters: {},
  actions: {},
})
