<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!--底部导航区域-->
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <span class="toutiao toutiao-shouye"></span>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="toutiao toutiao-shipin"></span>
        </template>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="toutiao toutiao-wenda"></span>
        </template>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <span class="toutiao toutiao-wode"></span>
        </template>
        <span>{{ $store.getters.isLogin ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
span {
  font-size: 27px;
}
</style>
