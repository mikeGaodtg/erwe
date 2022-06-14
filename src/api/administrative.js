// 地址：/user/getUserList，

// 方式：get，

// 参数：无
import request from '../utils/request'

export function apiUserlist() {
    return request({
        url: '/user/getUserList',
        method: 'get',
    })
}
export function changeRole(data) {
    return request({
      url: '/user/changeRole',
      method: 'post',
      data
    })
  }