import React, { Component } from 'react'
import './App.css'
import { Switch,Route,Redirect,BrowserRouter} from 'react-router-dom';
import Login from './views/Login/Index';
import Layout from './views/Layout/Index';
import { authLogin } from './utils/auth';



export default class App extends Component {
  render() {


    return (
      <div>
         <BrowserRouter>
         <Switch>
         <Route path="/edu-management" exact render={(props)=>{
           return <Redirect to='edu-management/login'></Redirect>
        }}  ></Route>
         <Route path='/edu-management/index' render={(props)=>{
           if(authLogin()){
            return <Layout {...props}></Layout>
           }return <Redirect to='/edu-management/login' ></Redirect>
        
        }} ></Route>
         <Route path='/edu-management/login'  render={(props)=>{
           if(!authLogin()){
            return <Login {...props}></Login>
           }return <Redirect to='/edu-management/index/home' ></Redirect>
        
        }} ></Route>
         </Switch>
      
         </BrowserRouter>
      </div>
    )
  }
}
