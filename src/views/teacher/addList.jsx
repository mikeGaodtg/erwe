import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import { Form, message } from 'antd';
import { Row, Col, Input } from 'antd';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { Radio } from 'antd';
import moment from 'moment';
import { addTeacher } from '../../api';
import { editTeacher } from '../../api/teacher';


const { RangePicker } = DatePicker;
const { Option } = Select;


export default class addList extends Component {
    handleCancel = () => {
        this.props.toggleVis(false)
    }
    handleOk = () => {
        this.myRef.validateFields().then(res => {
            const {id}=this.props.record
            const birth = moment(res.birth).format('DD-MM-YYYY');
            const startday = moment(res.date).format('DD-MM-YYYY');
            const fn= this.props.title=='edit techer'? editTeacher({ ...res, birth, startday,id })
            :addTeacher({ ...res, birth, startday })
                    fn.then(data => {
                    if(data.code===0){
                        message.success(data.msg);
                        //隐藏弹框
                        this.props.toggleVis(false);
                        this.myRef.resetFields()
                        this.props.loadData()
                   }
                }     
             );
        }

        ).catch(err => console.log(err))
    }
    componentDidUpdate(){

    }
    render() {
        const { visible,title } = this.props
        return (
            <div>
                <Modal title={title}
                    visible={visible}
                    width='800px'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        ref={a => this.myRef = a}
                    >
                      <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={
                                        [
                                            { required: true, message: "姓名不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="性别"
                                    name="gender"
                                    rules={
                                        [
                                            { required: true, message: "性别不能为空" }
                                        ]
                                    }
                                >
                                    <Select>
                                        <Option value={1}>男</Option>
                                        <Option value={2}>女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="级别"
                                    name="level"
                                    rules={
                                        [
                                            { required: true, message: "级别不能为空" }
                                        ]
                                    }
                                >
                                    <Select>
                                        <Option value={1}>初级教师</Option>
                                        <Option value={2}>中级教师</Option>
                                        <Option value={3}>高级教师</Option>
                                        <Option value={4}>特级教师</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="年级"
                                    name="grade"
                                    rules={
                                        [
                                            { required: true, message: "年级不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="科目"
                                    name="subject"
                                    rules={
                                        [
                                            { required: true, message: "科目不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="入职日期"
                                    name="date"
                                    rules={
                                        [
                                            { required: true, message: "入职日期不能为空" }
                                        ]
                                    }
                                >
                                    <DatePicker style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="类型"
                                    name="type"
                                    rules={
                                        [
                                            { required: true, message: "类型不能为空" }
                                        ]
                                    }
                                >
                                    <Radio.Group>
                                        <Radio value="1">全职</Radio>
                                        <Radio value="2">兼职</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="手机号码"
                                    name="tel"
                                    rules={
                                        [
                                            { required: true, message: "手机号码不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="毕业院校"
                                    name="school"
                                    rules={
                                        [
                                            { required: true, message: "毕业院校不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="出生年月"
                                    name="birth"
                                    rules={
                                        [
                                            { required: true, message: "出生年月不能为空" }
                                        ]
                                    }
                                >
                                    <DatePicker style={{width:"100%"}}/>
                                </Form.Item>
                                <Form.Item
                                    label="家庭住址"
                                    name="address"
                                    rules={
                                        [
                                            { required: true, message: "家庭住址不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="学历"
                                    name="education"
                                    rules={
                                        [
                                            { required: true, message: "学历不能为空" }
                                        ]
                                    }
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                
            </div>
        )
    }
}
