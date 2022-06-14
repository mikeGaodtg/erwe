import React, { Component } from 'react'
import { Card } from 'antd';
import style from './exam.module.css'
import { Col, Row } from 'antd';
import { Button, Form, Input } from 'antd';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { Table, Pagination } from 'antd';
import moment from 'moment';
import { examList } from '../../../api/student';
const { RangePicker } = DatePicker;
const { Option } = Select;
export default class exam extends Component {
  state = {
    data: [],

    loading: false,
    form: {
      name: "",
      type: "",
    },
    pageData: {
      page: 1,
      pageSize: 10,
    },
    total: 0
  }
  loadData = () => {
    this.setState({
      loading: true,
    }, () => {
        examList({ ...this.state.form, ...this.state.pageData }).then(res => {
          console.log(res)
          this.setState({
            loading: false,
            data: res.data,
            total: res.total
          })
        })
      }
    )
  }
  search = () => {
    const{ pageData} =this.state
    let formData = this.formRef.getFieldsValue(false);
    console.log(formData)
    let a = formData.data ? formData.data[0] : false
    let b = formData.data ? formData.data[1] : false
    let startDay = a ? moment(formData.data[0]).format("YYYY-MM-DD") : ''
    let endDay = b ? moment(formData.data[1]).format("YYYY-MM-DD") : ''
    delete formData.data
    examList({ ...formData,...pageData, startDay, endDay }).then(res => {
      console.log(res);
      this.setState({
        data: res.data,
        total: res.total
      })
    })
  }
  reset = () => {
    this.formRef.resetFields()
    this.loadData()
  }
  pageChange = (page, pageSize) => {
    
    this.setState({
      pageData: {
        page,
        pageSize
      }
    }, function () {
      this.loadData()
    })

  }
  componentDidMount() {
    this.loadData()
  }
  render() {
    const { loading, total } = this.state;
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
        title: "名称",
        dataIndex: "name",
        key: "name",
        align: "center",
        width: 80,
      },
      {
        title: "类别",
        dataIndex: "type",
        key: "type",
        align: "center",
        width: 100,

      },
      {
        title: "考试时间",
        dataIndex: "date",
        key: "date",
        align: "center",
        width: 100,
        render: (text) => {
          return moment(text).format("YYYY-MM-DD")
        }
      },
      {
        title: "科目",
        dataIndex: "subject",
        key: "subject",
        align: "center",
        width: 100,
      },
      {
        title: "成绩发布时间",
        dataIndex: "publishTime",
        key: "publishTime",
        align: "center",
        width: 100,
        render: (text, record, index) => {
          return moment(new Date()).format("YYYY-MM-DD")
        }
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
        align: "center",
        width: 120,
      },
      {
        title: "参与班级",
        dataIndex: "grade",
        key: "grade",
        align: "center",
        width: 150,
      },
    ];
    return (
      <div>
        <div className='wrap'>
          <p className={style.forp}>学生管理/考试管理</p>
          <Card>
            <Form
              ref={a => this.formRef = a}
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col className="gutter-row lh30" span={6}>
                  <div style={style}>
                    <Form.Item
                      className={style.inputw80}
                      label="Exam"
                      name="name"
                    >
                      <Input placeholder="Basic usage" />
                    </Form.Item>
                  </div>
                </Col>
                <Col className="gutter-row lh30" span={6}>
                  <div style={style}>
                    <Form.Item
                      label="Type"
                      name="type"
                      className={style.inputw80}
                    >
                      <Select  >
                        <Option value="">all</Option>
                        <Option value="1">final</Option>
                        <Option value="2">semi-final</Option>
                        <Option value="3">weekly</Option>
                        <Option value="4">seasonal</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col className="gutter-row lh30" span={6}>
                  <div style={style}>
                    <Form.Item
                      className={style.inputw80}
                      label="Date"
                      name="data"
                    >
                      <RangePicker />
                    </Form.Item>
                  </div>
                </Col>
                <Col className="gutter-row lh30" span={6}>
                  <div style={style}>
                    <div className={style.flexcenter}>
                      <Button type="primary" onClick={this.search}>Search</Button>
                      <Button className='ml' onClick={this.reset}>&nbsp;&nbsp; Reset&nbsp;&nbsp; </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card className='mt'>
            <Table
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={this.state.data}
              loading={loading}
              pagination={false}
            />
          </Card>
          <Pagination
            className='mt'
            total={total}
            showQuickJumper
            showSizeChanger
           onChange={this.pageChange} 
          />
        </div>

      </div>
    )
  }
}
