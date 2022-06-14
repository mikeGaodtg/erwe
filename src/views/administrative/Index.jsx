import React, { Component } from 'react'
import { Button, Col, Space, Row, Table, Drawer, Radio, Card, } from 'antd';
import { apiUserlist, changeRole } from '../../api/administrative';
import { Badge, Descriptions } from 'antd';


export default class administrative extends Component {
  state = {
    data: [],
    visible: false,
    value: '',
    userinfo: {}
  }
  showDrawer = () => {

    this.setState({ visible: true });
  };

  onClose = () => {
    this.setState({ visible: false });
  };
  renderList = () => {
    apiUserlist().then(res => {
  
      this.setState({ data: res.data })
    })
  }
  onChange = (e) => {

    this.setState({ value: e.target.value },
     )


  };
  changeAuth = () => {
    const { value, userinfo } = this.state
    changeRole({ role: value, id: userinfo.id }).then(res => {
      this.renderList()
 
    })
    this.onClose()
  }
  componentDidMount() {
    this.renderList()
  }
  render() {
    const { visible, value } = this.state
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        align: "center",
        width: 80,
        render: (text, record, index) => {
          return index + 1
        }
      },
      {
        title: "手机号",
        dataIndex: "username",
        key: "username",
        align: "center",

      },
      {
        title: "昵称",
        dataIndex: "nickname",
        key: "nickname",
        align: "center",

      },
      {
        title: "角色",
        dataIndex: "role",
        key: "role",
        align: "center",
      },
      {
        title: "操作",
        dataIndex: "setRole",
        key: "setRole",
        align: "center",
        render: (text, record) => {

          return (
            <Button
              type='primary'
              onClick={() => {
                this.showDrawer()
                this.setState({ userinfo: record })
              }}
            >auth manage</Button>
          )
        }
      },
    ]
    return (
      <div>
        <div className='wrap'>
          <Row gutter={16}>
            <Col span={12}>
              <Table
                className='mt'
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={this.state.data}
                pagination={false}
              />
            </Col>
            <Col span={12}>
              <Card className='mt'>
                <Descriptions title="User Info" bordered>
                  <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                  <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                  <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                  <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                  <Descriptions.Item label="Usage Time" span={2}>
                    2019-04-24 18:00:00
                  </Descriptions.Item>
                  <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="Running" />
                  </Descriptions.Item>
                  <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                  <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                  <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                  <Descriptions.Item label="Config Info">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1<br />
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Drawer title="Authorization Managerment" placement="left" onClose={this.onClose} visible={visible}>
            <Radio.Group value={value} onChange={this.onChange} size='large'>
              <Space direction="vertical">
                <Radio value="admin">Boss</Radio>
                <Radio value="teacher">Teacher</Radio>
                <Radio value="manager">manager</Radio>
                <Button onClick={this.changeAuth}>OK</Button>
              </Space>
            </Radio.Group>
          </Drawer>
        </div>
      </div>
    )
  }
}
