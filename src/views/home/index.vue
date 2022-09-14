<template>
  <div>
    <!-- 顶部搜索 -->
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-button
          :border="false"
          type="default"
          size="small"
          round
          icon="search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active" :swipeable="true">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <article-list-vue :id="item.id"></article-list-vue>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="show = true"></span>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
      ><channel-edit-vue
        v-if="show"
        :myChannel="channels"
        :active.sync="active"
        :show.sync="show"
        @delchannel="delchannel"
        @addchannel="addchannel"
      ></channel-edit-vue>
    </van-popup>
  </div>
</template>

<script>
import ChannelEditVue from './components/ChannelEdit.vue'
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import articleListVue from './components/articleList.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  components: {
    articleListVue,
    ChannelEditVue
  },
  data() {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  created() {
    this.initChannels()
  },
  methods: {
    ...mapMutations(['SET_MYCHANNELS']),
    // 请求 用户频道接口
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          error.response.status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    async delchannel(id) {
      const newChannels = this.channels.filter((item) => {
        return item.id !== id
      })
      try {
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 我的频道放到本地存储
          this.SET_MYCHANNELS(newChannels)
        }
        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户登陆失效，请重新登录')
        } else {
          throw error
        }
      }
    },
    async addchannel(item) {
      const newChannels = [...this.channels, item]
      try {
        if (this.isLogin) {
          await addChannelAPI(item.id, this.channels.length)
        } else {
          // 我的频道放到本地存储
          this.SET_MYCHANNELS(newChannels)
        }
        this.channels.push(item)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户登陆失效，请重新登录')
        } else {
          throw error
        }
      }
    },
    initChannels() {
      if (this.isLogin) {
        this.getChannel()
      } else {
        if (this.myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = this.myChannels
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['myChannels'])
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #1989fa;
  .van-button--default {
    width: 7.4rem;
  }
  :deep(.van-nav-bar__title) {
    max-width: none;
  }
  :deep(.van-button--default) {
    background-color: #5babfb;
    border: 0;
  }
}
/* tabs导航条样式 */
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
