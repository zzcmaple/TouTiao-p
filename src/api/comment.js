import request from '@/utils/request'

// 获取文章评论 或 对评论的回复

export const getCommentAPI = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}

// 对文章或者评论进行评论
/* eslint-disable */
export const postCommentAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
