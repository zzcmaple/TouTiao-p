<template>
  <div class="commentBar">
    <van-nav-bar
      :title="
        replayList.length === 0 ? '暂无回复' : `${replayList.length}条回复`
      "
      left-arrow
      @click-left="back"
    />
    <div class="replay">
      <van-cell :title="currentComment.aut_name">
        <van-icon name="good-job-o" /><span class="awesome">赞</span>
        <template #icon>
          <van-image
            class="photo"
            :src="currentComment.aut_photo"
            round
            width="35"
            height="35"
          ></van-image>
        </template>
        <template #label>
          <div class="commentInfo">{{ currentComment.content }}</div>
          <div class="time">
            <span>{{ time(currentComment.pubdate) }}</span>
            <van-button type="default" round
              >回复{{ replayList.length }}</van-button
            >
          </div>
        </template>
      </van-cell>
      <van-nav-bar left-text="全部回复" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        offset="300"
        :immediate-check="false"
      >
        <van-cell
          v-for="item in replayList"
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
      </van-list>
    </div>
    <div class="postReplay">
      <van-button
        block
        round
        class="btn"
        @click="$refs.Edit.showMessageBoard = true"
        >评论</van-button
      >
    </div>
    <commentEdit
      :id="currentComment.com_id"
      :art_id="$route.query.articleId"
      :newObj="newObj"
      @newObj="newObj = $event"
      ref="Edit"
    ></commentEdit>
  </div>
</template>

<script>
import commentEdit from './commentEdit.vue'
import dayjs from '@/utils/dayjs'
export default {
  props: {
    replayList: {
      type: Array,
      required: true
    },
    end_id: {
      type: [String, Number],
      required: true
    },
    currentComment: {
      type: Object,
      required: true
    }
  },
  components: { commentEdit },
  data() {
    return {
      finished: false,
      error: false,
      loading: false,
      newObj: {}
    }
  },
  methods: {
    onLoad() {
      this.$emit('getReplayList')
    },
    time(item) {
      return dayjs(item).fromNow()
    },
    back() {
      this.$emit('colseReplayComment')
      this.$emit('updateResults', this.replayList.length)
    }
  },
  watch: {
    newObj(newValue) {
      this.$emit('changeList', newValue)
    }
  }
}
</script>

<style scoped lang="less">
.commentBar {
  .replay {
    height: calc(100vh - 192px);
    overflow: auto;
  }
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
  :deep(.van-icon-arrow-left) {
    color: #333;
  }
  .postReplay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-color: #ff69b4;
    :deep(.btn) {
      width: 80%;
      height: 80px;
      font-size: 30px;
    }
  }
}
</style>
