
import axios from "axios";
import { message,  } from 'antd';
import { getInfo } from "../api";
const service = axios.create(
   { baseURL:'http://47.98.219.152:3000'}
)



service.interceptors.request.use(config=>{
    if(sessionStorage.getItem("token")){
        config.headers["Authorization"]=`Bearer ${sessionStorage.getItem("token")}`
    }
    return config

})

service.interceptors.response.use((response)=>{
    if(response.status===401){
        sessionStorage.clear('token');
        this.forceUpdate()
    }
    
    else if(response.data.code==-1){
        message.error(response.data.msg || "操作失败" );
        return Promise.reject(response.data.msg || "操作失败" )
    }
    return response.data
})

export default service