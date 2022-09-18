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
    <!-- 评论弹层 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      offset="300"
      :immediate-check="false"
    >
      <Comment :results="results" @showReply="showReply"></Comment>
    </van-list>
    <!-- 回复评论弹层 -->
    <van-popup
      v-model="showReplay"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ReplayComment
        @colseReplayComment="showReplay = false"
        @getReplayList="getReplayList"
        @changeList="replayList.unshift($event)"
        @updateResults="updateResults"
        :replayList="replayList"
        :end_id="end_id === null ? 1 : end_id"
        :currentComment="currentComment"
        :loadingRelay="loadingRelay"
        ref="replay"
      ></ReplayComment>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import Comment from '@/views/detail/components/comment.vue'
import { getCommentAPI, followUsersAPI, unsubscribeAPI } from '@/api'
import ReplayComment from './replayComment.vue'
export default {
  components: { Comment, ReplayComment },
  props: {
    artileContent: {
      type: Object,
      default: () => {
        return {}
      }
    },
    newObj: {
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
      lastId: '',
      end_id: '',
      results: [],
      follow: false,
      replayList: [],
      showReplay: false,
      replayId: '',
      currentComment: {},
      loadingRelay: false
    }
  },
  created() {},
  methods: {
    onLoad() {
      if (this.lastId === null) {
        this.finished = true
        return
      }
      this.getComment('a', this.$route.query.articleId, this.lastId, 9)
    },
    async getComment(type, source, offset, limit) {
      try {
        const data = await getCommentAPI(type, source, offset, limit)

        if (type === 'a') {
          this.lastId = data.data.data.last_id
          // 这个用来记录请求文章评论新数据的起始id
          if (data.data.data.results.length < 9) {
            this.finished = true
          }
          // 一旦数据变化 就往结果里添加新的数据
          this.results.push(...data.data.data.results)
          // 出发父组件的事件 ，让评论数 时时更新
          this.$emit('update:changeNum', this.results.length)
          // 只有再请求完后 再把list的loading更新
          this.loading = false
        } else {
          this.end_id = data.data.data.last_id
          this.replayList.push(...data.data.data.results)
          this.$refs.replay.loading = false
          if (this.end_id === null) {
            this.$refs.replay.finished = true
          }
        }
      } catch (err) {
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
    },
    showReply(item) {
      // 判断如果点击的评论不一样 那就清空回复评论 重新请求
      if (this.replayId !== item.com_id) {
        this.replayList = []
        this.replayId = item.com_id
        this.getReplayList()
      }
      // 最后都执行这两步
      this.currentComment = item
      this.showReplay = true
    },
    getReplayList() {
      this.getComment('c', this.replayId, this.end_id, 5)
    },
    updateResults(count) {
      this.currentComment.reply_count = count
    }
  },
  computed: {
    label() {
      return dayjs(this.artileContent.pubdate).fromNow()
    }
  },
  watch: {
    artileContent(newValue) {
      this.follow = newValue.is_followed
    },
    newObj(newValue) {
      this.results.unshift(newValue)
      this.$emit('update:changeNum', this.results.length)
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
