import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  // 返回一个axios对象
  return request({
    url: '/sys/role',
    method: "get",
    params
  })
}

// 根据id删除角色
export function delRoleById(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
