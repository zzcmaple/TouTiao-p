<template>
  <div class="edit">
    <van-popup
      v-model="showMessageBoard"
      position="bottom"
      :style="{ height: '15%' }"
      class="messageBoard"
    >
      <van-field
        v-model.trim="message"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
        @input="getValue"
      >
        <template #extra>
          <van-button @click="postComment" block :class="{ active: active }"
            >发布</van-button
          >
        </template>
      </van-field></van-popup
    >
  </div>
</template>

<script>
import { postCommentAPI } from '@/api'
export default {
  props: {
    id: {
      typr: String,
      default: ''
    },
    newObj: {
      typr: Object,
      required: true
    },
    art_id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showMessageBoard: false,
      message: '',
      active: false
    }
  },
  methods: {
    getValue() {
      if (this.message === '') {
        this.active = false
      } else {
        this.active = true
      }
    },
    async postComment() {
      try {
        if (this.message === '') {
          return
        }
        const comment = {
          target: this.id,
          content: this.message,
          art_id: this.art_id
        }
        const { data } = await postCommentAPI(comment)
        this.$emit('newObj', data.data.new_obj)
        this.$toast.success('评论成功')
        this.showMessageBoard = false
      } catch (error) {
        if (!error.response) {
          throw error
        } else if (error.response.status === 401) {
          this.$toast.fail('登陆失败')
        } else if (error.response.status === 403) {
          this.$toast.fail('文章已关闭评论')
        } else {
          this.$toast.fail('发布失败')
        }
      }
    }
  },
  watch: {
    showMessageBoard(newValue) {
      if (newValue === false) {
        this.message = ''
        this.active = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.edit {
  .messageBoard {
    display: flex;
    width: 100%;
    padding: 36px;
    :deep(.van-cell__value) {
      background-color: #f5f7f9;
    }
    :deep(.van-cell) {
      padding: 0;
    }
    :deep(.van-button) {
      flex: 0.25;
      height: 100%;
      border: none;
      padding-left: 0;
      color: #b5d1ec;
    }
    :deep(.van-field__word-limit) {
      margin-top: 40px;
    }
    :deep(.active) {
      color: #6ba3d8;
    }
  }
}
</style>
