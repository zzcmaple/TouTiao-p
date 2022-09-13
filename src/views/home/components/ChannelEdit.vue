<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button class="btn" round size="mini" @click="isEdit = !isEdit">{{
        isEdit ? '完成' : '编辑'
      }}</van-button>
    </van-cell>

    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="(item, index) in myChannel"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :key="item.id"
          :text="item.name"
          :class="{ active: item.name === '推荐' }"
          @click="handleMyChannels(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 频道推荐 -->
    <van-cell title="频道推荐"> </van-cell>

    <div class="recommend-pannel">
      <van-grid gutter="15" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
        >
          <template #icon>
            <van-icon name="plus" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
// 引入请求
import { getAllChannelAPI } from '@/api'
export default {
  props: {
    myChannel: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  methods: {
    // 请求所有频道列表方法
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      this.allChannels = data.data.channels
    },
    handleMyChannels(item, index) {
      if (this.isEdit && item.name !== '推荐') {
        console.log('删除频道')
      } else {
        this.$emit('update:active', index)
        this.$emit('update:show', false)
      }
    }
  },
  created() {
    // 调用请求所有频道列表方法
    this.getAllChannel()
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return this.myChannel.every((item1) => {
          return item.id !== item1.id
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 93px;
}
.btn {
  width: 100px;
  color: red;
  border-color: red;
  line-height: 100%;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
:deep(.active .van-grid-item__text) {
  color: red;
}
</style>
