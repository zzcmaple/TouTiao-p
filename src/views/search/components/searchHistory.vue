<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <div v-if="isEdit">
          <span @click="$store.commit('SET_HISTORY', [])">全部删除</span> &nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
        <van-icon v-else name="delete-o" @click="isEdit = true" />
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in history"
      :key="index"
      @click="!isEdit && $emit('changeKeywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEdit"
          @click="
            $store.commit(
              'SET_HISTORY',
              history.filter((i) => i !== item)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['history'])
  }
}
</script>

<style></style>
