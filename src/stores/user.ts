import { defineStore } from 'pinia'

interface user {
  id: string
  name: string
  hasLogin: boolean
  openIds?: Record<string, string>
}

export const useUserStore = defineStore('user', () => {
  const curUser = ref<user>({
    id: '',
    name: '老朋友',
    hasLogin: false,
  })

  const id = computed(() => curUser.value.id)
  const name = computed(() => curUser.value.name)
  const hasLogin = computed(() => curUser.value.hasLogin)

  function login(id: string, name: string) {
    curUser.value.id = id
    curUser.value.name = name
    curUser.value.hasLogin = true
  }

  return {
    id,
    name,
    hasLogin,
    login,
  }
})
