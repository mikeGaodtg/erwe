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
         <Route path="/" exact render={(props)=>{
           return <Redirect to='/login'></Redirect>
        }}  ></Route>
         <Route path='/index' render={(props)=>{
           if(authLogin()){
            return <Layout {...props}></Layout>
           }return <Redirect to='/login' ></Redirect>
        
        }} ></Route>
         <Route path='/login'  render={(props)=>{
           if(!authLogin()){
            return <Login {...props}></Login>
           }return <Redirect to='/index/home' ></Redirect>
        
        }} ></Route>
         </Switch>
      
         </BrowserRouter>
      </div>
    )
  }
}
