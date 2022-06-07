import request from '../utils/request'
export function getTeacherList (data){
    return request({
        url:"/teacher/teacherList",
        method:'post',
        data
})
}
export function addTeacher(data) {
    return request({
        url: '/teacher/addTeacher',
        method: 'post',
        data
    })
}
/**
 * 编辑教师接口
 参数同新增教师 额外加id
 */
export function editTeacher(data) {
    return request({
        url: '/teacher/editTeacher',
        method: 'post',
        data
    })
}
/**
 * 删除单个教师接口
 * id:id
 */
export function deletesOne(data) {
    return request({
        url: '/teacher/delete',
        method: 'post',
        data
    })
}
/**
 * 批量删除
 * ids:[id数组]
 */

export function batchDelete(data) {
    return request({
        url: '/teacher/batchDelete',
        method: 'post',
        data
    })
}