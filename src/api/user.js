import request from '@/utils/request'

export function login (data) {
  // 返回一个axios对象
  return request({
    url: '/sys/login',
    method: "post",
    data
 })
}

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/sys/profile',
    method: "post",
    data
 })

}


// 获取用户头像
export function getStaffPhoto(id){
  return request({
    url: ` /sys/user/${id}`,
 })

}

