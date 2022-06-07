
import request from '../utils/request'
// use for login 
export function login(data){
  return request({
       url:'/user/login',
       method:'post',
       data
       
   })
}

// use token to get user authorization
export function getInfo(){
  return request({
       url:'/user/getinfo',
       method:'get',
       
   })
}
export function addTeacher(data) {
  return request({
      url: '/teacher/addTeacher',
      method: 'post',
      data
  })
}