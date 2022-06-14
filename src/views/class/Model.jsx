import React, { Component } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { DatePicker, Form, Input,Select,message} from 'antd';
import { addClass } from '../../api/class';
import moment from 'moment';
export default class
    extends Component {
    state = {
        isModalVisible: false,
    }
    newTeacher = () => {
        this.setIsModalVisible(true);
    }
    handleOk = () => {
        this.formRef.validateFields().then(res=>{
            let time = res.time ? moment(res.time).format("YYYY-MM-DD HH:mm:ss"):''
 
            console.log(1,{...res,time})
            addClass({...res,time}).then(data=>{
                if(data.code===0){
                    message.success(data.msg)
                    this.formRef.resetFields()
                    this.props.renderList()
                }
              
            }).catch(data=>console(data));
         
        }).catch(res=>console.log(res))
        // addClass
        this.setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setIsModalVisible(false);
    };

    setIsModalVisible(toggle) {
        this.setState({
            isModalVisible: toggle
        })
    }

    componentDidMount(){
   
    }
    render() {
        const { isModalVisible } = this.state
        return (
            <div>
                <Modal title="Basic Modal"
                    visible={isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                    ref={a=>this.formRef=a}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                    >
                
                        <Form.Item
                        
                            label="classroom"
                            name="classroom"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        name='teacher'
                            label="teacher"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item 
                        label="subject"
                        name='subject'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item 
                        label="Date"
                        name='time'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <DatePicker style={{width:'100%'}}/>
                        </Form.Item>
                        <Form.Item 
                        label="type"
                        name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Select>
                                <Select.Option value="1">Demo</Select.Option>
                                <Select.Option value="2">Demo</Select.Option>
                                <Select.Option value="3">Demo</Select.Option>
                                <Select.Option value="4">Demo</Select.Option>
                            </Select>
                        </Form.Item>
     
                    </Form>
                </Modal>
            </div>
        )
    }
}
