import request from '../utils/request'

export function intentList() {
    return request({
        url: '/student/studentList',
        method: 'post',
    })
}
