import request from '@/utils/request'

// 用户登录拿到token
export function login(data) {
  return request({
    url: '/token',
    method: 'get',
    params: data
  })
}

// 获取token后permission拿到用户信息
export function getInfo() {
  return request({
    url: '/service',
    method: 'post',
    data: { cmd: 's0001' }
  })
}

// 用户登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
