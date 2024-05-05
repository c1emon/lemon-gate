<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { getNavBarHeight, getScreenHeight, getStatusBarHeight } from '~/composables/theme'
import peopleLogo from '~/static/people.png'
import wxLogo from '~/static/wx.png'
import alipayLogo from '~/static/alipay.png'

const toast = useToast()

const tabId = ref<number>(0)
const forceId = ref<number>(-1)
const account = ref<string>('')
const password = ref<string>('')

const btnText = computed(() => {
  return tabId.value === 0 ? 'Login' : 'Sign Up'
})

const isBadAccount = computed(() => {
  if (account.value.length > 5)
    return true
  return false
})

function forgetPwd() {
  toast.warning(`不好意思～忘记密码暂时未实现`)
}

function btnClk() {
  if (tabId.value === 0)
    toast.info(`登录...`)
  else
    toast.info(`注册...`)
}

function otherLogin(provider: string) {
  toast.warning(`不好意思～第三方登录器${provider}暂时未实现`)
}
</script>

<template>
  <div :style="{ 'padding-top': `${getStatusBarHeight() + getNavBarHeight()}px`, 'height': `${getScreenHeight()}px`, 'background-image': 'url(https://pu61ic.oss-cn-shanghai.aliyuncs.com/watermark_ad8d1.png)' }" box-border w-full bg-cover p="x-4">
    <div box-border w-full flex justify-between flex-items-center bg-transparent p-b-40px>
      <div w="55%" flex justify-start>
        <wd-img
          :width="70"
          :height="70"
          mode="aspectFit"
          round
          :src="peopleLogo"
        />
      </div>
      <div w="40%">
        <wd-tabs v-model="tabId" custom-class="tabs">
          <wd-tab title="Login" />
          <wd-tab title="Sign up" />
        </wd-tabs>
      </div>
    </div>

    <div v-if="tabId === 0">
      <div p-b-10px text-left text-size-4xl>
        Welcome Back,
      </div>
      <div p-b-24px text-left text-size-2xl>
        Clemon.
      </div>
      <div block p-b-6px text-left text-size-lg>
        Account
      </div>
      <div p-b-16px>
        <wd-input v-model="account" type="text" size="large" :error="isBadAccount" confirm-type="next" confirm-hold clearable placeholder=" " no-border b-rd-16px @confirm="() => forceId = 1" @focus="() => forceId = -1" />
      </div>

      <div p-b-6px text-left text-size-lg>
        Password
      </div>
      <div p-b-16px>
        <wd-input v-model="password" placeholder=" " :focus="forceId === 1" size="large" clearable no-border show-password b-rd-16px />
      </div>
      <div flex justify-end>
        <div text-size-base @click="forgetPwd">
          Forget?
        </div>
      </div>
    </div>
    <div v-else>
      <div p-b-10px text-left text-size-4xl>
        Hello New,
      </div>
      <div p-b-24px text-left text-size-2xl>
        Let's make a new account
      </div>
      <div p-b-6px text-left text-size-lg>
        Account Name
      </div>
      <div p-b-16px>
        <wd-input type="text" size="large" placeholder=" " clearable no-border b-rd-16px />
      </div>
      <div p-b-6px text-left text-size-lg>
        Email or Phone
      </div>
      <div p-b-16px>
        <wd-input type="text" size="large" placeholder=" " clearable no-border b-rd-16px />
      </div>
      <div p-b-6px text-left text-size-lg>
        Create Password
      </div>
      <div>
        <wd-input placeholder=" " size="large" clearable no-border show-password b-rd-16px />
      </div>
    </div>
    <div pos-fixed pos-bottom-none pos-left-none h-200px w-full b-rd-28px bg-white p="x-4px t-24px b-8px">
      <div w-full flex justify-around flex-items-center>
        <div w="40%" flex flex-col flex-items-start>
          <div p-b-20px text-size-lg>
            Or continue with:
          </div>
          <div flex flex-wrap justify-between flex-items-start>
            <wd-img
              p-5px
              :width="40"
              :height="40"
              mode="aspectFit"
              :src="wxLogo"
              @click="() => otherLogin('wx')"
            />
            <wd-img
              p-5px
              :width="40"
              :height="40"
              mode="aspectFit"
              :src="alipayLogo"
              @click="() => otherLogin('alipay')"
            />
          </div>
        </div>

        <div w="40%">
          <wd-button hairline :block="true" icon="arrow-right1" size="large" @click="btnClk">
            {{ btnText }}
          </wd-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.wd-tabs__nav) {
  background-color: transparent !important;
  background: none !important;
}
:deep(.wd-tabs) {
  background-color: transparent !important;
  background: none !important;
}
</style>

<route lang="yaml">
layout: empty
style:
  disableScroll: true
  app-plus:
    bounce: "none"
</route>
