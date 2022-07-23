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


// 根据ID更新角色  编辑角色
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

//根据ID获取角色详情
export function getRoleDetails(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}


//新增角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
