<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      class="navBar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 头像栏 -->
    <div>
      <input type="file" hidden ref="file" @change="selectImg" />
      <van-cell title="头像" is-link @click=";[$refs.file.click()]">
        <van-image
          :src="photoNow || info.photo"
          round
          width="0.8rem"
          height="0.8rem"
        ></van-image>
      </van-cell>

      <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '100%' }"
      >
        <UpdateImg
          v-if="show"
          :photo="photo"
          :photoNow.sync="photoNow"
        ></UpdateImg>
      </van-popup>
    </div>
    <!-- 昵称栏 -->
    <div>
      <van-cell title="昵称" is-link @click="showName = true">
        <span>{{ info.name }}</span>
      </van-cell>
      <van-popup
        v-model="showName"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <UpdateName
          v-if="showName"
          @changeShow="showName = false"
          :info="info"
          :info-name.sync="info.name"
        ></UpdateName>
      </van-popup>
    </div>
    <!-- 性别栏 -->
    <div>
      <van-cell title="姓名" is-link @click="showGender = true">
        <span>{{ info.gender === 1 ? '女' : '男' }}</span>
      </van-cell>
      <van-popup
        v-model="showGender"
        position="bottom"
        :style="{ height: '45%' }"
      >
        <UpdateGender
          :info="info"
          @changeShow="showGender = false"
          :info-gender.sync="info.gender"
        ></UpdateGender>
      </van-popup>
    </div>
    <!-- 生日栏 -->
    <div>
      <van-cell title="生日" is-link @click="showBirthday = true">
        <span>{{ info.birthday }}</span>
      </van-cell>
      <van-popup
        v-model="showBirthday"
        position="bottom"
        :style="{ height: '45%' }"
      >
        <UpdateBirthday
          :info="info"
          @changeShow="showBirthday = false"
          :info-birthday.sync="info.birthday"
        ></UpdateBirthday>
      </van-popup>
    </div>
  </div>
</template>

<script>
import UpdateImg from './components/updateImg.vue'
import { resolveBase64 } from '@/utils/resolveBase64'
import { getUserDeInfoAPI } from '@/api'
import UpdateName from './components/updateName.vue'
import UpdateGender from './components/updateGender.vue'
import UpdateBirthday from './components/updateBirthday.vue'
export default {
  data() {
    return {
      show: false,
      photo: '',
      photoNow: '',
      info: {},
      showName: false,
      showGender: false,
      showBirthday: false
    }
  },
  created() {
    this.getUserDeInfo()
  },
  methods: {
    async selectImg() {
      const file = this.$refs.file.files[0]
      const base = await resolveBase64(file)
      this.photo = base
      this.show = true
      this.$refs.file.value = ''
    },
    async getUserDeInfo() {
      try {
        const data = await getUserDeInfoAPI()
        this.info = data.data.data
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('网络不太好，刷新试试')
        } else {
          throw error
        }
      }
    }
  },
  components: { UpdateImg, UpdateName, UpdateGender, UpdateBirthday }
}
</script>

<style scoped lang="less">
.navBar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
