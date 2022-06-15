import request from '../utils/request'
export function examList(data) {
    return request({
        url: '/student/exam',
        method: 'post',
        data
    })
}
//正式学员列表
export function studentList(data) {
    return request({
        url: '/student/formalStudents',
        method: 'post',
        data
    })
}
//删除学员
export function deleteStudent(data) {
    return request({
        url: '/student/deleteStudent',
        method: 'post',
        data
    })
}