<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        :show-action="true"
        background="#3396fc"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onFocus"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 显示组件 -->
    <component
      :is="componentId"
      @changeKeywords="onSearch"
      :keywords="keywords"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/searchHistory.vue'
import SearchResults from './components/searchResults.vue'
import SearchSuggestion from './components/searchSuggestion.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: { SearchHistory, SearchResults, SearchSuggestion },
  data() {
    return {
      keywords: '',
      isShowResults: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORY']),
    onSearch(keywords) {
      const distinctHistory = [...new Set([keywords, ...this.history])]
      this.SET_HISTORY(distinctHistory)
      this.keywords = keywords
      this.isShowResults = true
    },
    onFocus() {
      this.isShowResults = false
    }
  },
  computed: {
    componentId() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowResults) {
        return 'SearchResults'
      }
      return 'SearchSuggestion'
    },
    ...mapState(['history'])
  },
  watch: {
    keywords() {}
  }
}
</script>
SearchHistory

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
