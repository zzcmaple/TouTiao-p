<template>
  <div class="detail">
    <!-- 导航 -->
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 主体 -->

    <keep-alive>
      <Main
        :artileContent="artileContent"
        class="main"
        :changeNum.sync="num"
        :newObj="newObj"
        @getNewArticle="getNewArticle"
      ></Main>
    </keep-alive>

    <!-- 底部栏 -->
    <footer class="bottom">
      <van-button
        type="default"
        @click="$refs.CommentEdit.showMessageBoard = true"
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
      <!-- 写评论的组件 -->
      <CommentEdit
        :id="artileContent.art_id"
        :newObj="newObj"
        @newObj="newObj = $event"
        ref="CommentEdit"
      ></CommentEdit>
    </footer>
  </div>
</template>

<script>
import {
  getNewArticleAPI,
  favoriteArticlesAPI,
  unfavoriteArticleAPI
} from '@/api'
import Main from './components/main.vue'
import CommentEdit from './components/commentEdit.vue'

export default {
  data() {
    return {
      artileContent: {},
      num: 0,
      collected: false,
      newObj: {}
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
        this.$toast.success({
          message: '收藏成功',
          duration: 500
        })
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
        this.$toast.success({
          message: '取消收藏',
          duration: 500
        })

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
    }
  },
  components: { Main, CommentEdit },
  watch: {
    artileContent(newValue) {
      this.collected = newValue.is_collected
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  :deep(.van-nav-bar__content) {
    background-color: #3296fa;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
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
</style>
