<template>
  <div class="detail">
    <!-- 导航 -->
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    <!-- 主体 -->

    <keep-alive>
      <Main
        :artileContent="artileContent"
        class="main"
        :changeNum.sync="num"
        @getNewArticle="getNewArticle"
      ></Main>
    </keep-alive>

    <!-- 底部栏 -->
    <footer class="bottom">
      <van-button
        type="default"
        @click="showMessageBoard = true"
        border
        round
        size="mini"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="num" />
      <van-icon name="star-o" @click="favoriteArticles" v-if="!collected" />
      <van-icon name="star" @click="unfavoriteArticle" v-else color="red" />
      <van-icon name="good-job-o" />
      <van-icon name="share" />
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
            <van-button @click="postComment" :class="{ active: active }"
              >发布</van-button
            >
          </template>
        </van-field></van-popup
      >
    </footer>
  </div>
</template>

<script>
import {
  getNewArticleAPI,
  favoriteArticlesAPI,
  unfavoriteArticleAPI,
  postCommentAPI
} from '@/api'
import Main from './components/main.vue'

export default {
  data() {
    return {
      artileContent: {},
      num: 0,
      collected: false,
      showMessageBoard: false,
      message: '',
      active: false
    }
  },
  created() {
    this.getNewArticle()
  },
  methods: {
    async getNewArticle() {
      try {
        const { data } = await getNewArticleAPI(this.$route.query.articleId)
        this.artileContent = data.data
      } catch (error) {
        if (error.response) this.$toast.fail(error.response.message)
      }
    },
    async favoriteArticles() {
      try {
        await favoriteArticlesAPI(this.artileContent.art_id)
        this.collected = true
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
    async unfavoriteArticle() {
      try {
        await unfavoriteArticleAPI(this.artileContent.art_id)
        this.collected = false
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
    getValue() {
      if (this.message === '') {
        this.active = false
      } else {
        this.active = true
      }
    },
    async postComment() {
      try {
        const comment = {
          target: this.artileContent.art_id,
          content: this.message
        }
        await postCommentAPI(comment)
        this.getNewArticle()
        this.showMessageBoard = false
      } catch (error) {
        if (!error.response) {
          throw error
        } else if (error.response.status === 401) {
          this.$toast.fail('登陆失败')
        } else if (error.response.status === 403) {
          this.$toast.fail('文章已关闭评论')
        } else {
          this.$toast.fail('刷新试一下')
        }
      }
    }
  },
  components: { Main },
  watch: {
    artileContent(newValue) {
      this.collected = newValue.is_collected
    },
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
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.van-icon-arrow-left) {
  color: #fff;
}
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 88px;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  :deep(.van-button) {
    width: 282px;
    height: 60px;
    font-size: 29px;
    color: #a7a7a7;
  }
  :deep(.van-icon) {
    font-size: 40px;
    color: #777777;
  }
}
.main {
  height: calc(100vh - 182px);
  overflow: auto;
}
.detail {
  padding-bottom: 88px;
}
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
</style>
