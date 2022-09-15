<template>
  <div>
    <van-cell
      icon="search"
      @click="$emit('changeKeywords', suggestionList[index])"
      v-for="(item, index) in highLight"
      :key="index"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      suggestionList: []
    }
  },
  methods: {
    getSearchSuggestions: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        this.suggestionList = data.data.options.filter((item) => Boolean(item))
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          this.$toast.fail('搜索失败，刷新试试')
        }
      }
    }, 500)
  },
  computed: {
    highLight() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestionList.map((item) => {
        return item.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  watch: {
    keywords: {
      handler() {
        this.getSearchSuggestions()
      },
      immediate: true
    }
  }
}
</script>

<style></style>
