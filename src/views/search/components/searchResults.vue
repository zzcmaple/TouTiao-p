<template>
  <div>
    <van-list
      v-model="loading"
      @load="getResults"
      finished-text="没有更多数据啦"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      class="main"
    >
      <van-cell
        :title="item.title"
        v-for="item in results"
        :key="item.art_id"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      results: [],
      page: 1,
      per_page: 10,
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        const { data } = await getResultsAPI(
          this.page++,
          this.per_page,
          this.keywords
        )
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
