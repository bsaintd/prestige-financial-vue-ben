<script lang="ts" setup>
import { ref } from 'vue'
import { useMainStore } from '@/store'
import { logger } from '@/utils/logger'

const mainStore = useMainStore()

const email = ref('qesandbox@gmail.com')
const password = ref('')

async function loginEmailPassword(): Promise<void> {
  try {
    await mainStore.loginEmailPass({ email: email.value, password: password.value })
  } catch (ex) {
    logger.error(ex.message)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-page__input-container">
      email: <input id="email" v-model="email" type="text" label="Email">
    </div>
    <div class="login-page__input-container">
      password: <input id="password" v-model="password" type="text" label="Password">
    </div>

    <div class="login-page__info">
      username is: qesandbox@gmail.com
    </div>
    <div class="login-page__info">
      password is: test123
    </div>
    <button id="sign-in-button-manual" class="login-page__button" type="button" @click="loginEmailPassword">
      login with email and password
    </button>
  </div>
</template>

<style>
.login-page {
  background-color:  #f2f2f2;
  padding: 40px;
  width: 400px;
  border-radius: 6px;
}

.login-page__input-container {
  margin-bottom: 10px;
}

.login-page__info {
  margin-bottom: 20px;
}

.login-page__button {
  margin: 0 auto;
}
</style>