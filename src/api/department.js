import request from '@/utils/request'

export function getDePartment() {
  return request({
    url: '/company/department',
    method: 'GET',
  })

}

// 根据Id删除部门
export function delDePartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete',
  })

}


// 新增
export function addDePartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })

}
