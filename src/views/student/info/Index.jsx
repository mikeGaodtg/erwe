import React, { Component } from 'react'
import { Card } from 'antd'
export default class info extends Component {
  render() {
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
            <Form.Item
              label="Username"
              name="username"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
          
            >
          <Input />
            </Form.Item>

      
          </Form>
        </Card>
        <Card className='mt'></Card>
        <Card className='mt'></Card>
      </div>
    )
  }
}
