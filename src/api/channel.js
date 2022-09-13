import request from '@/utils/request'

// 获取用户频道列表

export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道列表

export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
