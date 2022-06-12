import request from '../utils/request'
export function examList(data) {
    return request({
        url: '/student/exam',
        method: 'post',
        data
    })
}