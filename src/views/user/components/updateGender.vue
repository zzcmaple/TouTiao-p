<template>
  <van-picker
    title="更新性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    :default-index="info.gender"
  />
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    onCancel() {
      this.$emit('changeShow')
    },
    onConfirm(value, index) {
      if (index === this.info.gender) {
        this.$toast.fail('更新失败')
        return
      }
      this.updateUserInfo(index)
      this.$emit('update:info-gender', index)
      this.$emit('changeShow')
    },
    async updateUserInfo(index) {
      const gender = { gender: index }
      await updateUserInfoAPI(gender)
    }
  }
}
</script>

<style scoped lang="less"></style>
