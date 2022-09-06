<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机格式不正确'
          }
        ]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-shouji"></span> </template
      ></van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /^[0-9]{6}$/,
            message: '验证码格式不正确'
          }
        ]"
      >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span> </template
      ></van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
}
.nav-bar .van-nav-bar__title {
  color: #fff;
}
.toutiao {
  font-size: 37px;
  margin-right: 25px;
}
</style>
