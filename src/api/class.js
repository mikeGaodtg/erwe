import request from '../utils/request'

export function getClass() {
    return request({
        url: '/class/classList',
        method: 'post',
    })
}

export function addClass(data) {
    return request({
        url: '/class/addClass',
        method: 'post',
        data
    })
}

export function deleteClass(data) {
    return request({
        url: '/class/deleteClass',
        method: 'post',
        data
    })
}