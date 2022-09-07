<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span> </template
      ></van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            type="default"
            size="small"
            round
            class="btn"
            native-type="button"
            @click="sendCode"
            v-if="BtnShow"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="3000"
            format="ss秒"
            @finish="BtnShow = true"
          /> </template
      ></van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from '@/views/Login/login'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      BtnShow: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loding() {
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
    },
    async onSubmit() {
      try {
        this.loding()
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loding()
      try {
        await sendCodeAPI(this.mobile)
        this.$toast.success('发送成功')
        this.BtnShow = false
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
.toutiao {
  font-size: 37px;
  margin-right: 25px;
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
