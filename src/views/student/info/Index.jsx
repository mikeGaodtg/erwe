import React, { Component } from 'react'
import { Card } from 'antd'
import { Button, Table, Form, Input ,Pagination} from 'antd';
import { Col, Row } from 'antd';
import style from './info.module.css'
import { Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { studentList } from '../../../api/student';
import { deleteStudent } from '../../../api/student';
const { Option } = Select;

export default class info extends Component {
  state = {
    vis: 'none',
    data:[],
    total:0,
    pageData:{
      page:1,
      pageSize:10
    },
    formData:{
      name: "", //姓名
        subject: "", //学科
        grade: "", //年级
        type: "", //班型
        headTeacher: "", //班主任
        parent: "", //家长姓名
        campus: "", //校区
    }
  }
  toggleVis = () => {
    if (this.state.vis == 'none') {
      this.setState({ vis: 'flex' })
    } else {
      this.setState({ vis: 'none' })
    }
  }

  renderDrop = () => {
    if (this.state.vis=='none') {
      return <a onClick={this.toggleVis} className='ml'>
        Expand
        <DownOutlined />
      </a>
    }
    return <a onClick={this.toggleVis} className='ml'>
      close
      <UpOutlined />
    </a>
  }
  pageChange(page, pageSize) {
    this.state.pageData = { page, pageSize };
    this.loadData();

  }
  loadData=()=>{
    const {formData,pageData,}=this.state
    studentList({...formData,...pageData}).then(res=>{
      this.setState({
        total:res.total,
        data:res.data
      })
    })
  }
  search=()=>{
    const formValue = this.formRef.getFieldValue(false);
    this.setState({
      formData:formValue,
      pageData:{
        page:1,
        pageSize:10
      },
    },()=>{
      this.loadData()
    })
  }
  componentDidMount(){
    this.loadData()
  }
  render() {
    const { vis,total } = this.state
    const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 80,
      render: (text, record, index) => `${index + 1}`,
    },
    { title: "姓名", dataIndex: "name", key: "name", width: 80 },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
      width: 100,
    },
    { title: "科目", dataIndex: "subject", key: "4", width: 100 },
    {
      title: "班型",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (text) => {
        if (text == 1) {
          return "一对一";
        } else if (text == 2) {
          return "小班";
        } else if (text == 3) {
          return "大班";
        } else {
          return "精英班";
        }
      },
    },
    { title: "家长姓名", dataIndex: "parentname", key: "parentname", width: 100 },
    { title: "家长电话", dataIndex: "parenttel", key: "parenttel", width: 180 },
    {
      title: "班主任姓名",
      dataIndex: "classteacher",
      key: "classteacher",
      width: 120,
    },
    {
      title: "校区",
      dataIndex: "campus",
      key: "campus",
      width: 100,
      render(text) {
        if (text == 1) {
          return "中心校区";
        } else if (text == 2) {
          return "顺义校区";
        } else if (text == 3) {
          return "昌平校区";
        } else {
          return "大兴校区";
        }
      },
    },
    {
      title: "剩余课时",
      dataIndex: "percent",
      key: "percent",
      width: 150,
      scopedSlots: { customRender: "percent" },
    },
    { title: "已缴费用", dataIndex: "charge", key: "charge", width: 100 },
    {
      title: "课程有效期",
      dataIndex: "validperiod",
      key: "validperiod",
      width: 150,
    },
    { title: "课程顾问", dataIndex: "consultant", key: "consultant", width: 100 },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 150,
    },
  ];
    return (
      <div className='wrap'>
        <Card className='mt'>
          <Form
          ref={a=>this.formRef=a}
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
                  name="name"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item

                  label="subject"
                  name="subject"
                >
                  <Select
            
                  >
                    <Option value="1">all</Option>
                    <Option value="2">math</Option>
                    <Option value="3" >
                     english
                    </Option>
                    <Option value="4">history</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item
                  label="type"
                  name="type"
                >
                  <Select
                
                  >
                    <Option value="1">1 2 1</Option>
                    <Option value="2">big</Option>
                    <Option value="3" >
                     big
                    </Option>
                    <Option value="4">small</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2} className='h32 '>
                {this.renderDrop()}
              </Col>
              <Col span={4} className='h32'>
                <div className={style.flexcenter}>
                  <Button type='primary' onClick={this.search}> search</Button>
                  <Button className='ml'>reset</Button>
                </div>

              </Col>
            </Row>
            <Row className='mt'
              style={{ display: vis }}
            >
              <Col span={6} className='h32'>
                <Form.Item

                  label="headTeacher"
                  name="headTeacher"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item

                  label="parent"
                  name="parent"
                >
                  <Select
        
                  >
                    <Option value="1">Jack</Option>
                    <Option value="2">Lucy</Option>
                    <Option value="3" disabled>
                      Disabled
                    </Option>
                    <Option value="4">yiminghe</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} className='h32'>
                <Form.Item
                  label="campus"
                  name="campus"
                >
                  <Select
            
                  >
                    <Option value="1">Jack</Option>
                    <Option value="2">Lucy</Option>
                    <Option value="3" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Card>
        <Card className='mt'>
        <Button type='primary'> all</Button>
                  <Button className='ml'>HMT </Button>
                  <Button className='ml'>AKL </Button>
                  <Button className='ml'>WELT</Button>
                  <Button className='ml'>QST</Button>
        </Card>
        <Card className='mt'>
        <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={this.state.data}
              pagination={false}
            />
                   <Pagination
            className='mt'
            total={total}
            showQuickJumper
            showSizeChanger
           onChange={this.pageChange} 
          />
          </Card>
       
      </div>
    )
  }
}
