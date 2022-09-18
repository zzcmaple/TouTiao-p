<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="加载刷败 点击刷新"
        finished-text="已经到底了"
        @load="getNextPageArticle"
        :immediate-check="false"
      >
        <article-item-vue
          v-for="item in article"
          :key="item.art_id"
          :item="item"
        ></article-item-vue>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import articleItemVue from './articleItem.vue'
export default {
  name: 'articlelist',
  components: {
    articleItemVue
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      article: [],
      preTimeStamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  methods: {
    async getFirstArticles() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        this.article = data.data.results
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        if (!error.response || error.message?.status === 507) {
          this.$toast.fail('刷新重试')
          throw error
        } else if (error.response?.status === 400) {
          this.$toast.fail('刷新重试')
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('登陆失败')
        }
      }
    },
    async getNextPageArticle() {
      try {
        const { data } = await getArticlesAPI(this.id, this.preTimeStamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        this.preTimeStamp = data.data.pre_timestamp
        if (this.loading) {
          this.article.push(...data.data.results)
        } else {
          this.article.unshift(...data.data.results)
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  },
  created() {
    this.getFirstArticles()
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 275px);
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: #333;
  }
  &::-webkit-scrollbar-thumb {
    background-color: yellow;
  }
}
</style>
