import React, { Component } from 'react'
import { Steps, Card, Button, Descriptions } from 'antd';
const { Step } = Steps;
export default class solicitation extends Component {
  goIntent = () => {
    this.props.history.push('/index/admissions/intentional')
  }
  renderinfo = (params) => {
    return params.map(item => {
      return (
        <Card className='mt'>
          <Descriptions title={item.title}>
            <Descriptions.Item label="UserName">{item.name}</Descriptions.Item>
            <Descriptions.Item label="Telephone">{item.tel}</Descriptions.Item>
            <Descriptions.Item label="Live">{item.city}</Descriptions.Item>
            <Descriptions.Item label="Remark">{item.remark}</Descriptions.Item>
            <Descriptions.Item label="Address">
              {item.address}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )
    })
  }
  render() {
    const list = [
      {
        title: "parent info",
        name: "jack ma",
        tel: "111",
        city: "vegas",
        remark: "haha",
        address: "10 longbay road",

      },
      {
        title: "parent info",
        name: "jack ma",
        tel: "111",
        city: "vegas",
        remark: "haha",
        address: "10 longbay road",

      },
      {
        title: "parent info",
        name: "jack ma",
        tel: "111",
        city: "vegas",
        remark: "haha",
        address: "10 longbay road",

      },
      {
        title: "parent info",
        name: "jack ma",
        tel: "111",
        city: "vegas",
        remark: "haha",
        address: "10 longbay road",

      },
    ]
    return (
      <div>
        <div className='wrap'>
          <Card className='mt'>
            <Steps current={1}>
              <Step title="Finished" description="This is a description." />
              <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </Card>
        <div>{this.renderinfo(list)}</div>
          <Card className='mt'>
            <Button type='danger' onClick={this.goIntent}>return</Button>
          </Card>
        </div>
      </div>
    )
  }
}
