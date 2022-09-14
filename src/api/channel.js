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

// 删除指定用户频道

export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

// 新增用户频道
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
