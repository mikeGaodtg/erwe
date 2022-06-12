import React, { Component } from 'react'
import { Layout } from 'antd';
import style from './personal.module.css';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { getInfo } from '../../api';
import { loginAction } from '../../redux/action/loginAction';
import Calendar from '../../component/calender/Index';
import { Col, Row, Statistic } from 'antd';
const { Countdown } = Statistic;

class personal extends Component {

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

  

  onFinish = () => {
    console.log('finished!');
  };

  onChange = (val) => {
    if (4.95 * 1000 < val && val < 5 * 1000) {
      console.log('changed!');
    }
  };

  render() {
    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
    const { nickname } = this.props.res.loginReducer
    return (
      <div>
        <Card className={style.card}>
          <h1>{`${this.timeOfDay()}! ${nickname} ,${this.greeting(this.timeOfDay())}`}</h1>
        </Card>
        <Card className={style.card}>
          <Row gutter={16}>
            <Col span={12}>
              <Countdown title="Countdown" value={deadline} onFinish={this.onFinish} />
            </Col>
            <Col span={12}>
              <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
            </Col>
            <Col
              span={24}
              style={{
                marginTop: 32,
              }}
            >
              <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
            </Col>
            <Col span={12}>
              <Countdown title="Countdown" value={Date.now() + 10 * 1000} onChange={this.onChange} />
            </Col>
          </Row>
        </Card>
        <Card className={style.card}>
          <Calendar></Calendar>
        </Card>
      </div>
    )
  }
}
export default connect(
  state => ({ res: state }), { loginAction }
)(personal)