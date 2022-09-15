import request from '@/utils/request'

// 根据关键词请求数据
export const getSearchSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果 具有分页功能
export const getResultsAPI = (/* eslint-disable-line*/ page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
