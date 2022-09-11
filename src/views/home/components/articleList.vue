<template>
  <div>
    <article-item-vue
      v-for="item in article"
      :key="item.art_id"
      :item="item"
    ></article-item-vue>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import articleItemVue from './articleItem.vue'
export default {
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
      article: []
    }
  },
  methods: {
    async getFirstArticles() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        this.article = data.data.results
      } catch (error) {
        if (!error.response || error.message?.status === 507) {
          throw error
        } else if (error.response?.status === 400) {
          throw new Error(error.response.data.message)
        }
      }
    }
  },
  created() {
    this.getFirstArticles()
  }
}
</script>

<style></style>
