<template>
  <div>
    <!-- 没有图片 -->
    <van-cell :title="item.title" :label="label" v-if="item.cover.type === 0" />
    <!-- 一张图片 -->

    <van-cell
      :title="item.title"
      :label="label"
      v-else-if="item.cover.type === 1"
    >
      <van-image :src="item.cover.images[0]"></van-image>
    </van-cell>
    <!-- 三张图片 -->

    <van-cell title="单元格" value="内容" v-else>
      <template #label>
        <van-image
          v-for="(item, index) in item.cover.images"
          :key="index"
          :src="item"
        ></van-image>
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
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
      return `${aut_name} ${comm_count}评论 ${pubdate}`
    }
  }
}
</script>

<style></style>
