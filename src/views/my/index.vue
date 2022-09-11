<template>
  <div class="bgc">
    <!-- 头部-->
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row type="flex" align="center">
          <van-col span="12">
            <van-row type="flex" align="center">
              <van-col span="11">
                <van-image
                  round
                  width="1.5rem"
                  height="1.5rem"
                  :src="userInfo.photo"
                />
              </van-col>
              <van-col span="13"> {{ userInfo.name }} </van-col>
            </van-row>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="6">
            <van-row type="flex" justify="center">
              <van-button size="mini" round>编辑资料</van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false">
            <van-grid-item icon="photo-o" text="头条">
              <template #icon>{{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="粉丝">
              <template #icon>{{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="关注">
              <template #icon>{{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="获赞">
              <template #icon>{{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image round width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" :border="false" clickable>
        <van-grid-item icon="photo-o" text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang" style="color: red"></span>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi" style="color: orange"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 退出按钮 -->
    <footer>
      <van-button block v-if="isLogin" @click="back" color="red"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  methods: {
    async back() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('登陆失败')
        } else {
          throw error
        }
      }
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
.link {
  margin: 15px 0;
}
.toutiao {
  font-size: 35px;
}
.bgc {
  height: 100vh;
  background-color: #eee;
}
.banner {
  width: 100%;
  height: 5.33rem;
  background: url('@/assets/images/banner.png') no-repeat;
  background-size: cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 30px;
  color: #fff;
  margin-top: 15px;
}
.login {
  display: flex;
  flex-direction: column;
  font-size: 28px;
  color: #fff;
  > .van-row {
    flex: 1;
  }
  :deep(.van-grid-item__content) {
    background-color: inherit;
    font-size: 30px;
    color: #fff;
  }
  :deep(.van-grid-item__text) {
    color: #fff;
  }
}
</style>
