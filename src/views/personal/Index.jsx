import React, { Component } from 'react'
import { Layout } from 'antd';
import style from './personal.module.css';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { getInfo } from '../../api';
import { loginAction } from '../../redux/action/loginAction';



 class personal extends Component {
  timer =null
  timeOfDay = () => {
    var myDate = new Date();
    var currentHour = myDate.getHours();
    var msg;
    if (currentHour < 12)
      msg = 'Good Morning';
    else if (currentHour == 12)
      msg = 'Good Noon';
    else if (currentHour >= 12 && currentHour <= 17)
      msg = 'Good Afternoon';
    else if (currentHour >= 17 && currentHour <= 24)
      msg = 'Good Evening';
    return msg
  }
  greeting = (time) => {
    if (time == 'Good Morning') {
      return 'wish you have a exciting day'
    }
    else if (time == 'Good Noon') {
      return 'what is your lunch today?'
    }
    else if (time == 'Good Afternoon') {
      return 'ready to home?'
    }
    else if (time == 'Good Evening') {
      return 'have a good sleep'
    }
  }
  // checkLoginReducer=()=>{
  //   if (this.props.res.loginReducer.length){
  //     getInfo().then(res=>{
  //       console.log(11,res)
  //       this.props.loginAction({role:res.role,nickname:res.nickname})
  //     })
  //   }
  // }
  countdown(){
  var countDownDate = new Date("Jan 5, 2023 15:37:25").getTime();

  // Update the count down every 1 second
   this.timer = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"

  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";


  // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(this.timer);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
  clearTimer(){
    clearInterval(this.timer);
    this.timer =null;
  }
  componentDidMount(){
    // this.checkLoginReducer()
    console.log('component did mount')
    this.countdown()

  }
  componentWillMount(){
 
  }
  componentWillUnmount(){
    this.clearTimer()
  }
  render() {
     const {nickname}=this.props.res.loginReducer
    return (
      <div>
        <Card className={style.card}>
          <h1>{`${this.timeOfDay()}! ${nickname} ,${this.greeting(this.timeOfDay())}`}</h1>
        </Card>
        <Card className={style.card}>
          <span className={style.red}>ONLY&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span id='demo' className={style.timer}></span>
          <span className={style.red}> &nbsp;&nbsp;&nbsp;&nbsp;To Final Exam</span>
        </Card>
        <Card className={style.card}>
<h1></h1>
        </Card>
      </div>
    )
  }
}
export default connect(
  state => ({ res: state }),{loginAction}
)(personal)