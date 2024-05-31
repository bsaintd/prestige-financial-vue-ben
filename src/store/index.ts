import { FirebaseApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type LoginCredentials = {
  email: string,
  password: string,
}

export const useMainStore = defineStore('main', () => {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const currentUser = ref<User | null>(null)
  const globalLoading = ref(true)
  const firebase = ref<FirebaseApp | null>(null)

  async function loginEmailPass(val: LoginCredentials) {
    if (!firebase.value) {
      return
    }

    const auth = getAuth(firebase.value)
    const userCredential = await signInWithEmailAndPassword(auth, val.email, val.password)
    currentUser.value = userCredential.user
  }

  async function logout() {
    if (!firebase.value) {
      return
    }

    const auth = getAuth(firebase.value)
    await signOut(auth)
    currentUser.value = null
  }

  return {
    isDevelopment,
    currentUser,
    globalLoading,
    firebase,
    loginEmailPass,
    logout,
  }
})
