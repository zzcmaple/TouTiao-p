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

// 获取新闻详情文章

export const getNewArticleAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

// 收藏文章
export const favoriteArticlesAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消收藏文章

export const unfavoriteArticleAPI = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}
