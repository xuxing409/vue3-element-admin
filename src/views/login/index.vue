<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t('msg.login.title') }}
        </h3>
        <lang-select class="lang-select" effect="light" />
      </div>
      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd">
          <span class="svg-container" @click="onChangePwdType">
            <svg-icon
              :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </span>
      </el-form-item>
      <el-button
        @click="handleLogin"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
      >
        {{ $t('msg.login.loginBtn') }}</el-button
      >
      <pre class="tips">
        {{ $t('msg.login.desc') }}
      </pre>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { validatePassword } from './rules'
import appStore from '@/stores'
import { useI18n } from 'vue-i18n'
import LangSelect from '@/components/LangSelect/index.vue'
const i18n = useI18n()
const usernameRuleMessage = computed(() => i18n.t('msg.login.usernameRule'))

// 绑定属性
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
// 校验规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: usernameRuleMessage
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword() // 自定义校验规则
    }
  ]
})
// 处理密码框文本显示
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// 登录
const loading = ref(false)
const loginFormRef = ref(null)
const { login } = appStore.useUserStore

const handleLogin = () => {
  // 1.进行表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    login(loginForm.value)
      .then(() => {
        loading.value = false
        // TODO 进行登录后处理
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
  // 2.触发登录动作
  // 3.进行登陆后处理
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      .el-input__wrapper {
        background: transparent;
        box-shadow: none;
        padding: 1px 0px;
        width: 100%;
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
        }
      }
    }
    .tips {
      font-size: 16px;
      color: #fff;
      line-height: 24px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none; //无法选中
  }
  .lang-select {
    position: absolute;
    top: 4px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
