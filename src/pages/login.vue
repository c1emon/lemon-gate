<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useToast } from 'wot-design-uni'
import { getNavBarHeight, getScreenHeight, getStatusBarHeight } from '~/composables/theme'
import { useUserStore } from '~/stores/user'
import peopleLogo from '~/static/people.png'
import wxLogo from '~/static/wx.png'
import alipayLogo from '~/static/alipay.png'

const user = useUserStore()

const toast = useToast()

const tabId = ref<number>(0)
const loginTypeId = ref<number>(0)
const forceId = ref<number>(-1)

// 账号登录
const account = ref<string>('')
const password = ref<string>('')
// 短信登录
const phone = ref<string>('')
const smsCode = ref<string>('')
// 注册
const emailOrPhone = ref<string>('')

const smsBtnText = ref<string>('发送')
const isSmsBtnDisabled = ref<boolean>(false)

const isGoBtnDisabled = computed(() => {
  if (loginTypeId.value === 0)
    return !(account.value.length > 0 && password.value.length > 0)
  else if (loginTypeId.value === 1)
    return !(phone.value.length > 0 && smsCode.value.length > 0)
  else
    return true
})

const goBtnText = computed(() => {
  return tabId.value === 0 ? '登录' : '注册'
})

const isBadAccount = computed(() => {
  // if (account.value.length > 5)
  //   return true
  return false
})

function smsSend() {
  toast.info('验证码已发送')
  let counter: number = 59
  isSmsBtnDisabled.value = true
  const timer = setInterval(() => {
    smsBtnText.value = `${counter}s`
    counter--
  }, 1000)

  setTimeout(() => {
    clearInterval(timer)
    smsBtnText.value = '再次发送'
    isSmsBtnDisabled.value = false
  }, 1000 * 60)
}

function forgetPwd() {
  toast.warning(`不好意思～忘记密码暂时未实现`)
}

function goBtnClk() {
  if (tabId.value === 0) {
    toast.info(`登录...`)
    user.hasLogin = true
    router.push({
      path: '/pages/index',
      tabBar: true,
    })
  }
  else { toast.info(`注册...`) }
}

function otherLogin(provider: string) {
  toast.warning(`不好意思～第三方登录器${provider}暂时未实现`)
}
</script>

<template>
  <div :style="{ 'padding-top': `${getStatusBarHeight() + getNavBarHeight()}px`, 'height': `${getScreenHeight()}px`, 'background-image': 'url(https://oss.app.clemon.icu:883/static/imgs/watermark_ad8d1.png)' }" box-border w-full bg-cover p="x-4">
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
        <wd-tabs v-model="tabId">
          <wd-tab title="Login" />
          <wd-tab title="Sign up" />
        </wd-tabs>
      </div>
    </div>

    <div v-show="tabId === 0">
      <div p-b-8px text-left text-size-4xl>
        欢迎回来,
      </div>
      <div p-b-10px text-left text-size-2xl>
        {{ user.name }}.
      </div>
      <wd-tabs v-model="loginTypeId" :line-width="44">
        <wd-tab title="账号密码登录">
          <div block p-b-6px p-t-6px text-left text-size-lg>
            账号
          </div>
          <div p-b-16px>
            <wd-input v-model="account" type="text" size="large" :error="isBadAccount" confirm-type="next" confirm-hold clearable placeholder=" " no-border b-rd-16px @confirm="() => forceId = 1" @focus="() => forceId = -1" />
          </div>
          <div p-b-6px text-left text-size-lg>
            密码
          </div>
          <div p-b-16px>
            <wd-input v-model="password" placeholder=" " :focus="forceId === 1" size="large" clearable no-border show-password b-rd-16px />
          </div>
          <div flex justify-end>
            <div text-size-base @click="forgetPwd">
              Forget?
            </div>
          </div>
        </wd-tab>
        <wd-tab title="验证码登录">
          <div block p-b-6px p-t-6px text-left text-size-lg>
            手机号
          </div>
          <div p-b-16px>
            <wd-input v-model="phone" type="text" size="large" :error="isBadAccount" confirm-type="next" confirm-hold clearable placeholder=" " no-border b-rd-16px @confirm="() => forceId = 1" @focus="() => forceId = -1" />
          </div>
          <div p-b-6px text-left text-size-lg>
            验证码
          </div>
          <div p-b-16px>
            <wd-input v-model="smsCode" placeholder=" " :focus="forceId === 1" size="large" no-border use-suffix-slot b-rd-16px>
              <template #suffix>
                <wd-button hairline size="small" :disabled="isSmsBtnDisabled" style="--wot-button-small-height: 24px" @click="smsSend">
                  {{ smsBtnText }}
                </wd-button>
              </template>
            </wd-input>
          </div>
        </wd-tab>
      </wd-tabs>
    </div>
    <div v-show="tabId === 1">
      <div p-b-10px text-left text-size-4xl>
        你好 新朋友,
      </div>
      <div p-b-24px text-left text-size-2xl>
        欢迎加入我们
      </div>
      <div p-b-6px text-left text-size-lg>
        昵称
      </div>
      <div p-b-16px>
        <wd-input v-model="account" type="text" size="large" placeholder=" " clearable confirm-type="next" confirm-hold no-border b-rd-16px @confirm="() => forceId = 2" @focus="() => forceId = -1" />
      </div>
      <div p-b-6px text-left text-size-lg>
        邮箱
      </div>
      <div p-b-16px>
        <wd-input v-model="emailOrPhone" type="text" size="large" placeholder=" " :focus="forceId === 2" confirm-type="next" confirm-hold clearable no-border b-rd-16px @confirm="() => forceId = 3" @focus="() => forceId = 2" />
      </div>
      <div p-b-6px text-left text-size-lg>
        创建密码
      </div>
      <div>
        <wd-input v-model="password" placeholder=" " size="large" :focus="forceId === 3" clearable no-border show-password b-rd-16px />
      </div>
    </div>
    <div pos-fixed pos-bottom-none pos-left-none h-200px w-full b-rd-28px bg-white p="x-4px t-24px b-8px">
      <div w-full flex justify-around flex-items-center>
        <div w="40%" flex flex-col flex-items-start>
          <div p-b-20px text-size-lg>
            其他登录方式:
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
          <wd-button hairline :block="true" :disabled="isGoBtnDisabled" icon="arrow-right1" size="large" @click="goBtnClk">
            {{ goBtnText }}
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
