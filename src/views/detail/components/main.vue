<template>
  <div class="content">
    <h1>{{ artileContent.title }}</h1>
    <van-cell :title="artileContent.aut_name" :label="label" class="aut-info">
      <van-button type="info" round @click="followUsers" v-if="!follow">
        + 关注
      </van-button>
      <van-button type="default" round @click="unsubscribe" v-else>
        已关注
      </van-button>
      <template #icon>
        <van-image
          class="photo"
          :src="artileContent.aut_photo"
          round
          width="35"
          height="35"
        ></van-image>
      </template>
    </van-cell>
    <article class="markdown-body" v-html="artileContent.content"></article>
    <van-divider>正文结束</van-divider>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      offset="1000"
      :immediate-check="false"
    >
      <Comment :articleComment="articleComment"></Comment>
    </van-list>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import Comment from '@/views/detail/components/comment.vue'
import { getCommentAPI, followUsersAPI, unsubscribeAPI } from '@/api'
export default {
  components: { Comment },
  props: {
    artileContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      articleComment: {},
      follow: false
    }
  },
  created() {},
  methods: {
    onLoad() {
      this.getComment('a', this.$route.query.articleId)
      this.loading = false
      this.finished = true
    },
    async getComment(type, source) {
      try {
        const data = await getCommentAPI(type, source)
        this.articleComment = data.data.data
        this.$emit('update:changeNum', this.articleComment.total_count)
      } catch (error) {
        this.error = true
      }
    },
    async followUsers() {
      try {
        await followUsersAPI(this.artileContent.aut_id)
        this.follow = true
      } catch (error) {
        if (!error.response) {
          throw error
        } else if (error.response.status === 401) {
          this.$toast.fail('登陆失败')
        } else {
          this.$toast.fail('刷新试试看')
        }
      }
    },
    async unsubscribe() {
      try {
        await unsubscribeAPI(this.artileContent.aut_id)
        this.follow = false
      } catch (error) {
        if (!error.response) {
          throw error
        } else if (error.response.status === 401) {
          this.$toast.fail('登陆失败')
        } else {
          this.$toast.fail('刷新试试看')
        }
      }
    }
  },
  computed: {
    label() {
      return dayjs(this.artileContent.pubdate).fromNow()
    }
  },
  watch: {
    artileContent(newValue) {
      this.getComment('a', this.$route.query.articleId)
      this.follow = newValue.is_followed
    }
  }
}
</script>

<style scoped lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.content {
  h1 {
    font-size: 37px;
    padding: 45px;
    margin: 0;
    color: #3a3a3a;
  }
  .photo {
    margin-right: 20px;
  }
  :deep(.aut-info) {
    align-items: center;
  }
  :deep(.van-cell__title) {
    font-size: 12px;
  }
  :deep(.van-button) {
    width: 170px;
    height: 58px;
  }
}
</style>
