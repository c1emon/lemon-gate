import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const name = ref('老朋友')
  const id = ref('')
  const hasLogin = ref(false)

  return {
    name,
    id,
    hasLogin,
  }
})
