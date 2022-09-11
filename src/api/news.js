import request from '@/utils/request'

// 获取新闻列表
export const getArticlesAPI = (id, date) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp: date
    }
  })
}
