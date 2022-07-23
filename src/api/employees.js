import request from '@/utils/request'



// 获取员工列表

export function getEmployeeList(params) {
  // 返回一个axios对象
  return request({
    url: '/sys/user',
    method: 'get',
    params
  })
}


// 新增员工
export function addEmployees(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })

}


// 批量导入员工数据
export function importEmployees(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data //data是一个数组类型

  })
}
