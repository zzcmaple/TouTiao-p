<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
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
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.info.birthday),
      date: ''
    }
  },
  methods: {
    onCancel() {
      this.$emit('changeShow')
    },
    onConfirm(value) {
      this.date = dayjs(value).format('YYYY-MM-DD')
      if (this.date === this.info.birthday) {
        this.$toast.fail('更新失败')
        return
      }
      this.updateUserInfo()
      this.$emit('update:info-birthday', this.date)
      this.$emit('changeShow')
    },
    async updateUserInfo() {
      const date = { birthday: this.date }
      await updateUserInfoAPI(date)
    }
  }
}
</script>

<style></style>
