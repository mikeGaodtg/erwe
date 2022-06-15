import React, { Component } from 'react'
import { Card } from 'antd'
import { Button, Dropdown, Menu, Space, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import style from './info.module.css'
import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
const { Option } = Select;

export default class info extends Component {
  state={
    vis:'none'
  }
  toggleVis=(a)=>{
    this.setState(pre=>{
      vis
    })
  }
  render() {
    const {vis}=this.state
    return (
      <div className='wrap'>
        <Card className='mt'>
          <Form
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
          >
            <Row>
              <Col span={6} className='h32'>
                <Form.Item

                  label="Username"
                  name="username"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item

                  label="Username"
                  name="username"
                >
                  <Select
                    defaultValue="lucy"
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Select
                    defaultValue="lucy"
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2} className='h32 '>
                <a onClick={this.toggleVis} className='ml '>
               
                    Hover me
                    <DownOutlined />

                </a>
              </Col>
              <Col span={4} className='h32'>
                <div className={style.flexcenter}>
                  <Button type='primary'> search</Button>
                  <Button className='ml'>reset</Button>
                </div>

              </Col>
            </Row>
            <Row className='mt' style={{display:vis}}>
              <Col span={6} className='h32'>
                <Form.Item

                  label="Username"
                  name="username"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item

                  label="Username"
                  name="username"
                >
                  <Select
                    defaultValue="lucy"
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Select
                    defaultValue="lucy"
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>
        <Card className='mt'></Card>
        <Card className='mt'></Card>
      </div>
    )
  }
}
