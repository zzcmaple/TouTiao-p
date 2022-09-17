<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      :value="message"
      @input="getValue"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'userNmae',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      message: this.info.name || ''
    }
  },
  methods: {
    onClickLeft() {
      this.$emit('changeShow')
    },
    onClickRight() {
      if (this.message.trim() === '') {
        this.$toast('请输入昵称')
        this.message = ''
        return
      }
      if (this.message === this.info.name) {
        this.$toast.fail('更新失败')
        return
      }
      this.$emit('changeShow')
      this.$emit('update:info-name', this.message)
      this.updateUserInfo()
    },
    async updateUserInfo() {
      const value = { name: this.message }
      await updateUserInfoAPI(value)
    },
    getValue(value) {
      this.message = value
    }
  }
}
</script>

<style></style>
