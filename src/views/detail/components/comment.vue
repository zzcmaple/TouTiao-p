<template>
  <div>
    <van-cell
      v-for="item in articleComment.results"
      :key="item.com_id"
      :title="item.aut_name"
    >
      <van-icon name="good-job-o" /><span class="awesome">赞</span>
      <template #icon>
        <van-image
          class="photo"
          :src="item.aut_photo"
          round
          width="35"
          height="35"
        ></van-image>
      </template>
      <template #label>
        <div class="commentInfo">{{ item.content }}</div>
        <div class="time">
          <span>{{ time(item.pubdate) }}</span>
          <van-button type="default" round
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleComment: {
      type: Object,
      required: true
    }
  },
  methods: {
    time(item) {
      return dayjs(item).fromNow()
    }
  }
}
</script>

<style scoped>
.awesome {
  color: #333;
  margin-left: 20px;
  font-size: 12px;
}
:deep(.van-cell__title) {
  color: #406599;
  font-size: 28px;
}
.photo {
  margin-right: 20px;
}
.commentInfo {
  font-size: 32px;
  margin: 20px 0;
}
:deep(.van-cell__label) {
  color: #333;
}
.time {
  display: flex;
}
:deep(.van-button) {
  width: 132px;
  height: 38px;
  margin-left: 20px;
  font-size: 12px;
  line-height: 38px;
}
</style>
