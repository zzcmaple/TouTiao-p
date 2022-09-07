import { request } from '@/utils/request'
/**
 * 登录请求
 * @param {*} mobile 手机号
 * @param {*} code  验证码
 * @returns Promise对象
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}
// 发送验证码
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
