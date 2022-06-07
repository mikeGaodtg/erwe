import React, { Component } from 'react'
import { Card } from 'antd';
import { Tabs } from 'antd';
import style from './home.module.css'
import { Row, Col } from 'antd';
import * as echarts from 'echarts';
import { Timeline } from 'antd';
const { TabPane } = Tabs;
export default class home extends Component {
  state = {


    list: [
      {
        cont: "王刚结算了一门课程",
        time: "操作时间 2020-09-18",
        color: "red"
      },
      {
        cont: "王刚新增了一名学员",
        time: "操作时间 2020-09-18",
        color: "blue"
      },
      {
        cont: "李梦如删除了排课记录",
        time: "操作时间 2020-09-20",
        color: "yellow"
      },
      {
        cont: "王刚结算了一门课程",
        time: "操作时间 2020-09-18",
        color: "green"
      },
    ]

  }
  useCharts = (ref, type) => {
    var myChart = echarts.init(ref);
    myChart.setOption(
      {
        title: {
          text: 'Goods Sales'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type,
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    );
  }
  renderTimeline = (a) => {
    return a.map((item, index) => {
      return (<Timeline.Item key={index} color={item.color}>
        <p>{item.cont}</p>
        <p>{item.time}</p>
      </Timeline.Item>
      )
    })
  }
  callback = (activeKey) => {
    if (activeKey == 2) {
      setTimeout(() => this.useCharts(this.myRef3, 'line'), 0)
    }
  }
  componentDidMount() {
    this.useCharts(this.myRef, 'bar');
    this.useCharts(this.myRef2, 'pie');
  }
  render() {

    return (
      <div>
        <Card className={style.wrap}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="sales" key="1" >
              <Row>
                <Col span={16}>
                  <div className={style.graph} ref={a => this.myRef = a} ></div>
                </Col>
                <Col span={8}>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="visit" key="2" >
              <div className={style.graph} ref={a => this.myRef3 = a} ></div>
            </TabPane>
          </Tabs>
        </Card>
        <div className={style.wrap}>
          <Row gutter={16} >
            <Col span={12}>
              <Card >
                <div className={style.graph} >
                  <Timeline>
                    {
                      this.renderTimeline(this.state.list)
                    }
                  </Timeline>
                </div>
              </Card>
            </Col>
            <Col span={12} >
              <Card>
                <div ref={a => this.myRef2 = a} className={style.graph}></div>
              </Card>
            </Col>
          </Row>
        </div>


      </div>
    )
  }
}
