<template>
  <div
    @click="
      $router.push({
        path: `/detail?articleId=${item.art_id}`
      })
    "
  >
    <!-- 没有图片 -->
    <van-cell :title="item.title" :label="label" v-if="item.cover.type === 0" />
    <!-- 一张图片 -->
    <van-cell
      :title="item.title"
      :label="label"
      v-else-if="item.cover.type === 1"
    >
      <van-image
        :src="item.cover.images[0]"
        width="115"
        height="73"
      ></van-image>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell :title="item.title" v-else>
      <template #label>
        <van-image
          v-for="(item, index) in item.cover.images"
          :key="index"
          :src="item"
          width="100"
          height="100"
        ></van-image>
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'item',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    label() {
      /* eslint-disable */
      const { aut_name, comm_count, pubdate } = this.item
      return `${aut_name} ${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-cell__label) {
  display: flex;
  flex-wrap: wrap;
  :deep(.van-image) {
    flex: 33.3333%;
  }
}
</style>
