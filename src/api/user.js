import request from '@/utils/request'
// import store from '@/store/index'
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

// 获取用户信息
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.token.token}`
    // }
  })
}

// 更新用户头像

export const updatePhotoAPI = (file) => {
  const fd = new FormData()
  fd.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fd
  })
}

// 获取用户详细资料

export const getUserDeInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑用户详细资料
export const updateUserInfoAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 关注用户
export const followUsersAPI = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消关注

export const unsubscribeAPI = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}
