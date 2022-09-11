import request from '@/utils/request'

// 获取用户频道列表

export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
